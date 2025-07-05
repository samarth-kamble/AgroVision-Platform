"use client";

import React from "react";
import {
  AlertTriangle,
  ArrowLeft,
  Leaf,
  Sun,
  Droplets,
  TreePine,
  Wheat,
  Apple,
  RefreshCw,
  Home,
  Shield,
} from "lucide-react";
import Link from "next/link";

const ErrorCard = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-red-900 to-rose-900">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(239,68,68,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(220,38,38,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent,rgba(239,68,68,0.05),transparent_60deg)]"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-red-400/10 to-rose-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-32 w-32 h-32 bg-gradient-to-br from-orange-400/15 to-red-400/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/3 w-36 h-36 bg-gradient-to-br from-rose-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>

        {/* Floating Icons */}
        <Wheat className="absolute top-24 left-1/4 w-6 h-6 text-amber-400/20 animate-bounce delay-300" />
        <TreePine className="absolute top-40 right-1/4 w-5 h-5 text-green-400/25 animate-pulse delay-1500" />
        <Apple className="absolute bottom-48 left-1/6 w-4 h-4 text-red-400/30 animate-bounce delay-800" />
        <Leaf className="absolute top-1/2 left-16 w-4 h-4 text-green-300/30 animate-bounce delay-1200" />
        <Sun className="absolute top-32 right-24 w-6 h-6 text-yellow-400/25 animate-pulse delay-2200" />
        <Droplets className="absolute bottom-40 right-1/5 w-4 h-4 text-blue-400/20 animate-bounce delay-600" />
      </div>

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-lg">
          {/* Error Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl text-center">
            {/* Error Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500/20 to-rose-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-red-400/30">
                  <AlertTriangle className="w-10 h-10 text-red-400 animate-pulse" />
                </div>
                <div className="absolute inset-0 bg-red-400/20 rounded-full animate-ping"></div>
              </div>
            </div>

            {/* Error Message */}
            <h2 className="text-3xl font-bold text-white mb-4">
              Oops! Something Went Wrong
            </h2>

            <p className="text-red-100 text-lg mb-2">
              We encountered an authentication error
            </p>

            <p className="text-red-200/80 mb-8 leading-relaxed">
              Don&apos;t worry, this happens sometimes. It could be a temporary
              issue with our servers or your session may have expired.
              Let&apos;s get you back on track.
            </p>

            {/* Error Details */}
            <div className="bg-red-500/10 border border-red-400/30 rounded-2xl p-4 mb-8 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-2 text-red-300 mb-2">
                <Shield className="w-4 h-4" />
                <span className="font-semibold">Authentication Error</span>
              </div>
              <p className="text-red-200/80 text-sm">
                Please try logging in again or contact support if the issue
                persists.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {/* Primary Action - Back to Login */}
              <a
                href="/auth/login"
                className="w-full inline-flex items-center justify-center gap-3 h-14 bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 hover:from-red-600 hover:via-rose-600 hover:to-pink-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Login</span>
              </a>

              {/* Secondary Actions */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center justify-center gap-2 h-12 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105 group"
                >
                  <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                  <span>Retry</span>
                </button>

                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 h-12 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105 group"
                >
                  <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Home</span>
                </Link>
              </div>
            </div>

            {/* Help Section */}
            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-red-200/80 text-sm mb-4">
                Still having trouble? We&apos;re here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="/support"
                  className="inline-flex items-center gap-2 px-4 py-2 text-red-300 hover:text-white font-medium transition-all duration-300 hover:bg-white/10 rounded-lg border border-red-400/50 hover:border-red-400 text-sm"
                >
                  <span>Contact Support</span>
                </a>
                <a
                  href="/auth/register"
                  className="inline-flex items-center gap-2 px-4 py-2 text-red-300 hover:text-white font-medium transition-all duration-300 hover:bg-white/10 rounded-lg border border-red-400/50 hover:border-red-400 text-sm"
                >
                  <span>Create New Account</span>
                  <Leaf className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorCard;
