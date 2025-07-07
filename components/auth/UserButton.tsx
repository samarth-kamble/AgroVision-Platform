"use client";

import { FaUser } from "react-icons/fa";
import { ExitIcon } from "@radix-ui/react-icons";
import {
  Settings,
  User,
  Bell,
  ChevronDown,
  Leaf,
  Sun,
  Activity,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "./LogoutButton";
import Link from "next/link";

export const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative group cursor-pointer">
          {/* Animated background glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500 rounded-2xl opacity-0 group-hover:opacity-30 transition-all duration-500 blur-sm "></div>

          {/* Main button container */}
          <div className="relative flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-2 transition-all duration-300 group-hover:bg-white/15 group-hover:border-green-400/50 group-hover:shadow-xl group-hover:shadow-green-500/20">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="h-10 w-10 ring-2 ring-white/30 transition-all duration-300 group-hover:ring-green-400/60 group-hover:scale-105 shadow-lg">
                <AvatarImage
                  src={user?.image || ""}
                  className="transition-all duration-300 group-hover:brightness-110"
                />
                <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-600 text-white transition-all duration-300 group-hover:from-green-400 group-hover:to-emerald-500">
                  <FaUser className="text-sm transition-transform duration-300 group-hover:scale-110" />
                </AvatarFallback>
              </Avatar>

              {/* Online status indicator with agricultural theme */}
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-gradient-to-r from-lime-400 to-green-400 border-2 border-white rounded-full shadow-sm">
                <div className="absolute inset-0 bg-lime-400 rounded-full animate-ping"></div>
              </div>
            </div>

            {/* User info */}
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-white leading-tight">
                {user?.name || "Farmer"}
              </p>
              <p className="text-xs text-green-200 leading-tight">
                {user?.role || "Agriculturist"}
              </p>
            </div>

            {/* Dropdown arrow */}
            <ChevronDown className="w-4 h-4 text-green-300 transition-transform duration-300 group-hover:rotate-180 group-hover:text-green-200" />

            {/* Floating agricultural elements */}
            <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <Leaf className="w-3 h-3 text-green-400 animate-bounce" />
            </div>
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-72 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-2 mt-2"
        align="end"
        sideOffset={8}
      >
        {/* User profile section */}
        <div className="px-4 py-4 border-b border-white/20">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-12 w-12 ring-2 ring-green-400/50 shadow-lg">
                <AvatarImage src={user?.image || ""} />
                <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                  <FaUser className="text-lg" />
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-gradient-to-r from-lime-400 to-green-400 border-2 border-white rounded-full flex items-center justify-center">
                <Sun className="w-2 h-2 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-white font-semibold text-base leading-tight">
                {user?.name || "John Farmer"}
              </h4>
              <p className="text-green-200 text-sm leading-tight">
                {user?.email || "farmer@agrovision.com"}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1 px-2 py-0.5 bg-green-500/20 rounded-full">
                  <Activity className="w-3 h-3 text-green-400" />
                  <span className="text-xs text-green-300 font-medium">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        {/* <div className="px-4 py-3 border-b border-white/20">
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-1">
                <Leaf className="w-4 h-4 text-green-400" />
              </div>
              <p className="text-xs text-green-200">Crops</p>
              <p className="text-sm font-semibold text-white">12</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-1">
                <Droplets className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-xs text-green-200">Fields</p>
              <p className="text-sm font-semibold text-white">5</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-1">
                <Sun className="w-4 h-4 text-yellow-400" />
              </div>
              <p className="text-xs text-green-200">Alerts</p>
              <p className="text-sm font-semibold text-white">3</p>
            </div>
          </div>
        </div> */}

        {/* Menu items */}
        <div className="py-2">
          <DropdownMenuItem className="group px-4 py-3 cursor-pointer transition-all duration-200 hover:bg-white/10 rounded-xl m-1 focus:bg-white/10">
            <Link href={"/profile"} className="flex items-center">
              <User className="mr-3 h-5 w-5 text-green-400 transition-transform duration-200 group-hover:scale-110" />
              <div>
                <span className="font-medium text-white">Profile Settings</span>
                <p className="text-xs text-green-200">Manage your account</p>
              </div>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="group px-4 py-3 cursor-pointer transition-all duration-200 hover:bg-white/10 rounded-xl m-1 focus:bg-white/10">
            <Bell className="mr-3 h-5 w-5 text-blue-400 transition-transform duration-200 group-hover:scale-110" />
            <div>
              <span className="font-medium text-white">Notifications</span>
              <p className="text-xs text-green-200">Alerts & updates</p>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem className="group px-4 py-3 cursor-pointer transition-all duration-200 hover:bg-white/10 rounded-xl m-1 focus:bg-white/10">
            <Link href="/ai" className="flex items-center">
              <Settings className="mr-3 h-5 w-5 text-gray-400 transition-transform duration-200 group-hover:scale-110" />
              <div>
                <span className="font-medium text-white">AI Dashboard</span>
                <p className="text-xs text-green-200">Ai Feature Analysis</p>
              </div>
            </Link>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator className="bg-white/20 my-2" />

        {/* Logout button */}
        <div className="p-1">
          <LogoutButton>
            <DropdownMenuItem className="group px-4 py-3 cursor-pointer transition-all duration-200 hover:bg-red-500/10 hover:text-red-300 rounded-xl focus:bg-red-500/10 focus:text-red-300 border border-transparent hover:border-red-400/30">
              <ExitIcon className="mr-3 h-5 w-5 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-red-400" />
              <div>
                <span className="font-semibold">Sign Out</span>
                <p className="text-xs opacity-70">Leave AgroVision</p>
              </div>
            </DropdownMenuItem>
          </LogoutButton>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
