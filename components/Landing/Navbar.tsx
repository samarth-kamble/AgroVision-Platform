"use client";
import React, { useState } from "react";
import { Menu, X, UserPlus, LogIn, ChevronDown } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserButton } from "../auth/UserButton";
import Logo from "@/public/Logo.png";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const user = useCurrentUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="relative">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-lg">
                  <Image src={Logo} alt="AgroVision Logo" />
                </span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-lime-400 rounded-full animate-ping"></div>
            </Link>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
                AgroVision
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-white hover:text-green-300 font-medium transition-colors"
            >
              Home
            </Link>
            <a
              href="/community"
              className="text-white hover:text-green-300 font-medium transition-colors"
            >
              Community
            </a>
            <div className="relative">
              <button
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                className="text-white hover:text-green-300 font-medium transition-colors flex items-center gap-1"
              >
                Solutions
                <ChevronDown className="w-4 h-4" />
              </button>
              {isDropdownOpen && (
                <div
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                  className="absolute top-full mt-2 w-48 bg-white/10 backdrop-blur-xxl rounded-xl border border-white/20 shadow-xl py-2"
                >
                  <Link
                    href="/plant-disease"
                    className="block px-4 py-2 text-white hover:bg-white/10 hover:text-green-300 transition-colors"
                  >
                    Crop Disease
                  </Link>
                  <Link
                    href="/fertilizer"
                    className="block px-4 py-2 text-white hover:bg-white/10 hover:text-green-300 transition-colors"
                  >
                    Fertilizer Recommendations
                  </Link>
                  <Link
                    href="/seasonal-advice"
                    className="block px-4 py-2 text-white hover:bg-white/10 hover:text-green-300 transition-colors"
                  >
                    Seasonal Adviser
                  </Link>
                </div>
              )}
            </div>
            <a
              href="/about-us"
              className="text-white hover:text-green-300 font-medium transition-colors"
            >
              About
            </a>
            <a
              href="/contact"
              className="text-white hover:text-green-300 font-medium transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <UserButton />
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="flex items-center gap-2 px-4 py-2 text-green-300 hover:text-white font-semibold transition-all duration-300 hover:bg-white/10 rounded-lg border border-green-400/50 hover:border-green-400"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
                <a
                  href="/auth/register"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </a>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-green-300 transition-colors"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/5 backdrop-blur-xl rounded-xl mt-2 border border-white/10">
              <a
                href="#home"
                className="block px-3 py-2 text-white hover:text-green-300 font-medium transition-colors rounded-lg hover:bg-white/10"
              >
                Home
              </a>
              <a
                href="#features"
                className="block px-3 py-2 text-white hover:text-green-300 font-medium transition-colors rounded-lg hover:bg-white/10"
              >
                Features
              </a>
              <a
                href="#solutions"
                className="block px-3 py-2 text-white hover:text-green-300 font-medium transition-colors rounded-lg hover:bg-white/10"
              >
                Solutions
              </a>
              <a
                href="#about"
                className="block px-3 py-2 text-white hover:text-green-300 font-medium transition-colors rounded-lg hover:bg-white/10"
              >
                About
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 text-white hover:text-green-300 font-medium transition-colors rounded-lg hover:bg-white/10"
              >
                Contact
              </a>
              {user ? (
                <UserButton />
              ) : (
                <div className="pt-4 border-t border-white/20 space-y-2">
                  <Link
                    href="/auth/login"
                    className="flex items-center gap-2 px-3 py-2 text-green-300 hover:text-white font-semibold transition-all duration-300 hover:bg-white/10 rounded-lg border border-green-400/50"
                  >
                    <LogIn className="w-4 h-4" />
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg shadow-lg"
                  >
                    <UserPlus className="w-4 h-4" />
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
