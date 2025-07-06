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
  Heart,
  Shield,
  Activity,
  Thermometer,
  AlertTriangle,
  Panda,
} from "lucide-react";

import { analyzeCattleDisease } from "@/actions/animal-disease";

interface CattleDisease {
  name: string;
  symptoms: string[];
  possible_causes: string[];
  severity: string;
  description: string;
}

interface Remedy {
  disease: string;
  treatment: string;
  prevention: string;
  dosage?: string;
  duration?: string;
  urgency: string;
}

interface AnalysisResult {
  is_cattle: boolean;
  cattle_diseases: CattleDisease[];
  remedies: Remedy[];
  confidence_level: string;
  recommendations: string[];
}

const CattleAnalysisForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

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

  const handleSubmit = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const formData = new FormData();
      formData.append("image", selectedFile);
      const response = await analyzeCattleDisease(formData);

      if ("error" in response) {
        setError(response.error || "Analysis failed. Please try again.");
      } else {
        setResult(response);
      }
    } catch {
      setError("Analysis failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setResult(null);
    setError(null);
    setSelectedFile(null);
    setPreviewUrl(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-100 text-red-800 border-red-300";
      case "Severe":
        return "bg-orange-100 text-orange-800 border-orange-300";
      case "Moderate":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default:
        return "bg-green-100 text-green-800 border-green-300";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Emergency":
        return "bg-red-100 text-red-800 border-red-300";
      case "High":
        return "bg-orange-100 text-orange-800 border-orange-300";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default:
        return "bg-green-100 text-green-800 border-green-300";
    }
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case "High":
        return "bg-green-100 text-green-800 border-green-300";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default:
        return "bg-red-100 text-red-800 border-red-300";
    }
  };

  return (
    <div className="min-h-screen  relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      {/* Floating Elements */}
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
              <Panda className="w-10 h-10 text-white relative z-10" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-lime-400 rounded-full animate-ping" />
            </div>
            <Sparkles className="absolute -top-2 -left-2 w-6 h-6 text-yellow-400 animate-pulse" />
            <Zap className="absolute -bottom-2 -right-2 w-5 h-5 text-blue-400 animate-bounce" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-green-200 to-emerald-300 bg-clip-text text-transparent mb-4">
            AI Cattle Disease Detection
          </h1>
          <p className="text-green-200/80 text-xl max-w-2xl mx-auto leading-relaxed">
            Harness the power of artificial intelligence to instantly diagnose
            cattle diseases and get AI-powered remedies
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
                          Drop your cattle image here
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
                    onClick={handleSubmit}
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
                          Analyze Cattle Disease
                        </span>
                        <Sparkles className="w-5 h-5 ml-3 relative z-10 group-hover:animate-pulse" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Error Section */}
            {error && (
              <div className="p-8 border-t border-white/20">
                <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-2xl p-6 border border-red-400/30">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        Analysis Error
                      </h3>
                      <p className="text-red-200">{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Results Section */}
            {result && (
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
                      <p className="text-blue-200/80 text-lg">
                        Disease prediction with AI-powered symptoms and remedies
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Confidence Level */}
                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-6 border border-blue-400/30">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <Eye className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          Analysis Confidence
                        </h3>
                        <p className="text-blue-200/80">
                          AI assessment reliability
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Activity className="w-6 h-6 text-blue-400" />
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-medium border ${getConfidenceColor(result.confidence_level)}`}
                      >
                        {result.confidence_level} Confidence
                      </span>
                    </div>
                  </div>

                  {/* Disease Analysis */}
                  <div className="bg-black/20 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                    <div className="p-6 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                          <AlertCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">
                            Disease Analysis
                          </h3>
                          <p className="text-blue-200/60 text-sm">
                            Detected health conditions
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      {result.cattle_diseases.length > 0 ? (
                        <div className="space-y-6">
                          {result.cattle_diseases.map((disease, index) => (
                            <div
                              key={index}
                              className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
                            >
                              <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                                    <AlertTriangle className="w-5 h-5 text-white" />
                                  </div>
                                  <h4 className="text-xl font-bold text-white">
                                    {disease.name}
                                  </h4>
                                </div>
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(disease.severity)}`}
                                >
                                  {disease.severity}
                                </span>
                              </div>

                              <p className="text-blue-200/90 mb-4 leading-relaxed">
                                {disease.description}
                              </p>

                              <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                  <h5 className="font-bold text-white mb-3 flex items-center gap-2">
                                    <Thermometer className="w-4 h-4 text-orange-400" />
                                    Symptoms
                                  </h5>
                                  <ul className="space-y-2">
                                    {disease.symptoms.map((symptom, i) => (
                                      <li
                                        key={i}
                                        className="flex items-start gap-2"
                                      >
                                        <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <span className="text-blue-200/80 text-sm">
                                          {symptom}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                  <h5 className="font-bold text-white mb-3 flex items-center gap-2">
                                    <Brain className="w-4 h-4 text-purple-400" />
                                    Possible Causes
                                  </h5>
                                  <ul className="space-y-2">
                                    {disease.possible_causes.map((cause, i) => (
                                      <li
                                        key={i}
                                        className="flex items-start gap-2"
                                      >
                                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <span className="text-blue-200/80 text-sm">
                                          {cause}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border border-green-400/30">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                              <CheckCircle className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h4 className="text-xl font-bold text-white">
                                Healthy Cattle
                              </h4>
                              <p className="text-green-200">
                                No diseases detected in the cattle image.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Remedies Section */}
                  {result.remedies.length > 0 && (
                    <div className="bg-black/20 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                      <div className="p-6 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                            <Stethoscope className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white">
                              AI-Powered Treatment & Remedies
                            </h3>
                            <p className="text-blue-200/60 text-sm">
                              Recommended treatment protocols
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 space-y-6">
                        {result.remedies.map((remedy, index) => (
                          <div
                            key={index}
                            className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
                          >
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                                  <Heart className="w-5 h-5 text-white" />
                                </div>
                                <h4 className="text-xl font-bold text-white">
                                  {remedy.disease}
                                </h4>
                              </div>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(remedy.urgency)}`}
                              >
                                {remedy.urgency} Priority
                              </span>
                            </div>

                            <div className="space-y-4">
                              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                <h5 className="font-bold text-white mb-2 flex items-center gap-2">
                                  <Stethoscope className="w-4 h-4 text-blue-400" />
                                  Treatment
                                </h5>
                                <p className="text-blue-200/90 text-sm leading-relaxed">
                                  {remedy.treatment}
                                </p>
                              </div>

                              {remedy.dosage && (
                                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                  <h5 className="font-bold text-white mb-2 flex items-center gap-2">
                                    <Pill className="w-4 h-4 text-purple-400" />
                                    Dosage
                                  </h5>
                                  <p className="text-blue-200/90 text-sm leading-relaxed">
                                    {remedy.dosage}
                                  </p>
                                </div>
                              )}

                              {remedy.duration && (
                                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                  <h5 className="font-bold text-white mb-2 flex items-center gap-2">
                                    <Target className="w-4 h-4 text-orange-400" />
                                    Duration
                                  </h5>
                                  <p className="text-blue-200/90 text-sm leading-relaxed">
                                    {remedy.duration}
                                  </p>
                                </div>
                              )}

                              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                <h5 className="font-bold text-white mb-2 flex items-center gap-2">
                                  <Shield className="w-4 h-4 text-green-400" />
                                  Prevention
                                </h5>
                                <p className="text-blue-200/90 text-sm leading-relaxed">
                                  {remedy.prevention}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* General Recommendations */}
                  {result.recommendations &&
                    result.recommendations.length > 0 && (
                      <div className="bg-black/20 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                        <div className="p-6 border-b border-white/10">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                              <Brain className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white">
                                General Recommendations
                              </h3>
                              <p className="text-blue-200/60 text-sm">
                                Expert advice for cattle care
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                            <ul className="space-y-3">
                              {result.recommendations.map(
                                (recommendation, index) => (
                                  <li
                                    key={index}
                                    className="flex items-start gap-3"
                                  >
                                    <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-blue-200/90 text-sm leading-relaxed">
                                      {recommendation}
                                    </span>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
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
                      Analyze Another Image
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
          <div className="flex items-center gap-2 text-blue-300/80 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20 text-sm shadow">
            <Zap className="w-4 h-4 text-blue-400" />
            Real-Time AI Analysis
          </div>
          <div className="flex items-center gap-2 text-purple-300/80 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20 text-sm shadow">
            <Brain className="w-4 h-4 text-purple-400" />
            Smart Disease Detection
          </div>
          <div className="flex items-center gap-2 text-green-300/80 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20 text-sm shadow">
            <Shield className="w-4 h-4 text-green-400" />
            Prevention First
          </div>
          <div className="flex items-center gap-2 text-yellow-300/80 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20 text-sm shadow">
            <Target className="w-4 h-4 text-yellow-400" />
            Targeted Treatment Plans
          </div>
        </div>
      </div>
    </div>
  );
};

export default CattleAnalysisForm;
