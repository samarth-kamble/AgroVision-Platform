import React from "react";
import {
  ArrowRight,
  Play,
  Zap,
  TrendingUp,
  Users,
  Award,
  Sparkles,
  Leaf,
  Sun,
  Droplets,
  TreePine,
  Wheat,
  Apple,
} from "lucide-react";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900"
    >
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
        <Sparkles className="absolute bottom-16 left-1/5 w-4 h-4 text-purple-400/20 animate-pulse delay-1800" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 text-green-300 font-medium mb-8 animate-bounce">
          <Sparkles className="w-4 h-4" />
          <span>AI-Powered Smart Agriculture</span>
          <Sparkles className="w-4 h-4" />
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Revolutionize Your
          <span className="bg-gradient-to-r from-green-400 via-lime-400 to-emerald-400 bg-clip-text text-transparent block">
            Agricultural Future
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-4xl mx-auto leading-relaxed">
          Harness the power of AI, IoT, and data analytics to maximize crop
          yields, optimize resource usage, and build sustainable farming
          practices for tomorrow.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <a
            href="/auth/register"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500 hover:from-green-600 hover:via-emerald-600 hover:to-lime-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <span>Start Free Trial</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>

          <button className="group inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Play className="w-4 h-4 ml-0.5" />
            </div>
            <span>Watch Demo</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { icon: Users, value: "10K+", label: "Active Farmers" },
            { icon: TrendingUp, value: "25%", label: "Yield Increase" },
            { icon: Zap, value: "30%", label: "Cost Reduction" },
            { icon: Award, value: "50+", label: "Countries" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center justify-center mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-green-400" />
                </div>
              </div>
              <div className="text-2xl font-bold text-lime-400 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-green-200">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
