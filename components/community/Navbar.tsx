import React from "react";
import { Bell, LogIn, Menu, Search } from "lucide-react";
import Link from "next/link";
import Logo from "@/public/Logo.png";
import Image from "next/image";
interface NavbarProps {
  onLoginClick: () => void;
  onMobileMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onMobileMenuClick }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/10 backdrop-blur-xl border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <button
              onClick={onMobileMenuClick}
              className="lg:hidden text-white/70 hover:text-white transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <Image src={Logo} className="text-white" alt="Logo" />
            </div>
            <span className="text-xl font-bold text-white">AgroVision</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link
              href="#"
              className="text-white/70 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link href="#" className="text-green-400 font-medium">
              Community
            </Link>
            <Link
              href="#"
              className="text-white/70 hover:text-white transition-colors"
            >
              Marketplace
            </Link>
            <Link
              href="#"
              className="text-white/70 hover:text-white transition-colors"
            >
              About
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button className="text-white/70 hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-white/70 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button
              onClick={onLoginClick}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300"
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">Login</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
