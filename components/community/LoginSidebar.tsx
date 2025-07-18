import React, { useState } from "react";
import { X, User, Mail, Lock, Eye, EyeOff } from "lucide-react";

interface LoginSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginSidebar: React.FC<LoginSidebarProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/20 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">
            {isLogin ? "Welcome Back" : "Join AgroVision"}
          </h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <div className="text-sm font-medium text-green-300">
                Full Name
              </div>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-white/50" />
                <input
                  type="text"
                  className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all"
                  placeholder="Enter your name"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <div className="text-sm font-medium text-green-300">Email</div>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-white/50" />
              <input
                type="email"
                className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-green-300">Password</div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-white/50" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-11 pr-11 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-white/50 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-[1.02] shadow-lg">
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-white/70 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-green-400 hover:text-green-300 font-medium transition-colors"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSidebar;
