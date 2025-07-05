"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Leaf,
  Loader2,
  Brain,
  Target,
  Zap,
  TrendingUp,
  DollarSign,
  Shield,
  CheckCircle,
  RefreshCw,
  Beaker,
  Thermometer,
  Droplets,
  Mountain,
} from "lucide-react";
import { predictFertilizer } from "@/actions/fertilizer-predict";
import { getFertilizerInsights } from "@/actions/gemini";

const FertilizerRecommendationPage = () => {
  const [form, setForm] = useState({
    N: 0,
    P: 0,
    K: 0,
    temperature: 25,
    humidity: 50,
    moisture: 20,
    soil_type: "Loamy",
    crop_type: "Rice",
  });

  const [result, setResult] = useState<string | null>(null);
  const [insights, setInsights] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [showInsights, setShowInsights] = useState(false);

  const soilTypes = ["Sandy", "Loamy", "Black", "Red", "Clayey"];
  const cropTypes = ["Wheat", "Rice", "Sugarcane", "Cotton", "Millets"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: isNaN(Number(value)) ? value : Number(value) });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);
    setInsights(null);
    setShowInsights(false);

    try {
      const res = await predictFertilizer(form);
      setResult(res as string);
    } catch (error) {
      console.error("Prediction failed:", error);
      setResult("Error occurred during prediction");
    } finally {
      setLoading(false);
    }
  };

  const handleGetInsights = async () => {
    if (!result) return;

    setLoadingInsights(true);
    setShowInsights(true);

    try {
      const insightsData = await getFertilizerInsights(result);
      setInsights(insightsData);
    } catch (error) {
      console.error("Failed to get insights:", error);
      setInsights("❌ Failed to fetch fertilizer analysis. Please try again.");
    } finally {
      setLoadingInsights(false);
    }
  };

  const formatInsights = (response: string) => {
    if (!response || response.trim() === "") {
      return (
        <p className="text-green-200/60 italic">No information available</p>
      );
    }

    if (response.includes("❌")) {
      return <p className="text-red-400 font-medium">{response}</p>;
    }

    const sections = response.split(/(?=\*\*[🌟⚠️💰⚖️🧠])/);

    return (
      <div className="space-y-6">
        {sections.map((section, index) => {
          if (!section.trim()) return null;

          const lines = section.split("\n").filter((line) => line.trim());
          if (lines.length === 0) return null;

          const headerLine = lines[0];
          const contentLines = lines.slice(1);

          const isHeaderSection =
            headerLine.includes("**") && /[🌟⚠️💰⚖️🧠]/.test(headerLine);

          if (isHeaderSection) {
            const headerText = headerLine.replace(/\*\*/g, "").trim();
            const emoji = headerText.match(/[🌟⚠️💰⚖️🧠]/)?.[0] || "";
            const title = headerText.replace(/[🌟⚠️💰⚖️🧠]/, "").trim();

            const sectionColors = {
              "🌟": "from-green-500 to-green-600",
              "⚠️": "from-orange-500 to-orange-600",
              "💰": "from-blue-500 to-blue-600",
              "⚖️": "from-purple-500 to-purple-600",
              "🧠": "from-emerald-500 to-emerald-600",
            };

            const colorClass =
              sectionColors[emoji as keyof typeof sectionColors] ||
              "from-gray-500 to-gray-600";

            return (
              <div
                key={index}
                className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-10 h-10 bg-gradient-to-br ${colorClass} rounded-xl flex items-center justify-center shadow-lg`}
                  >
                    <span className="text-lg">{emoji}</span>
                  </div>
                  <h4 className="text-xl font-bold text-white">{title}</h4>
                </div>
                <div className="space-y-3">
                  {contentLines.map((line, lineIndex) => {
                    const trimmedLine = line.trim();
                    if (!trimmedLine) return null;

                    if (trimmedLine.startsWith("- ")) {
                      const content = trimmedLine.replace(/^-\s*/, "");
                      return (
                        <div
                          key={lineIndex}
                          className="flex items-start gap-3 ml-4"
                        >
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-green-200/90 leading-relaxed">
                            {content}
                          </p>
                        </div>
                      );
                    }

                    return (
                      <p
                        key={lineIndex}
                        className="text-green-200/90 leading-relaxed"
                      >
                        {trimmedLine}
                      </p>
                    );
                  })}
                </div>
              </div>
            );
          }

          return null;
        })}
      </div>
    );
  };

  const resetForm = () => {
    setForm({
      N: 0,
      P: 0,
      K: 0,
      temperature: 25,
      humidity: 50,
      moisture: 20,
      soil_type: "Loamy",
      crop_type: "Rice",
    });
    setResult(null);
    setInsights(null);
    setShowInsights(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}

      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-2xl backdrop-blur-sm border border-white/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              <Leaf className="w-10 h-10 text-white relative z-10" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-lime-400 rounded-full animate-ping" />
            </div>
            <Sparkles className="absolute -top-2 -left-2 w-6 h-6 text-yellow-400 animate-pulse" />
            <Zap className="absolute -bottom-2 -right-2 w-5 h-5 text-blue-400 animate-bounce" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-green-200 to-emerald-300 bg-clip-text text-transparent mb-4">
            AI Fertilizer Recommendation
          </h1>
          <p className="text-green-200/80 text-xl max-w-2xl mx-auto leading-relaxed">
            Get personalized fertilizer recommendations based on soil conditions
            and crop requirements
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="p-8">
              <div className="space-y-6">
                {/* Soil Nutrients Section */}
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <Beaker className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      Soil Nutrients (NPK)
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {["N", "P", "K"].map((nutrient) => (
                      <div key={nutrient} className="space-y-2">
                        <label className="block text-sm font-medium text-green-200">
                          {nutrient === "N"
                            ? "Nitrogen (N)"
                            : nutrient === "P"
                              ? "Phosphorus (P)"
                              : "Potassium (K)"}
                        </label>
                        <input
                          type="number"
                          name={nutrient}
                          value={form[nutrient as keyof typeof form]}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent backdrop-blur-sm"
                          placeholder={`Enter ${nutrient} value`}
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Environmental Conditions Section */}
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                      <Thermometer className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      Environmental Conditions
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        field: "temperature",
                        label: "Temperature (°C)",
                        icon: Thermometer,
                      },
                      {
                        field: "humidity",
                        label: "Humidity (%)",
                        icon: Droplets,
                      },
                      {
                        field: "moisture",
                        label: "Soil Moisture (%)",
                        icon: Mountain,
                      },
                    ].map(({ field, label, icon: Icon }) => (
                      <div key={field} className="space-y-2">
                        <label className="block text-sm font-medium text-green-200 flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          {label}
                        </label>
                        <input
                          type="number"
                          name={field}
                          value={form[field as keyof typeof form]}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent backdrop-blur-sm"
                          placeholder={`Enter ${field}`}
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Crop & Soil Type Section */}
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                      <Leaf className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      Crop & Soil Information
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-green-200">
                        Soil Type
                      </label>
                      <select
                        name="soil_type"
                        value={form.soil_type}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent backdrop-blur-sm"
                        required
                      >
                        {soilTypes.map((soil) => (
                          <option
                            key={soil}
                            value={soil}
                            className="bg-gray-800"
                          >
                            {soil}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-green-200">
                        Crop Type
                      </label>
                      <select
                        name="crop_type"
                        value={form.crop_type}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent backdrop-blur-sm"
                        required
                      >
                        {cropTypes.map((crop) => (
                          <option
                            key={crop}
                            value={crop}
                            className="bg-gray-800"
                          >
                            {crop}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-4">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="group relative inline-flex items-center px-12 py-4 bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 text-white font-bold text-lg rounded-2xl hover:from-green-600 hover:via-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-4 focus:ring-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-2xl hover:shadow-green-500/25 hover:scale-[1.02] border border-white/20 backdrop-blur-sm overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin w-6 h-6 mr-3 relative z-10" />
                        <span className="relative z-10">Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <Brain className="w-6 h-6 mr-3 relative z-10 group-hover:scale-110 transition-transform" />
                        <span className="relative z-10">
                          Get Recommendation
                        </span>
                        <Sparkles className="w-5 h-5 ml-3 relative z-10 group-hover:animate-pulse" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Results Section */}
            {result && (
              <div className="border-t border-white/20 p-8">
                <div className="space-y-6">
                  {/* Recommendation Result */}
                  <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border border-green-400/30">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          Recommended Fertilizer
                        </h3>
                        <p className="text-green-200/80">
                          AI-powered recommendation
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Leaf className="w-6 h-6 text-green-400" />
                      <span className="text-3xl font-bold text-green-300">
                        {result}
                      </span>
                    </div>
                  </div>

                  {/* Get Insights Button */}
                  <div className="flex justify-center">
                    <button
                      onClick={handleGetInsights}
                      disabled={loadingInsights}
                      className="group relative inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-500 via-blue-600 to-indigo-600 text-white font-semibold text-lg rounded-xl hover:from-purple-600 hover:via-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-xl hover:shadow-purple-500/25 hover:scale-[1.02] border border-white/20 backdrop-blur-sm overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {loadingInsights ? (
                        <>
                          <Loader2 className="animate-spin w-5 h-5 mr-3 relative z-10" />
                          <span className="relative z-10">
                            Getting Insights...
                          </span>
                        </>
                      ) : (
                        <>
                          <TrendingUp className="w-5 h-5 mr-3 relative z-10 group-hover:scale-110 transition-transform" />
                          <span className="relative z-10">
                            Get Detailed Insights
                          </span>
                          <Sparkles className="w-4 h-4 ml-3 relative z-10 group-hover:animate-pulse" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Insights Section */}
                  {showInsights && (
                    <div className="bg-black/20 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                      <div className="p-6 border-b border-white/10">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                            {loadingInsights ? (
                              <Loader2 className="w-5 h-5 text-white animate-spin" />
                            ) : (
                              <Brain className="w-5 h-5 text-white" />
                            )}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white">
                              Detailed Fertilizer Analysis
                            </h3>
                            <p className="text-green-200/60 text-sm">
                              {loadingInsights
                                ? "Generating insights..."
                                : "Powered by AI"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        {loadingInsights ? (
                          <div className="flex items-center justify-center p-8">
                            <div className="text-center">
                              <div className="relative">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                  <Loader2 className="w-6 h-6 text-white animate-spin" />
                                </div>
                                <div className="absolute inset-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full animate-ping opacity-20 mx-auto"></div>
                              </div>
                              <p className="text-green-200/80 font-medium">
                                Analyzing fertilizer properties...
                              </p>
                              <p className="text-green-200/60 text-sm mt-1">
                                This may take a few moments
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-black/20 rounded-xl p-6 border border-white/10">
                            {insights ? (
                              formatInsights(insights)
                            ) : (
                              <p className="text-green-200/60 italic">
                                No insights available
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Reset Button */}
                  <div className="text-center">
                    <button
                      onClick={resetForm}
                      className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-2xl focus:outline-none focus:ring-4 focus:ring-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:scale-[1.02] shadow-xl"
                    >
                      <RefreshCw className="w-5 h-5" />
                      Get New Recommendation
                      <Sparkles className="w-4 h-4 animate-pulse" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="flex items-center justify-center gap-8 mt-8">
          <div className="flex items-center gap-2 text-green-300/80 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
            <Target className="w-5 h-5" />
            <span className="text-sm font-medium">Precision Agriculture</span>
          </div>
          <div className="flex items-center gap-2 text-green-300/80 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
            <DollarSign className="w-5 h-5" />
            <span className="text-sm font-medium">Cost Optimization</span>
          </div>
          <div className="flex items-center gap-2 text-green-300/80 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
            <Shield className="w-5 h-5" />
            <span className="text-sm font-medium">Expert Insights</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default FertilizerRecommendationPage;
