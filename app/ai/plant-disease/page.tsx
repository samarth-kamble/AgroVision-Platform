"use client";
import { predictCropDisease } from "@/actions/predict-crop-disease";
import { useState } from "react";
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
} from "lucide-react";
import Image from "next/image";

const CropDiseasePage = () => {
  const [tableData, setTableData] = useState<{
    headers: string[];
    data: string[][];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleSubmit = async (selectedFile: File) => {
    if (selectedFile && selectedFile.size > 0) {
      setIsLoading(true);
      try {
        const res = await predictCropDisease(selectedFile);
        type TableDataItem = { headers: string[]; data: string[][] };
        const parsed = Array.isArray(res)
          ? res.find((item: TableDataItem) => item.headers)
          : null;
        if (parsed) {
          setTableData({ headers: parsed.headers, data: parsed.data });
        }
      } catch (error) {
        console.error("Prediction failed:", error);
      } finally {
        setIsLoading(false);
      }
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

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        handleFileChange(file);
      }
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setTableData(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  return (
    <div className="min-h-screen  relative overflow-hidden">
      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Enhanced Header */}
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
            crop diseases and protect your harvest
          </p>

          {/* Stats Row */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="flex items-center gap-2 text-green-300/80">
              <Eye className="w-5 h-5" />
              <span className="text-sm font-medium">AI Vision</span>
            </div>
            <div className="w-1 h-1 bg-green-400 rounded-full" />
            <div className="flex items-center gap-2 text-green-300/80">
              <Target className="w-5 h-5" />
              <span className="text-sm font-medium">95% Accuracy</span>
            </div>
            <div className="w-1 h-1 bg-green-400 rounded-full" />
            <div className="flex items-center gap-2 text-green-300/80">
              <Zap className="w-5 h-5" />
              <span className="text-sm font-medium">Instant Results</span>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Upload Section */}
            <div className="p-8 border-b border-white/20">
              <div className="space-y-8">
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
                    name="image"
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
                        <Image
                          width={300}
                          height={300}
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

                <div className="flex justify-center">
                  <button
                    onClick={async () => {
                      if (selectedFile) {
                        await handleSubmit(selectedFile);
                      }
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
            {tableData && (
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
                        Advanced machine learning insights about your
                        crop&apos;s health
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-black/20 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gradient-to-r from-green-600/80 via-emerald-600/80 to-teal-600/80 backdrop-blur-sm">
                          {tableData.headers.map((header, idx) => (
                            <th
                              key={idx}
                              className="px-8 py-5 text-left text-white font-bold text-lg border-r border-white/10 last:border-r-0"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {tableData.data.map((row, rowIndex) => (
                          <tr
                            key={rowIndex}
                            className="hover:bg-white/5 transition-all duration-200 group"
                          >
                            {row.map((cell, cellIndex) => (
                              <td
                                key={cellIndex}
                                className="px-8 py-5 text-green-100 font-medium border-r border-white/5 last:border-r-0 group-hover:text-white transition-colors"
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

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
      </div>
    </div>
  );
};

export default CropDiseasePage;
