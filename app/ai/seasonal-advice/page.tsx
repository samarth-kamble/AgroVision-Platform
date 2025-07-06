"use client";

import React, { useState } from "react";
import { getSeasonalAdvice } from "@/actions/seasonal-adviser";

import {
  Calendar,
  MapPin,
  Wheat,
  Sun,
  Cloud,
  Snowflake,
  Globe,
  TrendingUp,
  Activity,
  Clock,
  Leaf,
  Thermometer,
  Droplets,
  Wind,
  Sunrise,
} from "lucide-react";

type FormField = "location" | "crop_type" | "hemisphere";

export default function SeasonalAdvisor() {
  type SeasonalAdviceResult =
    | {
        current_season?: string;
        advice?: string;
        weather_considerations?: string;
        planting_schedule?: string;
        error?: string;
      }
    | string
    | null;

  const [result, setResult] = useState<SeasonalAdviceResult>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Record<FormField, string>>({
    location: "",
    crop_type: "",
    hemisphere: "",
  });

  const handleInputChange = (name: FormField, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    const res = await getSeasonalAdvice(data);
    if (res.success) {
      setResult(res.advice);
    } else {
      setResult({ error: res.error });
    }
    setLoading(false);
  };

  const popularCrops = [
    "Rice",
    "Wheat",
    "Maize",
    "Soybean",
    "Cotton",
    "Sugarcane",
    "Potato",
    "Tomato",
    "Onion",
    "Cabbage",
    "Carrot",
    "Lettuce",
  ];

  const hemispheres = [
    { value: "northern", label: "Northern Hemisphere", icon: Sun },
    { value: "southern", label: "Southern Hemisphere", icon: Snowflake },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-xl mb-4">
          <Calendar className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent mb-2">
          Seasonal Farming Advisor
        </h1>
        <p className="text-green-200 max-w-2xl mx-auto">
          Get personalized seasonal farming advice based on your location, crop
          type, and hemisphere
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Input Fields */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              Location & Crop Information
            </h2>

            <div className="space-y-6">
              {/* Location */}
              <div className="group">
                <label className="text-sm font-semibold text-green-200 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </label>
                <div className="relative">
                  <input
                    name="location"
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20 transition-all duration-300 text-white placeholder:text-white/50 backdrop-blur-sm"
                    placeholder="Enter your city, state, or region (e.g., Mumbai, Maharashtra)"
                  />
                  <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-orange-400 to-red-500 rounded-r-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                </div>
                <p className="text-xs text-green-300/80 mt-1">
                  Be specific for better local seasonal advice
                </p>
              </div>

              {/* Crop Type */}
              <div className="group">
                <label className="text-sm font-semibold text-green-200 mb-2 flex items-center gap-2">
                  <Wheat className="w-4 h-4" />
                  Crop Type
                </label>
                <div className="relative">
                  <input
                    name="crop_type"
                    type="text"
                    required
                    value={formData.crop_type}
                    onChange={(e) =>
                      handleInputChange("crop_type", e.target.value)
                    }
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20 transition-all duration-300 text-white placeholder:text-white/50 backdrop-blur-sm"
                    placeholder="Enter crop name (e.g., Rice, Wheat, Tomato)"
                  />
                  <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-green-400 to-emerald-500 rounded-r-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                </div>
                <p className="text-xs text-green-300/80 mt-1">
                  Choose from popular crops below or type your own
                </p>

                {/* Popular Crops */}
                <div className="mt-3">
                  <p className="text-xs text-green-300 mb-2">Popular crops:</p>
                  <div className="flex flex-wrap gap-2">
                    {popularCrops.map((crop) => (
                      <button
                        key={crop}
                        type="button"
                        onClick={() => handleInputChange("crop_type", crop)}
                        className="px-3 py-1 text-xs bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-green-200 hover:text-white transition-all duration-200"
                      >
                        {crop}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hemisphere */}
              <div className="group">
                <label className="text-sm font-semibold text-green-200 mb-2 flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Hemisphere
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {hemispheres.map((hemisphere) => {
                    const Icon = hemisphere.icon;
                    return (
                      <button
                        key={hemisphere.value}
                        type="button"
                        onClick={() =>
                          handleInputChange("hemisphere", hemisphere.value)
                        }
                        className={`p-4 rounded-xl border transition-all duration-300 flex items-center gap-3 ${
                          formData.hemisphere === hemisphere.value
                            ? "bg-orange-500/20 border-orange-400/50 text-white"
                            : "bg-white/10 border-white/20 text-green-200 hover:bg-white/20 hover:text-white"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-sm font-medium">
                          {hemisphere.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-green-300/80 mt-1">
                  Select your hemisphere for accurate seasonal timing
                </p>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={
                loading ||
                !Object.values(formData).every((val) => val.trim() !== "")
              }
              className="w-full mt-6 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                  Getting Seasonal Advice...
                </>
              ) : (
                <>
                  <Calendar className="w-5 h-5" />
                  Get Seasonal Advice
                </>
              )}
            </button>
          </div>

          {/* Results */}
          {result && (
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl animate-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                Seasonal Farming Advice
              </h3>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                {typeof result === "object" &&
                result !== null &&
                "error" in result &&
                result.error ? (
                  <div className="text-red-300 text-center py-4">
                    <p className="font-semibold">Error:</p>
                    <p>{result.error}</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {typeof result === "string" ? (
                      <div className="prose prose-invert max-w-none">
                        <div
                          className="text-green-200 leading-relaxed space-y-4"
                          dangerouslySetInnerHTML={{
                            __html: result
                              .replace(
                                /\*\*(.*?)\*\*/g,
                                '<strong class="text-white font-semibold">$1</strong>'
                              )
                              .replace(/\* /g, "• ")
                              .replace(/\n\n/g, '</p><p class="mt-4">')
                              .replace(/^/, "<p>")
                              .replace(/$/, "</p>"),
                          }}
                        />
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {result.current_season && (
                          <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                            <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              Current Season
                            </h4>
                            <p className="text-green-200">
                              {result.current_season}
                            </p>
                          </div>
                        )}
                        {result.advice && (
                          <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                            <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                              <Leaf className="w-4 h-4" />
                              Farming Advice
                            </h4>
                            <div
                              className="text-green-200 leading-relaxed"
                              dangerouslySetInnerHTML={{
                                __html: result.advice
                                  .replace(
                                    /\*\*(.*?)\*\*/g,
                                    '<strong class="text-white font-semibold">$1</strong>'
                                  )
                                  .replace(/\* /g, "• ")
                                  .replace(/\n\n/g, '</p><p class="mt-3">')
                                  .replace(/^/, "<p>")
                                  .replace(/$/, "</p>"),
                              }}
                            />
                          </div>
                        )}
                        {result.weather_considerations && (
                          <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                            <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                              <Cloud className="w-4 h-4" />
                              Weather Considerations
                            </h4>
                            <div
                              className="text-green-200 leading-relaxed"
                              dangerouslySetInnerHTML={{
                                __html: result.weather_considerations
                                  .replace(
                                    /\*\*(.*?)\*\*/g,
                                    '<strong class="text-white font-semibold">$1</strong>'
                                  )
                                  .replace(/\* /g, "• ")
                                  .replace(/\n\n/g, '</p><p class="mt-3">')
                                  .replace(/^/, "<p>")
                                  .replace(/$/, "</p>"),
                              }}
                            />
                          </div>
                        )}
                        {result.planting_schedule && (
                          <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                            <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              Planting Schedule
                            </h4>
                            <div
                              className="text-green-200 leading-relaxed"
                              dangerouslySetInnerHTML={{
                                __html: result.planting_schedule
                                  .replace(
                                    /\*\*(.*?)\*\*/g,
                                    '<strong class="text-white font-semibold">$1</strong>'
                                  )
                                  .replace(/\* /g, "• ")
                                  .replace(/\n\n/g, '</p><p class="mt-3">')
                                  .replace(/^/, "<p>")
                                  .replace(/$/, "</p>"),
                              }}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* How It Works */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Activity className="w-3 h-3 text-white" />
              </div>
              How It Works
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-500/20 border border-orange-400/30 rounded-full flex items-center justify-center text-xs font-bold text-orange-300 mt-0.5 flex-shrink-0">
                  1
                </div>
                <span className="text-sm text-green-200">
                  Enter your location and crop details
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-500/20 border border-orange-400/30 rounded-full flex items-center justify-center text-xs font-bold text-orange-300 mt-0.5 flex-shrink-0">
                  2
                </div>
                <span className="text-sm text-green-200">
                  Select your hemisphere for seasonal context
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-500/20 border border-orange-400/30 rounded-full flex items-center justify-center text-xs font-bold text-orange-300 mt-0.5 flex-shrink-0">
                  3
                </div>
                <span className="text-sm text-green-200">
                  Get personalized seasonal farming advice
                </span>
              </div>
            </div>
          </div>

          {/* Seasonal Tips */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Sunrise className="w-3 h-3 text-white" />
              </div>
              Seasonal Factors
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Thermometer className="w-4 h-4 text-red-400" />
                <span className="text-sm text-green-200">
                  Temperature patterns
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Droplets className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-green-200">
                  Rainfall distribution
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Wind className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-green-200">Wind patterns</span>
              </div>
              <div className="flex items-center gap-3">
                <Sun className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-green-200">Daylight hours</span>
              </div>
            </div>
          </div>

          {/* Best Practices */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Leaf className="w-3 h-3 text-white" />
              </div>
              Best Practices
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm text-green-200">
                  Plan 3-6 months ahead for optimal results
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm text-green-200">
                  Consider local climate variations
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm text-green-200">
                  Monitor weather forecasts regularly
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm text-green-200">
                  Adjust based on seasonal changes
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
