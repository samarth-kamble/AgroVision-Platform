"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User,
  Loader2,
  Sparkles,
  Leaf,
  MessageCircle,
  Zap,
  Sun,
  Cloud,
  Droplets,
} from "lucide-react";

// Import your actual server action
import { askFarmerChatbot } from "@/actions/chatbot";

// Helper function to format bot responses
const formatBotResponse = (text: string) => {
  // Remove sources section at the end
  const cleanText = text.replace(/\*\*Sources:\*\*[\s\S]*$/, "").trim();

  // Split into sections and format
  const sections = cleanText.split(/\*\*\d+\.\s+/);
  const intro = sections[0];
  const numberedSections = sections.slice(1);

  let formatted = intro;

  numberedSections.forEach((section, index) => {
    const sectionNumber = index + 1;
    const lines = section.split("\n");
    const title = lines[0].replace(/\*\*/g, "");
    const content = lines.slice(1).join("\n");

    formatted += `\n\n**${sectionNumber}. ${title}**\n`;

    // Format bullet points and sub-sections
    const formattedContent = content
      .replace(/\*\*\*(.*?)\*\*\*/g, "• **$1**") // Convert *** to bullet points
      .replace(/\*\*(.*?)\*\*/g, "**$1**") // Keep bold formatting
      .replace(/\n\s*\n/g, "\n\n") // Clean up extra line breaks
      .trim();

    formatted += formattedContent;
  });

  return formatted;
};

// Helper function to render formatted text
const renderFormattedText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <span key={index} className="font-semibold text-emerald-100">
          {part.slice(2, -2)}
        </span>
      );
    }
    return part;
  });
};

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const FarmerChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize client-side only state
  useEffect(() => {
    setIsClient(true);
    setMessages([
      {
        id: "1",
        text: "🌾 Hello! I'm your AI farming assistant. I can help you with crop recommendations, pest control, soil management, and general farming advice. What would you like to know?",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await askFarmerChatbot(input.trim());

      if (response.success) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: formatBotResponse(response.data.answer),
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Something went wrong. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Show loading state during hydration
  if (!isClient) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900">
        <div className="flex items-center gap-3 text-white">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading Farming Assistant...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(34,197,94,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(5,150,105,0.2),transparent_50%)]" />

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-3 h-3 bg-green-400/30 rounded-full animate-pulse" />
        <div className="absolute top-32 right-20 w-2 h-2 bg-emerald-400/40 rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-32 w-4 h-4 bg-teal-400/20 rounded-full animate-pulse delay-2000" />
        <div className="absolute bottom-40 right-10 w-2 h-2 bg-green-300/30 rounded-full animate-pulse delay-500" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500/20 via-green-500/20 to-teal-500/20 backdrop-blur-xl border-b border-white/20 p-6 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 via-green-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-green-500/30">
                  <Bot className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse">
                  <div className="w-full h-full bg-white/30 rounded-full animate-ping" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-green-100 to-emerald-200 bg-clip-text text-transparent">
                  AI Farming Assistant
                </h2>
                <p className="text-emerald-200 text-sm flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 animate-pulse" />
                  Powered by agricultural intelligence
                  <Zap className="w-3 h-3 text-yellow-400 animate-pulse delay-500" />
                </p>
              </div>
            </div>

            {/* Weather Icons */}
            <div className="hidden md:flex items-center gap-3 text-white/60">
              <Sun className="w-5 h-5 animate-pulse" />
              <Cloud className="w-5 h-5 animate-pulse delay-300" />
              <Droplets className="w-5 h-5 animate-pulse delay-600" />
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-emerald-500/30 scrollbar-track-transparent">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-5 py-4 ${
                  message.sender === "user"
                    ? "bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 text-white shadow-xl shadow-green-500/30 transform hover:scale-[1.02] transition-all duration-300"
                    : "bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl shadow-black/20 hover:bg-white/15 transition-all duration-300"
                }`}
              >
                <div className="flex items-start gap-3">
                  {message.sender === "bot" && (
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.sender === "bot"
                        ? renderFormattedText(message.text)
                        : message.text}
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <p
                        className={`text-xs ${
                          message.sender === "user"
                            ? "text-emerald-100"
                            : "text-emerald-300"
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </p>
                      {message.sender === "bot" && (
                        <div className="flex items-center gap-1">
                          <div className="w-1 h-1 bg-emerald-400/60 rounded-full" />
                          <div className="w-1 h-1 bg-emerald-400/40 rounded-full" />
                          <div className="w-1 h-1 bg-emerald-400/20 rounded-full" />
                        </div>
                      )}
                    </div>
                  </div>
                  {message.sender === "user" && (
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start animate-fadeIn">
              <div className="max-w-[85%] rounded-2xl px-5 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-200" />
                    </div>
                    <span className="text-sm text-emerald-200">
                      AI is analyzing...
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Section */}
        <div className="p-6 border-t border-white/20 bg-gradient-to-r from-black/20 via-black/10 to-black/20 backdrop-blur-xl flex-shrink-0">
          <div className="flex gap-4">
            <div className="flex-1 relative group">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder="Ask about crops, pests, soil, weather, or farming techniques..."
                className="w-full px-5 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 text-white placeholder:text-white/60 pr-14 transition-all duration-300 hover:bg-white/15 group-hover:border-emerald-400/50"
                disabled={isLoading}
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                <Leaf className="text-emerald-400 w-5 h-5 animate-pulse" />
                <MessageCircle className="text-emerald-400/60 w-4 h-4" />
              </div>
            </div>
            <button
              onClick={handleSubmit}
              disabled={!input.trim() || isLoading}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-2xl transition-all duration-300 shadow-xl shadow-green-500/30 hover:shadow-2xl hover:shadow-green-500/40 flex items-center gap-3 font-semibold transform hover:scale-105 active:scale-95"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="hidden sm:inline">Sending...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  <span className="hidden sm:inline">Send</span>
                </div>
              )}
            </button>
          </div>

          {/* Enhanced Quick Suggestions */}
          <div className="mt-5 flex flex-wrap gap-3">
            {[
              { text: "What crops should I plant?", icon: "🌱" },
              { text: "How to control pests?", icon: "🐛" },
              { text: "Soil improvement tips", icon: "🌍" },
              { text: "Weather impact on crops", icon: "🌦️" },
            ].map((suggestion) => (
              <button
                key={suggestion.text}
                onClick={() => setInput(suggestion.text)}
                className="px-4 py-2 text-sm bg-gradient-to-r from-white/10 to-white/5 hover:from-emerald-500/20 hover:to-green-500/20 border border-white/20 hover:border-emerald-400/50 rounded-xl text-emerald-200 hover:text-white transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
                disabled={isLoading}
              >
                <span>{suggestion.icon}</span>
                <span>{suggestion.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.3);
          border-radius: 3px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.5);
        }
      `}</style>
    </div>
  );
};

export default FarmerChatbot;
