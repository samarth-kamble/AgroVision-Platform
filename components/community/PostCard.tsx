import React, { useState } from "react";
import {
  User,
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Send,
  Trash2,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  addComment,
  deletePost,
  deleteComment,
  toggleLike,
} from "@/actions/post";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export interface Post {
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
  isLiked?: boolean;
  comments?: Comment[];
}

interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  author: {
    id: string;
    name: string | null;
    image: string | null;
  };
}

interface PostCardProps {
  post: Post;
  onUpdate: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onUpdate }) => {
  const { data: session } = useSession();
  const [liked, setLiked] = useState<boolean>(post.isLiked || false);
  const [showComments, setShowComments] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>(post.comments || []);
  const [newComment, setNewComment] = useState<string>("");
  const [isSubmittingComment, setIsSubmittingComment] =
    useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(post._count.likes);
  const [commentCount, setCommentCount] = useState<number>(
    post._count.comments
  );
  const [showPostDropdown, setShowPostDropdown] = useState<boolean>(false);
  const [showCommentDropdown, setShowCommentDropdown] = useState<string | null>(
    null
  );

  const handleLike = async () => {
    if (!session?.user?.id) {
      toast.error("Please log in to like posts");
      return;
    }

    try {
      const result = await toggleLike(post.id);
      if (result.success) {
        setLiked(result.isLiked!);
        setLikeCount(result.likeCount!);
      } else {
        toast.error(result.error || "Failed to like post");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) {
      toast.error("Please log in to comment");
      return;
    }

    if (!newComment.trim()) return;

    setIsSubmittingComment(true);
    try {
      const result = await addComment(post.id, newComment);
      if (result.success && result.comment) {
        setComments([result.comment, ...comments]);
        setCommentCount(commentCount + 1);
        setNewComment("");
        toast.success("Comment added successfully");
      } else {
        toast.error(result.error || "Failed to add comment");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleDeletePost = async () => {
    if (!session?.user?.id || session.user.id !== post.author.id) {
      toast.error("You can only delete your own posts");
      return;
    }

    try {
      const result = await deletePost(post.id);
      if (result.success) {
        toast.success("Post deleted successfully");
        onUpdate();
      } else {
        toast.error(result.error || "Failed to delete post");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setShowPostDropdown(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!session?.user?.id) {
      toast.error("Please log in to delete comments");
      return;
    }

    // Find the comment to check ownership
    const comment = comments.find((c) => c.id === commentId);
    if (!comment) {
      toast.error("Comment not found");
      return;
    }

    // Check if user owns the comment OR owns the post
    const canDelete =
      comment.author.id === session.user.id ||
      post.author.id === session.user.id;

    if (!canDelete) {
      toast.error(
        "You can only delete your own comments or comments on your posts"
      );
      return;
    }

    try {
      const result = await deleteComment(commentId);
      if (result.success) {
        setComments(comments.filter((c) => c.id !== commentId));
        setCommentCount(commentCount - 1);
        toast.success("Comment deleted successfully");
      } else {
        toast.error(result.error || "Failed to delete comment");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setShowCommentDropdown(null);
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor(
      (now.getTime() - new Date(date).getTime()) / 1000
    );

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000)
      return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return new Date(date).toLocaleDateString();
  };

  const isOwnPost = session?.user?.id === post.author.id;

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".dropdown-container")) {
        setShowPostDropdown(false);
        setShowCommentDropdown(null);
      }
    };

    if (showPostDropdown || showCommentDropdown) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [showPostDropdown, showCommentDropdown]);

  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 mb-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-full flex items-center justify-center overflow-hidden ring-2 ring-white/30">
              {post.author.image ? (
                <Image
                  src={post.author.image}
                  alt={post.author.name || "User"}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-6 h-6 text-white" />
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white/20"></div>
          </div>
          <div>
            <h4 className="font-semibold text-white text-base flex items-center gap-2">
              {post.author.name || "Anonymous User"}
              <span className="w-1 h-1 bg-white/50 rounded-full"></span>
            </h4>
            <p className="text-sm text-white/60">
              {formatTimeAgo(post.createdAt)}
            </p>
          </div>
        </div>

        {/* Post Options Dropdown - Only show if user owns the post */}
        {isOwnPost && (
          <div className="relative dropdown-container">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowPostDropdown(!showPostDropdown);
                setShowCommentDropdown(null); // Close comment dropdowns
              }}
              className="text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>

            {showPostDropdown && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-xl z-10">
                <div className="p-1">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowPostDropdown(false);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete Post
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-slate-900 border-slate-700">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-white">
                          Delete Post
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-300">
                          Are you sure you want to delete this post? This action
                          cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-slate-800 text-white border-slate-600 hover:bg-slate-700">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDeletePost}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {post.content && (
        <div className="mb-4">
          <p className="text-white/90 leading-relaxed text-base">
            {post.content}
          </p>
        </div>
      )}

      {post.image && (
        <div className="mb-4">
          <div className="w-full max-h-96 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
            <Image
              src={post.image}
              alt="Post image"
              width={800}
              height={400}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center gap-6">
          <button
            onClick={handleLike}
            disabled={!session?.user?.id}
            className={`flex items-center gap-2 transition-all duration-200 ${
              liked
                ? "text-red-400 scale-110"
                : "text-white/70 hover:text-red-400 hover:scale-105"
            } ${!session?.user?.id ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <Heart
              className={`w-5 h-5 ${liked ? "fill-current animate-pulse" : ""}`}
            />
            <span className="text-sm font-medium">{likeCount}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 text-white/70 hover:text-blue-400 transition-all duration-200 hover:scale-105"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">{commentCount}</span>
          </button>

          <button className="flex items-center gap-2 text-white/70 hover:text-green-400 transition-all duration-200 hover:scale-105">
            <Share2 className="w-5 h-5" />
            <span className="text-sm font-medium hidden sm:inline">Share</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-6 pt-4 border-t border-white/10">
          {/* Add Comment Form */}
          {session?.user?.id && (
            <form onSubmit={handleComment} className="mb-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  />
                  <button
                    type="submit"
                    disabled={!newComment.trim() || isSubmittingComment}
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Comments List */}
          <div className="space-y-4 max-h-80 overflow-y-auto custom-scrollbar">
            {comments.map((comment) => {
              const canDeleteComment =
                session?.user?.id === comment.author.id ||
                session?.user?.id === post.author.id;

              return (
                <div key={comment.id} className="flex gap-3 group">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {comment.author.image ? (
                      <Image
                        src={comment.author.image}
                        alt={comment.author.name || "User"}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10 relative">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-white">
                            {comment.author.name || "Anonymous"}
                          </span>
                          <span className="text-xs text-white/50">
                            {formatTimeAgo(comment.createdAt)}
                          </span>
                        </div>

                        {/* Comment Options Dropdown - Only show if user can delete */}
                        {canDeleteComment && (
                          <div className="relative dropdown-container">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowCommentDropdown(
                                  showCommentDropdown === comment.id
                                    ? null
                                    : comment.id
                                );
                                setShowPostDropdown(false); // Close post dropdown
                              }}
                              className="opacity-0 group-hover:opacity-100 text-white/50 hover:text-white transition-all duration-200 p-1 rounded-full hover:bg-white/10"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </button>

                            {showCommentDropdown === comment.id && (
                              <div className="absolute right-0 top-full mt-1 w-44 bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-lg shadow-xl z-10">
                                <div className="p-1">
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <button
                                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setShowCommentDropdown(null);
                                        }}
                                      >
                                        <Trash2 className="w-3 h-3" />
                                        Delete Comment
                                      </button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="bg-slate-900 border-slate-700">
                                      <AlertDialogHeader>
                                        <AlertDialogTitle className="text-white">
                                          Delete Comment
                                        </AlertDialogTitle>
                                        <AlertDialogDescription className="text-slate-300">
                                          Are you sure you want to delete this
                                          comment? This action cannot be undone.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel className="bg-slate-800 text-white border-slate-600 hover:bg-slate-700">
                                          Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() =>
                                            handleDeleteComment(comment.id)
                                          }
                                          className="bg-red-600 hover:bg-red-700 text-white"
                                        >
                                          <Trash2 className="w-4 h-4 mr-2" />
                                          Delete
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-white/80 leading-relaxed">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
};

export default PostCard;
