"use client";
import React, { useState } from "react";
import {
  Home,
  Search,
  ArrowLeft,
  Leaf,
  Sun,
  Droplets,
  TreePine,
  Wheat,
  Apple,
  Compass,
  MapPin,
  RefreshCw,
  HelpCircle,
} from "lucide-react";

const NotFoundPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setIsSearching(true);
      // Simulate search
      setTimeout(() => {
        setIsSearching(false);
        // Redirect to search results or show suggestions
        console.log("Searching for:", searchTerm);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(34,197,94,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(16,185,129,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent,rgba(34,197,94,0.05),transparent_60deg)]"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-green-400/10 to-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-32 w-32 h-32 bg-gradient-to-br from-lime-400/15 to-green-400/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/3 w-36 h-36 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>

        {/* Floating Icons */}
        <Wheat className="absolute top-24 left-1/4 w-6 h-6 text-amber-400/20 animate-bounce delay-300" />
        <TreePine className="absolute top-40 right-1/4 w-5 h-5 text-green-400/25 animate-pulse delay-1500" />
        <Apple className="absolute bottom-48 left-1/6 w-4 h-4 text-red-400/20 animate-bounce delay-800" />
        <Leaf className="absolute top-1/2 left-16 w-4 h-4 text-green-300/30 animate-bounce delay-1200" />
        <Sun className="absolute top-32 right-24 w-6 h-6 text-yellow-400/25 animate-pulse delay-2200" />
        <Droplets className="absolute bottom-40 right-1/5 w-4 h-4 text-blue-400/20 animate-bounce delay-600" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-200px)] px-8">
        <div className="max-w-4xl w-full text-center">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="relative inline-block">
              {/* Large 404 Text */}
              <div className="text-[12rem] md:text-[16rem] font-bold bg-gradient-to-r from-green-400/20 via-lime-400/30 to-emerald-400/20 bg-clip-text text-transparent select-none leading-none">
                404
              </div>
              {/* Decorative Elements */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-32 h-32 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-2xl animate-pulse"></div>
              </div>
              <Compass
                className="absolute top-8 right-8 w-12 h-12 text-green-400/50 animate-spin"
                style={{ animationDuration: "8s" }}
              />
              <MapPin className="absolute bottom-8 left-8 w-8 h-8 text-lime-400/60 animate-bounce delay-500" />
            </div>
          </div>

          {/* Error Message */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl max-w-2xl mx-auto mb-8">
            <div className="mb-6">
              <h2 className="text-4xl font-bold text-white mb-4">
                Oops! Field Not Found
              </h2>
              <p className="text-xl text-green-100 mb-4">
                Looks like you&apos;ve wandered into an uncharted field. The
                page you&apos;re looking for doesn&apos;t exist in our
                agricultural database.
              </p>
              <p className="text-green-200">
                Don&apos;t worry - even the best farmers sometimes lose their
                way. Let&apos;s get you back to fertile ground!
              </p>
            </div>

            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative">
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search for crops, tools, or insights..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full h-14 bg-white/10 border border-white/20 rounded-2xl px-6 pr-16 text-white placeholder:text-white/50 focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-400/20 backdrop-blur-sm"
                    />
                    <button
                      type="submit"
                      disabled={isSearching}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center hover:from-green-600 hover:to-emerald-600 transition-all duration-200 disabled:opacity-50"
                    >
                      {isSearching ? (
                        <RefreshCw className="w-5 h-5 text-white animate-spin" />
                      ) : (
                        <Search className="w-5 h-5 text-white" />
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.history.back()}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500 hover:from-green-600 hover:via-emerald-600 hover:to-lime-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Go Back</span>
              </button>

              <button
                onClick={() => (window.location.href = "/")}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-white/10 border border-white/20 hover:bg-white/20 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm"
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </button>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-8 text-center">
            <p className="text-green-200 mb-4 flex items-center justify-center gap-2">
              <HelpCircle className="w-4 h-4" />
              <span>Still need help finding what you&apos;re looking for?</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
