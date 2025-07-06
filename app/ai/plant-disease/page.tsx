"use client";

import React, { useState } from "react";
import {
  Upload,
  Camera,
  Loader2,
  CheckCircle,
  RefreshCw,
  Sparkles,
  Zap,
  Target,
  Brain,
  Eye,
  Microscope,
  Stethoscope,
  Pill,
  AlertCircle,
} from "lucide-react";
import { predictCropDisease } from "@/actions/predict-crop-disease";
import { getCropRemedies } from "@/actions/gemini";

interface PredictionResult {
  Prediction: string;
  Symptoms: string[];
}

interface EnhancedPrediction extends PredictionResult {
  geminiRemedies?: string;
  loadingRemedies?: boolean;
}

const CropDiseaseDetection = () => {
  const [prediction, setPrediction] = useState<EnhancedPrediction[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Enhanced Gemini response formatter
  const formatGeminiResponse = (response: string) => {
    if (!response || response.trim() === "") {
      return (
        <p className="text-green-200/60 italic">No information available</p>
      );
    }

    // Handle error messages
    if (response.includes("❌")) {
      return <p className="text-red-400 font-medium">{response}</p>;
    }

    const sections = response.split(/(?=\*\*[🔍🌱🦠🛡️💊🚨🌾])/);

    return (
      <div className="space-y-6">
        {sections.map((section, index) => {
          if (!section.trim()) return null;

          const lines = section.split("\n").filter((line) => line.trim());
          if (lines.length === 0) return null;

          const headerLine = lines[0];
          const contentLines = lines.slice(1);

          // Check if this is a header section
          const isHeaderSection =
            headerLine.includes("**") && /[🔍🌱🦠🛡️💊🚨🌾]/.test(headerLine);

          if (isHeaderSection) {
            const headerText = headerLine.replace(/\*\*/g, "").trim();
            const emoji = headerText.match(/[🔍🌱🦠🛡️💊🚨🌾]/)?.[0] || "";
            const title = headerText.replace(/[🔍🌱🦠🛡️💊🚨🌾]/, "").trim();

            // Color mapping for different sections
            const sectionColors = {
              "🔍": "from-blue-500 to-blue-600",
              "🌱": "from-green-500 to-green-600",
              "🦠": "from-red-500 to-red-600",
              "🛡️": "from-purple-500 to-purple-600",
              "💊": "from-emerald-500 to-emerald-600",
              "🚨": "from-orange-500 to-orange-600",
              "🌾": "from-yellow-500 to-yellow-600",
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

                    // Handle bullet points
                    if (
                      trimmedLine.startsWith("* ") ||
                      trimmedLine.startsWith("- ")
                    ) {
                      const content = trimmedLine.replace(/^[*-]\s*/, "");

                      // Check if it's a sub-header (contains colon)
                      if (content.includes(":")) {
                        const [header, ...rest] = content.split(":");
                        const description = rest.join(":").trim();

                        return (
                          <div key={lineIndex} className="ml-4 mb-3">
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                              <div>
                                <p className="text-green-300 font-semibold">
                                  {header}:
                                </p>
                                {description && (
                                  <p className="text-green-200/90 leading-relaxed mt-1 ml-2">
                                    {description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      }

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

                    // Handle sub-headers with **
                    if (
                      trimmedLine.includes("**") &&
                      !trimmedLine.startsWith("**")
                    ) {
                      const formattedLine = trimmedLine.replace(
                        /\*\*(.*?)\*\*/g,
                        '<strong class="text-green-300">$1</strong>'
                      );
                      return (
                        <p
                          key={lineIndex}
                          className="text-green-200/90 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: formattedLine }}
                        />
                      );
                    }

                    // Handle bold headers
                    if (
                      trimmedLine.startsWith("**") &&
                      trimmedLine.endsWith("**")
                    ) {
                      const headerText = trimmedLine.replace(/\*\*/g, "");
                      return (
                        <h5
                          key={lineIndex}
                          className="text-lg font-semibold text-green-300 mt-4 mb-2"
                        >
                          {headerText}
                        </h5>
                      );
                    }

                    // Regular paragraph
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
          } else {
            // Handle non-header sections
            return (
              <div key={index} className="space-y-2">
                {lines.map((line, lineIndex) => {
                  const trimmedLine = line.trim();
                  if (!trimmedLine) return null;

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
            );
          }
        })}
      </div>
    );
  };

  // Mock functions (replace with your actual backend calls)
  const handleSubmit = async (selectedFile: File) => {
    if (selectedFile && selectedFile.size > 0) {
      setIsLoading(true);
      try {
        const response = await predictCropDisease(selectedFile);

        // Format response (assuming result.data looks like your example)
        if (!response || !Array.isArray(response)) {
          throw new Error("Invalid response format from prediction API");
        }

        const formatted = response.map((item: PredictionResult) => ({
          Prediction: item.Prediction,
          Symptoms: item.Symptoms || [],
          geminiRemedies: undefined,
          loadingRemedies: false,
        }));

        setPrediction(formatted);

        await Promise.all(
          formatted.map(async (item, index) => {
            if (item.Prediction.toLowerCase() !== "healthy") {
              await getRemediesForPrediction(item.Prediction, index);
            }
          })
        );
      } catch (error) {
        console.error("Prediction failed:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getRemediesForPrediction = async (
    diseaseName: string,
    index: number
  ) => {
    setPrediction((prev) => {
      if (!prev) return null;
      const updated = [...prev];
      updated[index].loadingRemedies = true;
      return updated;
    });

    try {
      const remedies = await getCropRemedies(diseaseName);

      setPrediction((prev) => {
        if (!prev) return null;
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          geminiRemedies: remedies,
          loadingRemedies: false,
        };
        return updated;
      });
    } catch (error) {
      console.error("Failed to get remedies:", error);
      setPrediction((prev) => {
        if (!prev) return null;
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          geminiRemedies: "❌ Failed to get remedies. Please try again.",
          loadingRemedies: false,
        };
        return updated;
      });
    }
  };

  const handleFileChange = (file: File) => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      handleFileChange(file);
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setPrediction(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 animate-float">
        <div className="w-8 h-8 bg-green-400/20 rounded-full blur-sm"></div>
      </div>
      <div className="absolute top-40 right-32 animate-float-delayed">
        <div className="w-6 h-6 bg-emerald-400/20 rounded-full blur-sm"></div>
      </div>
      <div className="absolute bottom-40 left-40 animate-float">
        <div className="w-10 h-10 bg-teal-400/20 rounded-full blur-sm"></div>
      </div>

      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-2xl backdrop-blur-sm border border-white/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              <Brain className="w-10 h-10 text-white relative z-10" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-lime-400 rounded-full animate-ping" />
            </div>
            <Sparkles className="absolute -top-2 -left-2 w-6 h-6 text-yellow-400 animate-pulse" />
            <Zap className="absolute -bottom-2 -right-2 w-5 h-5 text-blue-400 animate-bounce" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-green-200 to-emerald-300 bg-clip-text text-transparent mb-4">
            AI Crop Disease Detection
          </h1>
          <p className="text-green-200/80 text-xl max-w-2xl mx-auto leading-relaxed">
            Harness the power of artificial intelligence to instantly diagnose
            crop diseases and get AI-powered remedies
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="p-8 border-b border-white/20">
              <div className="space-y-8">
                {/* Upload Area */}
                <div
                  className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-500 group ${
                    dragActive
                      ? "border-green-400 bg-green-500/10 scale-[1.02]"
                      : selectedFile
                        ? "border-green-400/60 bg-green-500/5"
                        : "border-white/30 hover:border-green-400/50 hover:bg-white/5"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileChange(file);
                    }}
                  />

                  {previewUrl ? (
                    <div className="space-y-6">
                      <div className="relative inline-block">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="mx-auto max-h-64 rounded-2xl shadow-2xl border border-white/20"
                        />
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-green-200 font-semibold text-lg">
                          {selectedFile?.name}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={resetForm}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/20"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Change Image
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="relative mx-auto w-24 h-24 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform duration-300">
                        <Upload className="w-12 h-12 text-green-300 group-hover:text-green-200 transition-colors" />
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full animate-ping" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white mb-3">
                          Drop your crop image here
                        </p>
                        <p className="text-green-200/80 text-lg mb-4">
                          or click to browse from your device
                        </p>
                        <div className="flex items-center justify-center gap-6 text-sm text-green-300/60">
                          <span className="flex items-center gap-2">
                            <Camera className="w-4 h-4" />
                            JPG, PNG, WebP
                          </span>
                          <div className="w-1 h-1 bg-green-400 rounded-full" />
                          <span>Max 10MB</span>
                          <div className="w-1 h-1 bg-green-400 rounded-full" />
                          <span>High Resolution</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Analyze Button */}
                <div className="flex justify-center">
                  <button
                    onClick={async () => {
                      if (selectedFile) await handleSubmit(selectedFile);
                    }}
                    disabled={!selectedFile || isLoading}
                    className="group relative inline-flex items-center px-12 py-4 bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 text-white font-bold text-lg rounded-2xl hover:from-green-600 hover:via-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-4 focus:ring-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-2xl hover:shadow-green-500/25 hover:scale-[1.02] border border-white/20 backdrop-blur-sm overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin w-6 h-6 mr-3 relative z-10" />
                        <span className="relative z-10">
                          Analyzing with AI...
                        </span>
                      </>
                    ) : (
                      <>
                        <Brain className="w-6 h-6 mr-3 relative z-10 group-hover:scale-110 transition-transform" />
                        <span className="relative z-10">
                          Analyze Crop Disease
                        </span>
                        <Sparkles className="w-5 h-5 ml-3 relative z-10 group-hover:animate-pulse" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Results Section */}
            {prediction && (
              <div className="p-8">
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <Microscope className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-2">
                        AI Analysis Results
                      </h2>
                      <p className="text-green-200/80 text-lg">
                        Disease prediction with AI-powered symptoms and remedies
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {prediction.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-black/20 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                    >
                      {/* Disease Prediction */}
                      <div className="p-6 border-b border-white/10">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                            <AlertCircle className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white">
                              Disease Detection
                            </h3>
                            <p className="text-green-200/60 text-sm">
                              Model Prediction
                            </p>
                          </div>
                        </div>
                        <p className="text-white text-xl font-semibold mb-2">
                          🧬 Disease:{" "}
                          <span className="text-green-300">
                            {item.Prediction}
                          </span>
                        </p>
                        <p className="text-green-200/80">
                          <strong>Initial Symptoms:</strong>{" "}
                          {item.Symptoms.length > 0
                            ? item.Symptoms.join(", ")
                            : "No symptoms available"}
                        </p>
                      </div>

                      {/* AI Remedies */}
                      {item.Prediction.toLowerCase() !== "healthy" && (
                        <div className="p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                              {item.loadingRemedies ? (
                                <Loader2 className="w-5 h-5 text-white animate-spin" />
                              ) : (
                                <Stethoscope className="w-5 h-5 text-white" />
                              )}
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white">
                                AI-Powered Symptoms & Remedies
                              </h3>
                              <p className="text-green-200/60 text-sm">
                                {item.loadingRemedies
                                  ? "Generating with Gemini AI..."
                                  : "Powered by Gemini AI"}
                              </p>
                            </div>
                          </div>

                          {item.loadingRemedies ? (
                            <div className="flex items-center justify-center p-8">
                              <div className="text-center">
                                <div className="relative">
                                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                                  </div>
                                  <div className="absolute inset-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full animate-ping opacity-20 mx-auto"></div>
                                </div>
                                <p className="text-green-200/80 font-medium">
                                  Analyzing disease and generating remedies...
                                </p>
                                <p className="text-green-200/60 text-sm mt-1">
                                  This may take a few moments
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="bg-black/20 rounded-xl p-6 border border-white/10">
                              {item.geminiRemedies ? (
                                formatGeminiResponse(item.geminiRemedies)
                              ) : (
                                <p className="text-green-200/60 italic">
                                  No detailed remedies available
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Reset Button */}
                <div className="mt-8 text-center">
                  <button
                    onClick={resetForm}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-2xl focus:outline-none focus:ring-4 focus:ring-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:scale-[1.02] shadow-xl"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Analyze Another Crop
                    <Sparkles className="w-4 h-4 animate-pulse" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Features */}
        <div className="flex items-center justify-center gap-8 mt-8">
          <div className="flex items-center gap-2 text-green-300/80 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
            <Eye className="w-5 h-5" />
            <span className="text-sm font-medium">AI Vision</span>
          </div>
          <div className="flex items-center gap-2 text-green-300/80 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
            <Target className="w-5 h-5" />
            <span className="text-sm font-medium">95% Accuracy</span>
          </div>
          <div className="flex items-center gap-2 text-green-300/80 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
            <Pill className="w-5 h-5" />
            <span className="text-sm font-medium">AI Remedies</span>
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

export default CropDiseaseDetection;
