"use client";
import React, { useState } from "react";
import {
  Zap,
  ArrowRight,
  CheckCircle,
  Sprout,
  SunSnow,
  Bot,
  Users,
  ShoppingCart,
  ShieldCheck,
} from "lucide-react";

const FeaturesSection = () => {
  const [activeTab, setActiveTab] = useState<
    "prediction" | "fertilizer" | "community"
  >("prediction");

  const features = [
    {
      icon: Sprout,
      title: "Crop & Animal Disease Detection",
      description:
        "AI-powered image analysis for detecting crop and livestock diseases with treatment suggestions and expert guidance.",
      gradient: "from-green-600 to-lime-500",
    },
    {
      icon: SunSnow,
      title: "Smart Fertilizer Advice",
      description:
        "Get personalized fertilizer recommendations based on soil nutrients, crop type, and weather conditions.",
      gradient: "from-yellow-500 to-amber-500",
    },
    {
      icon: Bot,
      title: "Realtime Farming Chatbot",
      description:
        "Multilingual AI assistant that answers farming queries and connects users with features and help—anytime, anywhere.",
      gradient: "from-blue-600 to-sky-500",
    },
    {
      icon: Users,
      title: "Farmer Community",
      description:
        "Engage with fellow farmers, ask questions, join groups by crop or region, and share your success stories.",
      gradient: "from-violet-600 to-purple-500",
    },
    {
      icon: ShoppingCart,
      title: "Farming E-commerce",
      description:
        "Buy seeds, tools, fertilizers, and more from trusted vendors — with reviews, ratings, and order tracking.",
      gradient: "from-orange-500 to-rose-500",
    },
    {
      icon: ShieldCheck,
      title: "Government Schemes & Weather Alerts",
      description:
        "Stay updated with weather conditions, market prices, and government schemes tailored to your region.",
      gradient: "from-cyan-600 to-blue-400",
    },
  ];

  const tabContent = {
    prediction: {
      title: "AI Disease Detection",
      description:
        "Upload images of crops or animals to instantly detect diseases using our advanced AI models.",
      features: [
        "Supports plant and livestock analysis",
        "Instant treatment suggestions",
        "Expert connect for complex cases",
        "Historical health tracking",
      ],
      image: "🧬",
    },
    fertilizer: {
      title: "Fertilizer Recommendation System",
      description:
        "Get accurate, cost-optimized fertilizer suggestions tailored to your soil and crop.",
      features: [
        "NPK balance calculation",
        "Soil & crop-based inputs",
        "Organic vs synthetic options",
        "Yield prediction from usage",
      ],
      image: "🧪",
    },
    community: {
      title: "Social Farming Network",
      description:
        "Connect, collaborate, and grow together with other farmers and agricultural experts.",
      features: [
        "Create and join farming groups",
        "Post images, videos, questions",
        "Like, comment, and share content",
        "Expert verification & events",
      ],
      image: "👥",
    },
  };

  return (
    <section
      id="features"
      className="py-20 bg-slate-900 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(34,197,94,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.08),transparent_50%)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 backdrop-blur-xl rounded-full border border-green-500/20 text-green-400 font-medium mb-6">
            <Zap className="w-4 h-4" />
            <span>Powerful Features</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Everything You Need for
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent block">
              Smart Farming
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our comprehensive platform combines cutting-edge technology with
            agricultural expertise to help you maximize productivity and
            sustainability.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-green-500/30 transition-all duration-300 hover:transform hover:scale-105 hover:bg-white/10"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-green-300 transition-colors">
                {feature.title}
              </h3>

              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>

              <div className="mt-6 flex items-center text-green-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Tabs Section */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex flex-col sm:flex-row border-b border-white/10">
            {Object.entries(tabContent).map(([key, content]) => (
              <button
                key={key}
                onClick={() =>
                  setActiveTab(key as "prediction" | "fertilizer" | "community")
                }
                className={`flex-1 px-6 py-4 text-left transition-all duration-300 ${
                  activeTab === key
                    ? "bg-green-500/20 text-green-300 border-b-2 border-green-400"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="font-semibold">{content.title}</div>
                <div className="text-sm opacity-70 mt-1">
                  {content.description.split(".")[0]}...
                </div>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-white mb-6">
                  {tabContent[activeTab].title}
                </h3>

                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  {tabContent[activeTab].description}
                </p>

                <div className="space-y-4 mb-8">
                  {tabContent[activeTab].features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <span>Explore Feature</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="relative">
                <div className="w-full h-80 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center border border-green-500/30 backdrop-blur-sm">
                  <div className="text-8xl opacity-50">
                    {tabContent[activeTab].image}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-lime-400/20 to-green-400/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
