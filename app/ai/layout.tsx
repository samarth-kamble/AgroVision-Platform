"use client";

import React, { useState } from "react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wheat,
  Cloud,
  Droplets,
  Settings,
  Bell,
  Sun,
  Search,
  User,
  Menu,
  X,
  TreePine,
  Apple,
  Leaf,
  Shield,
  LogOut,
  ChevronDown,
  Bot,
  Trees,
  Flower2,
  Panda,
} from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const user = useCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const pathname = usePathname();

  const sidebarItems = [
    {
      name: "Dashboard",
      href: "/ai",
      icon: LayoutDashboard,
    },
    {
      name: "Crop Recommendation",
      href: "/ai/crop-recommendation",
      icon: Flower2,
    },
    {
      name: "Plant Disease Detection",
      href: "/ai/plant-disease",
      icon: Trees,
    },
    {
      name: "Fertilizer Recommendation",
      href: "/ai/fertilizer",
      icon: Droplets,
    },
    {
      name: "Animal Disease Detection",
      href: "/ai/animal-disease",
      icon: Panda,
    },
    {
      name: "Farming Chatbot",
      href: "/ai/chatbot",
      icon: Bot,
    },
    {
      name: "Weather & Market",
      href: "/ai/weather",
      icon: Cloud,
    },
    {
      name: "Settings",
      href: "/ai/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900 relative">
      {/* Floating Background Decorations */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(34,197,94,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(16,185,129,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent,rgba(34,197,94,0.03),transparent_60deg)]" />
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-green-400/5 to-emerald-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-32 w-24 h-24 bg-gradient-to-br from-lime-400/8 to-green-400/8 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute bottom-32 left-1/3 w-28 h-28 bg-gradient-to-br from-emerald-400/6 to-teal-400/6 rounded-full blur-3xl animate-pulse delay-2000" />
        <Wheat className="absolute top-24 left-1/4 w-4 h-4 text-amber-400/10 animate-bounce delay-300" />
        <TreePine className="absolute top-40 right-1/4 w-3 h-3 text-green-400/15 animate-pulse delay-1500" />
        <Apple className="absolute bottom-48 left-1/6 w-3 h-3 text-red-400/10 animate-bounce delay-800" />
        <Leaf className="absolute top-1/2 left-16 w-3 h-3 text-green-300/20 animate-bounce delay-1200" />
        <Sun className="absolute top-32 right-24 w-4 h-4 text-yellow-400/15 animate-pulse delay-2200" />
        <Droplets className="absolute bottom-40 right-1/5 w-3 h-3 text-blue-400/10 animate-bounce delay-600" />
      </div>

      {/* Sidebar */}
      <aside
        className={`z-50 w-72 bg-white/10 backdrop-blur-xl border-r border-white/20 transform transition-transform duration-300 ease-in-out
        ${
          sidebarOpen
            ? "fixed inset-y-0 left-0 translate-x-0"
            : "fixed inset-y-0 left-0 -translate-x-full"
        }
       lg:translate-x-0 lg:h-screen lg:sticky lg:top-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-4 p-6 border-b border-white/20 flex-shrink-0">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-xl">
                <span className="text-xl">🌾</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-lime-400 rounded-full animate-ping" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
                AgroVision
              </h1>
              <p className="text-green-200 text-xs">Smart Agriculture</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/ai" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                    isActive
                      ? "bg-white/15 text-white border border-white/30 shadow-lg backdrop-blur-sm"
                      : "text-green-200 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      isActive
                        ? "text-green-300"
                        : "group-hover:text-green-400 text-green-300/80"
                    }`}
                  />
                  <span className="font-medium truncate">{item.name}</span>
                  {isActive && (
                    <>
                      <div className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-green-400 to-emerald-500 rounded-r-full" />
                    </>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative z-10 min-h-screen">
        {/* Header */}
        <header className="bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0 z-40 flex-shrink-0">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Sidebar Toggle & Search */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-white hover:bg-white/10 rounded-xl transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-300 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search crops, analytics..."
                  className="pl-10 pr-4 py-2 w-80 bg-white/10 border border-white/20 rounded-xl focus:border-green-400 focus:ring-4 focus:ring-green-400/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Weather, Notification, User Menu */}
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-white hover:bg-white/10 rounded-xl transition-colors">
                <Bell className="w-6 h-6" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  3
                </div>
              </button>
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-3 p-2 text-white hover:bg-white/10 rounded-xl transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-medium">{user.name}</div>
                    <div className="text-xs text-green-200">{user.role}</div>
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl py-2">
                    <div className="px-4 py-3 border-b border-white/20">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-medium">
                            {user.name}
                          </div>
                          <div className="text-green-200 text-xs truncate">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      <Link
                        href="/dashboard/profile"
                        className="flex items-center gap-3 px-4 py-2 text-green-200 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                      <Link
                        href="/dashboard/security"
                        className="flex items-center gap-3 px-4 py-2 text-green-200 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <Shield className="w-4 h-4" />
                        Security
                      </Link>

                      <hr className="my-2 border-white/20" />
                      <button className="flex items-center gap-3 px-4 py-2 text-red-300 hover:text-red-200 hover:bg-red-500/10 transition-colors w-full">
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <button className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-xl">
            <X className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
