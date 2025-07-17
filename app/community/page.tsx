"use client";
import {
  Image,
  User,
  Send,
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  BookmarkPlus,
  Video,
  FileText,
} from "lucide-react";
import { useState } from "react";

interface Post {
  id: number;
  author: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  image: boolean;
}

interface PostCardProps {
  post: Post;
}

const CreatePost: React.FC = () => {
  const [postContent, setPostContent] = useState<string>("");

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20 mb-6">
      <div className="flex items-start gap-3 sm:gap-4 mb-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <div className="flex-1">
          <textarea
            value={postContent}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setPostContent(e.target.value)
            }
            placeholder="Share your farming experience, tips, or questions..."
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 resize-none focus:outline-none focus:border-green-400 text-sm sm:text-base"
            rows={3}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto overflow-x-auto">
          <button className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors whitespace-nowrap">
            <Image className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
            <span className="text-xs sm:text-sm text-white">Photo</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors whitespace-nowrap">
            <Video className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
            <span className="text-xs sm:text-sm text-white">Video</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors whitespace-nowrap">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
            <span className="text-xs sm:text-sm text-white">Document</span>
          </button>
        </div>

        <button className="flex items-center gap-2 px-4 sm:px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 w-full sm:w-auto justify-center">
          <Send className="w-4 h-4" />
          <span className="text-sm sm:text-base">Post</span>
        </button>
      </div>
    </div>
  );
};

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-white text-sm sm:text-base">
              {post.author}
            </h4>
            <p className="text-xs sm:text-sm text-white/70">{post.time}</p>
          </div>
        </div>
        <button className="text-white/70 hover:text-white transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="mb-4">
        <p className="text-white/90 leading-relaxed text-sm sm:text-base">
          {post.content}
        </p>
      </div>

      {post.image && (
        <div className="mb-4">
          <div className="w-full h-48 sm:h-64 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
            <Image className="w-12 h-12 sm:w-16 sm:h-16 text-white/30" />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-2 transition-colors ${
              liked ? "text-red-400" : "text-white/70 hover:text-white"
            }`}
          >
            <Heart
              className={`w-4 h-4 sm:w-5 sm:h-5 ${liked ? "fill-current" : ""}`}
            />
            <span className="text-xs sm:text-sm">{post.likes}</span>
          </button>
          <button className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm">{post.comments}</span>
          </button>
          <button className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
            <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm hidden sm:inline">Share</span>
          </button>
        </div>
        <button
          onClick={() => setBookmarked(!bookmarked)}
          className={`transition-colors ${
            bookmarked ? "text-yellow-400" : "text-white/70 hover:text-white"
          }`}
        >
          <BookmarkPlus
            className={`w-4 h-4 sm:w-5 sm:h-5 ${bookmarked ? "fill-current" : ""}`}
          />
        </button>
      </div>
    </div>
  );
};

const CommunityFeed: React.FC = () => {
  // Sample posts data
  const samplePosts: Post[] = [
    {
      id: 1,
      author: "John Farmer",
      time: "2 hours ago",
      content:
        "Just implemented drip irrigation on my tomato farm! The results are amazing - 40% less water usage and healthier plants. Anyone else tried this method?",
      likes: 24,
      comments: 8,
      image: true,
    },
    {
      id: 2,
      author: "Sarah Green",
      time: "5 hours ago",
      content:
        "Dealing with aphids on my cabbage crops. Tried neem oil spray and it's working wonders! Natural pest control is the way to go. 🌱",
      likes: 15,
      comments: 12,
      image: false,
    },
    {
      id: 3,
      author: "Mike Agriculture",
      time: "1 day ago",
      content:
        "Weather forecast shows heavy rains next week. Perfect timing for planting the monsoon crops! Who else is planning their planting schedule?",
      likes: 32,
      comments: 19,
      image: true,
    },
  ];

  return (
    <>
      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center">
        <div className="lg:pl-64 pt-16 w-full">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
            <div className="mb-6 sm:mb-8 text-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Community Feed
              </h1>
              <p className="text-green-100 text-sm sm:text-base">
                Connect, share, and learn from fellow farmers
              </p>
            </div>

            {/* Create Post */}
            <CreatePost />

            {/* Posts Feed */}
            <div className="space-y-4 sm:space-y-6">
              {samplePosts.map((post: Post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunityFeed;
