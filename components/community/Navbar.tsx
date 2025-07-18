import React, { useEffect, useState } from "react";
import { Menu, Search, Bell, LogIn, Sparkles, User } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";
interface NavbarProps {
  onLoginClick: () => void;
  onMobileMenuClick: () => void;
}
const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onMobileMenuClick }) => {
  const user = useCurrentUser();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-black/20 backdrop-blur-2xl border-b border-white/10"
          : "bg-white/10 backdrop-blur-xl border-b border-white/20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <button
              onClick={onMobileMenuClick}
              className="lg:hidden text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-xl"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">
              AgroVision
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/community"
              className="text-green-400 font-medium relative"
            >
              Community
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-green-400"></span>
            </Link>
            <Link
              href="/marketplace"
              className="text-white/70 hover:text-white transition-colors relative group"
            >
              Marketplace
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/about"
              className="text-white/70 hover:text-white transition-colors relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-xl">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-xl relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            </button>
            {user ? (
              <Link href={`/profile/${user.id}`}>
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                  <User className="w-5 h-5 text-white" />
                  <span className="sr-only">Profile</span>
                </div>
              </Link>
            ) : (
              <button
                onClick={onLoginClick}
                className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
              >
                <LogIn className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
