"use client";

import React, { useState, useTransition, useRef } from "react";
import { User, Send, ImageIcon, X, Loader2, Link } from "lucide-react";
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { createPost } from "@/actions/post";
import config from "@/lib/config";
import {
  IKUploadResponse,
  UploadError,
} from "imagekitio-next/dist/types/components/IKUpload/props";

interface CreatePostProps {
  onPostCreated?: () => void;
}

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
    throw new Error("Unknown error during authentication.");
  }
};

const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const [postContent, setPostContent] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImagePath, setSelectedImagePath] = useState<string | null>(
    null
  );
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showImageUrlInput, setShowImageUrlInput] = useState(false);
  const [imageInputMethod, setImageInputMethod] = useState<"upload" | "url">(
    "upload"
  );
  const [isPending, startTransition] = useTransition();
  const { data: session } = useSession();
  const ikUploadRef = useRef(null);

  const handleImageUploadSuccess = (res: IKUploadResponse) => {
    setSelectedImage(res.url);
    setSelectedImagePath(res.filePath);
    setShowImageUpload(false);
    setIsUploading(false);
    setUploadProgress(0);
    toast.success("Image uploaded successfully!");
  };

  const handleImageUploadError = (err: UploadError) => {
    console.log("Upload Error:", err);
    setIsUploading(false);
    setUploadProgress(0);
    toast.error(`Upload failed: ${err.message || "Unknown error"}`);
  };

  const handleImageUploadStart = () => {
    setIsUploading(true);
    setUploadProgress(0);
  };

  const handleImageUploadProgress = ({
    loaded,
    total,
  }: {
    loaded: number;
    total: number;
  }) => {
    const percent = Math.round((loaded / total) * 100);
    setUploadProgress(percent);
  };

  const validateFile = (file: File) => {
    if (file.size > 20 * 1024 * 1024) {
      toast.error("Image size too large. Maximum size is 20MB.");
      return false;
    }
    return true;
  };

  const isValidImageUrl = (url: string): boolean => {
    try {
      new URL(url);
      return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
    } catch {
      return false;
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImageUrl(url);

    if (url && isValidImageUrl(url)) {
      setSelectedImage(url);
      setSelectedImagePath(null); // Clear upload path when using URL
    } else if (url) {
      setSelectedImage(null);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setSelectedImagePath(null);
    setImageUrl("");
  };

  const handleImageButtonClick = () => {
    if (imageInputMethod === "upload") {
      setShowImageUpload(true);
    } else {
      setShowImageUrlInput(true);
    }
  };

  const handleSubmit = async () => {
    if (!postContent.trim()) {
      toast.error("Please write something before posting!");
      return;
    }

    if (!session?.user) {
      toast.error("Please log in to create a post");
      return;
    }

    // Validate image URL if using URL method
    if (imageUrl && !isValidImageUrl(imageUrl)) {
      toast.error("Please enter a valid image URL");
      return;
    }

    startTransition(async () => {
      try {
        const result = await createPost(
          postContent,
          selectedImage || undefined
        );

        if (result?.success) {
          setPostContent("");
          setSelectedImage(null);
          setSelectedImagePath(null);
          setImageUrl("");
          setShowImageUpload(false);
          setShowImageUrlInput(false);

          if (onPostCreated) {
            onPostCreated();
          }

          toast.success("Post created successfully!");
        } else {
          toast.error(result?.error || "Failed to create post");
        }
      } catch (error) {
        console.error("Error creating post:", error);
        toast.error("Failed to create post");
      }
    });
  };

  if (!session) {
    return (
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20 mb-6">
        <div className="text-center text-white/70">
          Please log in to create a post
        </div>
      </div>
    );
  }

  return (
    <ImageKitProvider
      publicKey={config.env.imagekit.publicKey}
      urlEndpoint={config.env.imagekit.urlEndpoint}
      authenticator={authenticator}
    >
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20 mb-6">
        <div className="flex items-start gap-3 sm:gap-4 mb-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
            {session.user.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            )}
          </div>
          <div className="flex-1">
            <textarea
              value={postContent}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setPostContent(e.target.value)
              }
              placeholder="Share your farming experience, tips, or questions..."
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 resize-none focus:outline-none focus:border-green-400 text-sm sm:text-base"
              rows={3}
              maxLength={2000}
              disabled={isPending}
            />
            <div className="text-right text-xs text-white/50 mt-1">
              {postContent.length}/2000
            </div>
          </div>
        </div>

        {/* Image Preview */}
        {selectedImage && (
          <div className="mb-4 relative">
            {selectedImagePath ? (
              <IKImage
                path={selectedImagePath}
                alt="Selected"
                width={500}
                height={300}
                className="max-w-full h-auto rounded-lg border border-white/20 max-h-80 object-cover"
              />
            ) : (
              <img
                src={selectedImage}
                alt="Selected"
                className="max-w-full h-auto rounded-lg border border-white/20 max-h-80 object-cover"
                onError={() => {
                  toast.error("Failed to load image");
                  setSelectedImage(null);
                  setImageUrl("");
                }}
              />
            )}
            <button
              onClick={removeImage}
              disabled={isPending}
              className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 transition-colors disabled:opacity-50"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Image Upload Section */}
        {showImageUpload && (
          <div className="mb-4 p-4 bg-white/5 rounded-lg border border-white/20">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-white text-sm font-medium">Upload Image</h3>
              <button
                onClick={() => setShowImageUpload(false)}
                disabled={isUploading}
                className="text-white/70 hover:text-white disabled:opacity-50"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <IKUpload
              ref={ikUploadRef}
              fileName="post-image"
              useUniqueFileName={true}
              validateFile={validateFile}
              onUploadStart={handleImageUploadStart}
              onUploadProgress={handleImageUploadProgress}
              folder="/posts"
              accept="image/*"
              onError={handleImageUploadError}
              onSuccess={handleImageUploadSuccess}
              className="hidden"
            />

            <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (ikUploadRef.current) {
                    (ikUploadRef.current as HTMLElement)?.click();
                  }
                }}
                disabled={isUploading}
                className="flex flex-col items-center gap-2 w-full text-white/70 hover:text-white disabled:opacity-50"
              >
                <ImageIcon className="w-8 h-8" />
                <p className="text-sm">Click to upload image</p>
                <p className="text-xs text-white/50">Maximum size: 20MB</p>
              </button>
            </div>

            {/* Upload Progress */}
            {uploadProgress > 0 && (
              <div className="mt-4">
                <div className="flex justify-between text-xs text-white/70 mb-1">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Image URL Input Section */}
        {showImageUrlInput && (
          <div className="mb-4 p-4 bg-white/5 rounded-lg border border-white/20">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-white text-sm font-medium">Image URL</h3>
              <button
                onClick={() => {
                  setShowImageUrlInput(false);
                  setImageUrl("");
                  setSelectedImage(null);
                }}
                disabled={isPending}
                className="text-white/70 hover:text-white disabled:opacity-50"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <input
              type="url"
              value={imageUrl}
              onChange={handleImageUrlChange}
              placeholder="Enter image URL (jpg, jpeg, png, gif, webp)..."
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              disabled={isPending}
            />

            {imageUrl && !isValidImageUrl(imageUrl) && (
              <div className="mt-2 text-red-400 text-xs">
                Please enter a valid image URL (jpg, jpeg, png, gif, webp)
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto overflow-x-auto">
            {/* Image method selector */}
            <div className="flex bg-white/10 rounded-lg overflow-hidden">
              <button
                onClick={() => {
                  setImageInputMethod("upload");
                  setShowImageUrlInput(false);
                  setImageUrl("");
                }}
                disabled={isUploading || isPending}
                className={`flex items-center gap-2 px-3 py-2 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed ${
                  imageInputMethod === "upload"
                    ? "bg-green-500 text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span className="text-xs">Upload</span>
              </button>
              <button
                onClick={() => {
                  setImageInputMethod("url");
                  setShowImageUpload(false);
                }}
                disabled={isUploading || isPending}
                className={`flex items-center gap-2 px-3 py-2 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed ${
                  imageInputMethod === "url"
                    ? "bg-green-500 text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <Link className="w-4 h-4" />
                <span className="text-xs">URL</span>
              </button>
            </div>

            <button
              onClick={handleImageButtonClick}
              disabled={
                isUploading || showImageUpload || showImageUrlInput || isPending
              }
              className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 animate-spin" />
              ) : (
                <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
              )}
              <span className="text-xs sm:text-sm text-white">
                {isUploading ? "Uploading..." : "Photo"}
              </span>
            </button>
          </div>

          <button
            onClick={handleSubmit}
            disabled={
              !postContent.trim() ||
              isPending ||
              isUploading ||
              (!!imageUrl && !isValidImageUrl(imageUrl))
            }
            className="flex items-center gap-2 px-4 sm:px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 w-full sm:w-auto justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span className="text-sm sm:text-base">
              {isPending ? "Posting..." : "Post"}
            </span>
          </button>
        </div>
      </div>
    </ImageKitProvider>
  );
};

export default CreatePost;
