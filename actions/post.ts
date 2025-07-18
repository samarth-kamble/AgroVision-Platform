"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { createPostSchema } from "@/schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export type CreatePostResult = {
  success: boolean;
  error?: string;
  post?: {
    id: string;
    content: string | null;
    image: string | null;
    createdAt: Date;
    author: {
      id: string;
      name: string | null;
      image: string | null;
    };
    _count: {
      likes: number;
      comments: number;
    };
  };
};

export async function createPost(
  content: string,
  image?: string
): Promise<CreatePostResult> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        error: "You must be logged in to create a post",
      };
    }

    const validatedData = createPostSchema.parse({ content, image });

    const post = await db.post.create({
      data: {
        content: validatedData.content,
        image: validatedData.image,
        authorId: session.user.id,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });

    revalidatePath("/feed");
    revalidatePath("/");

    return { success: true, post };
  } catch (error) {
    console.error("Error creating post:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0]?.message || "Invalid input",
      };
    }

    return { success: false, error: "Failed to create post" };
  }
}

export async function getPosts() {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    const posts = await db.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
        likes: userId
          ? {
              where: {
                userId: userId,
              },
              select: {
                id: true,
              },
            }
          : false,
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 5, // Limit initial comments, can load more later
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Transform posts to include isLiked status
    const postsWithLikeStatus = posts.map((post) => ({
      ...post,
      isLiked: userId ? post.likes.length > 0 : false,
      likes: undefined, // Remove the likes array from response
    }));

    return postsWithLikeStatus;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function deletePost(postId: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        error: "You must be logged in to delete posts",
      };
    }

    const userId = session.user.id;

    // Check if user owns this post
    const post = await db.post.findUnique({
      where: { id: postId },
      select: { authorId: true },
    });

    if (!post) {
      return {
        success: false,
        error: "Post not found",
      };
    }

    // Only allow the post owner to delete the post
    if (post.authorId !== userId) {
      return {
        success: false,
        error: "You can only delete your own posts",
      };
    }

    // Delete the post (cascade will handle comments, likes, notifications)
    await db.post.delete({
      where: { id: postId },
    });

    revalidatePath("/feed");
    revalidatePath("/");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error deleting post:", error);
    return {
      success: false,
      error: "Failed to delete post",
    };
  }
}

export async function toggleLike(postId: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        error: "You must be logged in to like posts",
      };
    }

    const userId = session.user.id;

    // Check if user already liked this post
    const existingLike = await db.like.findUnique({
      where: {
        userId_postId: {
          userId: userId,
          postId: postId,
        },
      },
    });

    let isLiked: boolean;

    if (existingLike) {
      // Unlike the post
      await db.like.delete({
        where: {
          userId_postId: {
            userId: userId,
            postId: postId,
          },
        },
      });
      isLiked = false;
    } else {
      // Like the post
      await db.like.create({
        data: {
          userId: userId,
          postId: postId,
        },
      });
      isLiked = true;

      // Create notification for post author (if not self-like)
      const post = await db.post.findUnique({
        where: { id: postId },
        select: { authorId: true },
      });

      if (post && post.authorId !== userId) {
        await db.notification.create({
          data: {
            userId: post.authorId,
            creatorId: userId,
            type: "LIKE",
            postId: postId,
          },
        });
      }
    }

    // Get updated like count
    const likeCount = await db.like.count({
      where: {
        postId: postId,
      },
    });

    revalidatePath("/feed");
    revalidatePath("/");

    return {
      success: true,
      isLiked,
      likeCount,
    };
  } catch (error) {
    console.error("Error toggling like:", error);
    return {
      success: false,
      error: "Failed to toggle like",
    };
  }
}

export async function addComment(postId: string, content: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        error: "You must be logged in to comment",
      };
    }

    const userId = session.user.id;

    // Validate comment content
    const commentSchema = z.object({
      content: z
        .string()
        .min(1, "Comment cannot be empty")
        .max(500, "Comment too long"),
    });

    const validatedData = commentSchema.parse({ content });

    // Create the comment
    const comment = await db.comment.create({
      data: {
        content: validatedData.content,
        authorId: userId,
        postId: postId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    // Create notification for post author (if not self-comment)
    const post = await db.post.findUnique({
      where: { id: postId },
      select: { authorId: true },
    });

    if (post && post.authorId !== userId) {
      await db.notification.create({
        data: {
          userId: post.authorId,
          creatorId: userId,
          type: "COMMENT",
          postId: postId,
          commentId: comment.id,
        },
      });
    }

    revalidatePath("/feed");
    revalidatePath("/");

    return {
      success: true,
      comment,
    };
  } catch (error) {
    console.error("Error adding comment:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0]?.message || "Invalid comment",
      };
    }

    return {
      success: false,
      error: "Failed to add comment",
    };
  }
}

export async function getComments(
  postId: string,
  skip: number = 0,
  take: number = 10
) {
  try {
    const comments = await db.comment.findMany({
      where: {
        postId: postId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take,
    });

    return {
      success: true,
      comments,
    };
  } catch (error) {
    console.error("Error fetching comments:", error);
    return {
      success: false,
      error: "Failed to load comments",
      comments: [],
    };
  }
}

export async function deleteComment(commentId: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        error: "You must be logged in to delete comments",
      };
    }

    const userId = session.user.id;

    // Get comment with post information to check ownership
    const comment = await db.comment.findUnique({
      where: { id: commentId },
      select: {
        authorId: true,
        postId: true,
        post: {
          select: {
            authorId: true,
          },
        },
      },
    });

    if (!comment) {
      return {
        success: false,
        error: "Comment not found",
      };
    }

    // Check if user owns the comment OR owns the post
    const canDelete =
      comment.authorId === userId || comment.post.authorId === userId;

    if (!canDelete) {
      return {
        success: false,
        error:
          "You can only delete your own comments or comments on your posts",
      };
    }

    // Delete the comment (cascade will handle notifications)
    await db.comment.delete({
      where: { id: commentId },
    });

    revalidatePath("/feed");
    revalidatePath("/");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error deleting comment:", error);
    return {
      success: false,
      error: "Failed to delete comment",
    };
  }
}

export async function getGlobalFeed() {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    const posts = await db.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
        likes: userId
          ? {
              where: {
                userId: userId,
              },
              select: {
                id: true,
              },
            }
          : false,
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 5,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Transform posts to include isLiked status
    const postsWithLikeStatus = posts.map((post) => ({
      ...post,
      isLiked: userId ? post.likes.length > 0 : false,
      likes: undefined,
    }));

    return postsWithLikeStatus;
  } catch (error) {
    console.error("Error fetching global feed:", error);
    return [];
  }
}

export async function getUserPosts(targetUserId: string) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    const posts = await db.post.findMany({
      where: {
        authorId: targetUserId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
        likes: userId
          ? {
              where: {
                userId: userId,
              },
              select: {
                id: true,
              },
            }
          : false,
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 5,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Transform posts to include isLiked status
    const postsWithLikeStatus = posts.map((post) => ({
      ...post,
      isLiked: userId ? post.likes.length > 0 : false,
      likes: undefined,
    }));

    return postsWithLikeStatus;
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return [];
  }
}
