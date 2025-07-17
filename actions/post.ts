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

    // Revalidate the feed page to show the new post
    revalidatePath("/feed"); // Adjust path as needed
    revalidatePath("/"); // If you have posts on home page

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
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}
