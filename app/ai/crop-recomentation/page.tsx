"use client";

import React, { useState } from "react";
import { predictCrop } from "@/actions/predict-crop";
import {
  Wheat,
  TrendingUp,
  Droplets,
  Thermometer,
  Cloud,
  Activity,
  FlaskConical,
} from "lucide-react";

type FormField =
  | "N"
  | "P"
  | "K"
  | "temperature"
  | "humidity"
  | "ph"
  | "rainfall";

export default function CropRecommender() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Record<FormField, string>>({
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });

  const handleInputChange = (name: FormField, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    // Create FormData object
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    const res = await predictCrop(data);
    if (res.success) {
      setResult(String(res.data));
    } else {
      setResult("Error: " + res.error);
    }
    setLoading(false);
  };

  const fieldConfigs = [
    {
      name: "N",
      label: "Nitrogen (N)",
      icon: FlaskConical,
      unit: "kg/ha",
      color: "from-blue-400 to-blue-500",
      description: "Essential for leaf growth and chlorophyll production",
    },
    {
      name: "P",
      label: "Phosphorus (P)",
      icon: Activity,
      unit: "kg/ha",
      color: "from-purple-400 to-purple-500",
      description: "Critical for root development and flower formation",
    },
    {
      name: "K",
      label: "Potassium (K)",
      icon: TrendingUp,
      unit: "kg/ha",
      color: "from-pink-400 to-pink-500",
      description: "Important for water regulation and disease resistance",
    },
    {
      name: "temperature",
      label: "Temperature",
      icon: Thermometer,
      unit: "°C",
      color: "from-red-400 to-red-500",
      description: "Average temperature during growing season",
    },
    {
      name: "humidity",
      label: "Humidity",
      icon: Droplets,
      unit: "%",
      color: "from-cyan-400 to-cyan-500",
      description: "Relative humidity levels in your area",
    },
    {
      name: "ph",
      label: "pH Level",
      icon: Activity,
      unit: "pH",
      color: "from-emerald-400 to-emerald-500",
      description: "Soil acidity/alkalinity measurement",
    },
    {
      name: "rainfall",
      label: "Rainfall",
      icon: Cloud,
      unit: "mm",
      color: "from-indigo-400 to-indigo-500",
      description: "Annual rainfall in your region",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl mb-4">
          <Wheat className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent mb-2">
          Smart Crop Recommendation
        </h1>
        <p className="text-green-200 max-w-2xl mx-auto">
          Get AI-powered crop recommendations based on your soil composition and
          environmental conditions
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Input Fields */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <FlaskConical className="w-4 h-4 text-white" />
              </div>
              Soil & Environmental Parameters
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {fieldConfigs.map((field) => {
                const Icon = field.icon;
                return (
                  <div key={field.name} className="group">
                    <label className=" text-sm font-semibold text-green-200 mb-2 flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      {field.label}
                      <span className="text-xs text-green-300 font-normal">
                        ({field.unit})
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        name={field.name}
                        type="number"
                        step="any"
                        required
                        value={formData[field.name as FormField]}
                        onChange={(e) =>
                          handleInputChange(
                            field.name as FormField,
                            e.target.value
                          )
                        }
                        className="w-full p-4 rounded-xl bg-white/10 border border-white/20 focus:border-green-400 focus:ring-4 focus:ring-green-400/20 transition-all duration-300 text-white placeholder:text-white/50 backdrop-blur-sm"
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                      />
                      <div
                        className={`absolute inset-y-0 right-0 w-1 bg-gradient-to-b ${field.color} rounded-r-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300`}
                      />
                    </div>
                    <p className="text-xs text-green-300/80 mt-1">
                      {field.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleSubmit}
              disabled={
                loading ||
                !Object.values(formData).every((val) => val.trim() !== "")
              }
              className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                  Analyzing Your Data...
                </>
              ) : (
                <>
                  <Wheat className="w-5 h-5" />
                  Get Smart Recommendation
                </>
              )}
            </button>
          </div>

          {/* Results */}
          {result && (
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl animate-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                Recommended Crop
              </h3>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div
                  className="prose prose-invert max-w-none text-green-200"
                  dangerouslySetInnerHTML={{ __html: result }}
                />
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
                <div className="w-6 h-6 bg-green-500/20 border border-green-400/30 rounded-full flex items-center justify-center text-xs font-bold text-green-300 mt-0.5 flex-shrink-0">
                  1
                </div>
                <span className="text-sm text-green-200">
                  Input your soil&apos;s NPK values and environmental conditions
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500/20 border border-green-400/30 rounded-full flex items-center justify-center text-xs font-bold text-green-300 mt-0.5 flex-shrink-0">
                  2
                </div>
                <span className="text-sm text-green-200">
                  Our AI analyzes optimal growing conditions
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500/20 border border-green-400/30 rounded-full flex items-center justify-center text-xs font-bold text-green-300 mt-0.5 flex-shrink-0">
                  3
                </div>
                <span className="text-sm text-green-200">
                  Get personalized crop recommendations
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-green-200">Accuracy Rate</span>
                <span className="text-sm font-bold text-white">94.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-green-200">Crops Analyzed</span>
                <span className="text-sm font-bold text-white">22+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-green-200">Predictions Made</span>
                <span className="text-sm font-bold text-white">10,000+</span>
              </div>
            </div>
          </div>

          {/* Pro Tips */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Wheat className="w-3 h-3 text-white" />
              </div>
              Pro Tips
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm text-green-200">
                  Test soil samples from multiple field areas
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm text-green-200">
                  Consider seasonal temperature variations
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm text-green-200">
                  Monitor pH levels regularly for best results
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm text-green-200">
                  Include historical rainfall data if available
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
