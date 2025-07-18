"use client";
import { getGlobalFeed } from "@/actions/post";
import CreatePost from "@/components/community/CreatePost";
import PostCard, { Post } from "@/components/community/PostCard";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const CommunityFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const fetchedPosts = await getGlobalFeed();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostUpdate = () => {
    fetchPosts();
  };

  return (
    <>
      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center">
        <div className="lg:pl-64 pt-16 w-full">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
            {/* Create Post */}
            <CreatePost onPostCreated={handlePostUpdate} />

            {/* Posts Feed */}
            <div className="space-y-4 sm:space-y-6">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-white/70">
                    No posts yet. Be the first to share something!
                  </p>
                </div>
              ) : (
                posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onUpdate={handlePostUpdate}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunityFeed;
