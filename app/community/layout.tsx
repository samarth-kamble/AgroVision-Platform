"use client";

import React, { useState } from "react";
import {
  Users,
  MessageCircle,
  TrendingUp,
  User,
  Sun,
  CloudRain,
  Thermometer,
  Globe,
  Zap,
  Award,
  LucideIcon,
  UserPlus,
  CheckCircle,
  UserCheck,
} from "lucide-react";
import { FaSeedling } from "react-icons/fa";
import LoginSidebar from "@/components/community/LoginSidebar";
import Navbar from "@/components/community/Navbar";

interface MenuItem {
  icon: LucideIcon;
  label: string;
  active: boolean;
  href: string;
}

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Follower {
  id: number;
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
  followers: string;
  category: string;
  isFollowing: boolean;
}

// Mobile Navigation Component
const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const menuItems: MenuItem[] = [
    { icon: Users, label: "Community", active: true, href: "/community" },
    {
      icon: MessageCircle,
      label: "Messages",
      active: false,
      href: "/messages",
    },
    { icon: TrendingUp, label: "Trending", active: false, href: "/trending" },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 lg:hidden">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="fixed left-0 top-0 h-full w-80 bg-gradient-to-b from-slate-900/90 to-green-900/90 backdrop-blur-2xl border-r border-white/20 pt-20">
        <div className="px-6 mb-8">
          <nav className="space-y-2">
            {menuItems.map((item: MenuItem, index: number) => (
              <a
                key={index}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  item.active
                    ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border border-green-400/30 shadow-lg"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="px-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Trending Topics
          </h3>
          <div className="space-y-3">
            {[
              "#SustainableFarming",
              "#CropRotation",
              "#OrganicTips",
              "#ClimateChange",
            ].map((tag: string, index: number) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm text-white/70 hover:text-green-400 cursor-pointer transition-all duration-200 hover:translate-x-1"
              >
                <span>{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Weather Widget Component
const WeatherWidget: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl rounded-2xl p-4 border border-white/20 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold">Weather Today</h3>
        <Sun className="w-5 h-5 text-yellow-400" />
      </div>
      <div className="flex items-center gap-3">
        <div className="text-2xl font-bold text-white">28°C</div>
        <div className="flex-1">
          <div className="text-sm text-white/70">Sunny</div>
          <div className="text-xs text-white/50">Perfect for farming</div>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-3 text-xs text-white/60">
        <div className="flex items-center gap-1">
          <CloudRain className="w-3 h-3" />
          <span>20%</span>
        </div>
        <div className="flex items-center gap-1">
          <Thermometer className="w-3 h-3" />
          <span>22°-32°</span>
        </div>
      </div>
    </div>
  );
};

// Quick Actions Component
const QuickActions: React.FC = () => {
  const actions = [
    {
      icon: FaSeedling,
      label: "Plant Care",
      color: "from-green-500 to-emerald-500",
    },
    { icon: Globe, label: "Market", color: "from-blue-500 to-cyan-500" },
    { icon: Zap, label: "Tips", color: "from-purple-500 to-pink-500" },
    { icon: Users, label: "Connect", color: "from-orange-500 to-red-500" },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 mb-6">
      <h3 className="text-white font-semibold mb-3">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`flex flex-col items-center gap-2 p-3 rounded-xl bg-gradient-to-br ${action.color} hover:scale-105 transition-all duration-200 shadow-lg`}
          >
            <action.icon className="w-5 h-5 text-white" />
            <span className="text-xs text-white font-medium">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Follower Card Component
const FollowerCard: React.FC<{ follower: Follower }> = ({ follower }) => {
  const [isFollowing, setIsFollowing] = useState(follower.isFollowing);

  return (
    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-200">
      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
        <User className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <h4 className="font-medium text-white text-sm truncate">
            {follower.name}
          </h4>
          {follower.verified && (
            <CheckCircle className="w-3 h-3 text-blue-400 flex-shrink-0" />
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-white/60">
          <span className="truncate">@{follower.username}</span>
          <span>•</span>
          <span>{follower.followers}</span>
        </div>
        <div className="text-xs text-green-400 mt-1">{follower.category}</div>
      </div>
      <button
        onClick={() => setIsFollowing(!isFollowing)}
        className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
          isFollowing
            ? "bg-green-500/20 text-green-400 border border-green-400/30"
            : "bg-white/10 text-white/70 hover:bg-white/20"
        }`}
      >
        {isFollowing ? "Following" : "Follow"}
      </button>
    </div>
  );
};

// Right Sidebar Component
const RightSidebar: React.FC = () => {
  const suggestedFollowers: Follower[] = [
    {
      id: 1,
      name: "Dr. Anil Kumar",
      username: "dranilkumar",
      avatar: "",
      verified: true,
      followers: "12.5k",
      category: "Agriculture Expert",
      isFollowing: false,
    },
    {
      id: 2,
      name: "Green Farms Co.",
      username: "greenfarms",
      avatar: "",
      verified: true,
      followers: "8.2k",
      category: "Organic Farming",
      isFollowing: false,
    },
    {
      id: 3,
      name: "Priya Sharma",
      username: "priyafarms",
      avatar: "",
      verified: false,
      followers: "3.1k",
      category: "Dairy Specialist",
      isFollowing: true,
    },
    {
      id: 4,
      name: "AgriTech News",
      username: "agritech_news",
      avatar: "",
      verified: true,
      followers: "25.8k",
      category: "Technology",
      isFollowing: false,
    },
    {
      id: 5,
      name: "Sustainable India",
      username: "sustainableindia",
      avatar: "",
      verified: true,
      followers: "18.3k",
      category: "Sustainability",
      isFollowing: false,
    },
  ];

  const topFollowers: Follower[] = [
    {
      id: 1,
      name: "Farm Master",
      username: "farmmaster",
      avatar: "",
      verified: true,
      followers: "45.2k",
      category: "Top Farmer",
      isFollowing: true,
    },
    {
      id: 2,
      name: "Crop Genius",
      username: "cropgenius",
      avatar: "",
      verified: true,
      followers: "38.7k",
      category: "Crop Expert",
      isFollowing: false,
    },
    {
      id: 3,
      name: "Organic Life",
      username: "organiclife",
      avatar: "",
      verified: true,
      followers: "32.1k",
      category: "Organic Expert",
      isFollowing: true,
    },
  ];

  return (
    <div className="hidden xl:block fixed right-0 top-16 h-full w-80 bg-gradient-to-b from-emerald-700 to-green-900/90 backdrop-blur-2xl border-l border-white/20 pt-6 overflow-y-auto">
      {/* Top Followers */}
      <div className="px-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Top Followers</h3>
          <Award className="w-5 h-5 text-yellow-400" />
        </div>
        <div className="space-y-3">
          {topFollowers.map((follower) => (
            <FollowerCard key={follower.id} follower={follower} />
          ))}
        </div>
      </div>

      {/* Suggested Followers */}
      <div className="px-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">
            Suggested for You
          </h3>
          <UserPlus className="w-5 h-5 text-green-400" />
        </div>
        <div className="space-y-3">
          {suggestedFollowers.map((follower) => (
            <FollowerCard key={follower.id} follower={follower} />
          ))}
        </div>
        <button className="w-full mt-4 py-2 text-sm text-green-400 hover:text-green-300 transition-colors">
          Show more suggestions
        </button>
      </div>

      {/* Trending Topics */}
      <div className="px-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Trending</h3>
          <TrendingUp className="w-5 h-5 text-orange-400" />
        </div>
        <div className="space-y-3">
          {[
            { tag: "#SustainableFarming", posts: "1.2k posts" },
            { tag: "#CropRotation", posts: "856 posts" },
            { tag: "#OrganicTips", posts: "643 posts" },
            { tag: "#ClimateChange", posts: "1.8k posts" },
            { tag: "#AgriTech", posts: "423 posts" },
          ].map((trend, index) => (
            <div
              key={index}
              className="p-3 bg-white/5 rounded-xl hover:bg-white/10 cursor-pointer transition-all duration-200"
            >
              <div className="text-sm font-medium text-green-400">
                {trend.tag}
              </div>
              <div className="text-xs text-white/60 mt-1">{trend.posts}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Desktop Sidebar Component
const Sidebar: React.FC = () => {
  const menuItems: MenuItem[] = [
    { icon: Users, label: "Community", active: true, href: "/community" },
    {
      icon: UserCheck,
      label: "Subscriptions",
      active: false,
      href: "/messages",
    },
    { icon: TrendingUp, label: "Trending", active: false, href: "/trending" },
  ];

  return (
    <div className="hidden lg:block fixed left-0 top-16 h-full w-64 bg-gradient-to-b from-emerald-700 to-green-900/90 backdrop-blur-2xl border-r border-white/20 pt-6 overflow-y-auto">
      <div className="px-6 mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">Navigation</h3>
        <nav className="space-y-2">
          {menuItems.map((item: MenuItem, index: number) => (
            <a
              key={index}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                item.active
                  ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border border-green-400/30 shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>

      <div className="px-6 mb-8">
        <WeatherWidget />
      </div>

      <div className="px-6 mb-8">
        <QuickActions />
      </div>
    </div>
  );
};

// Main Layout Component
export default function Layout({ children }: { children: React.ReactNode }) {
  const [showLoginSidebar, setShowLoginSidebar] = useState<boolean>(false);
  const [showMobileNav, setShowMobileNav] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-900 to-emerald-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(34,197,94,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(16,185,129,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent,rgba(34,197,94,0.05),transparent_60deg)]"></div>
      </div>

      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 left-20 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-green-400/10 to-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-1/3 right-16 sm:right-32 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-lime-400/15 to-green-400/15 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1000ms" }}
        ></div>
        <div
          className="absolute bottom-32 left-1/4 sm:left-1/3 w-28 h-28 sm:w-36 sm:h-36 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2000ms" }}
        ></div>

        {/* Floating Icons */}
        <div
          className="absolute top-24 left-1/4 w-4 h-4 sm:w-6 sm:h-6 bg-amber-400/20 rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        ></div>
        <div
          className="absolute top-40 right-1/4 w-3 h-3 sm:w-5 sm:h-5 bg-green-400/25 rounded-full animate-pulse"
          style={{ animationDelay: "1500ms" }}
        ></div>
        <div
          className="absolute bottom-48 left-1/6 w-3 h-3 sm:w-4 sm:h-4 bg-red-400/20 rounded-full animate-bounce"
          style={{ animationDelay: "800ms" }}
        ></div>
        <div
          className="absolute top-1/2 left-8 sm:left-16 w-3 h-3 sm:w-4 sm:h-4 bg-green-300/30 rounded-full animate-bounce"
          style={{ animationDelay: "1200ms" }}
        ></div>
        <div
          className="absolute top-32 right-12 sm:right-24 w-4 h-4 sm:w-6 sm:h-6 bg-yellow-400/25 rounded-full animate-pulse"
          style={{ animationDelay: "2200ms" }}
        ></div>
        <div
          className="absolute bottom-40 right-1/5 w-3 h-3 sm:w-4 sm:h-4 bg-blue-400/20 rounded-full animate-bounce"
          style={{ animationDelay: "600ms" }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navbar */}
        <Navbar
          onLoginClick={() => setShowLoginSidebar(true)}
          onMobileMenuClick={() => setShowMobileNav(true)}
        />

        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Right Sidebar */}
        <RightSidebar />

        {/* Mobile Navigation */}
        <MobileNav
          isOpen={showMobileNav}
          onClose={() => setShowMobileNav(false)}
        />

        {/* Main Content */}
        <div className=" xl:pr-80 pt-5">{children}</div>

        {/* Login Sidebar */}
        <LoginSidebar
          isOpen={showLoginSidebar}
          onClose={() => setShowLoginSidebar(false)}
        />
      </div>
    </div>
  );
}
