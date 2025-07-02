"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { newVerification } from "@/actions/new-verification";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  ShieldCheckIcon,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Leaf,
  Sun,
  Droplets,
  TreePine,
  Wheat,
  Apple,
  Zap,
  Loader2,
} from "lucide-react";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Token not found!");
      setIsLoading(false);
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900">
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
      </div>

      {/* Main Content Grid */}
      <div className="min-h-screen grid lg:grid-cols-2 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col justify-center px-12 xl:px-20 text-white relative z-10">
          <div className="max-w-lg">
            {/* Logo */}
            <div className="flex items-center gap-4 mb-8">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <span className="text-2xl">🌾</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-lime-400 rounded-full animate-ping"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
                  AgroVision
                </h1>
                <p className="text-green-200 text-sm font-medium">
                  Smart Agriculture Platform
                </p>
              </div>
            </div>

            {/* Welcome Message */}
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Verifying Your
              <span className="bg-gradient-to-r from-green-400 via-lime-400 to-emerald-400 bg-clip-text text-transparent block">
                Account Access
              </span>
            </h2>

            <p className="text-xl text-green-100 mb-8 leading-relaxed">
              We&apos;re confirming your identity to ensure secure access to
              your agricultural dashboard. This helps protect your valuable farm
              data and insights.
            </p>

            {/* Feature List */}
            <div className="space-y-4">
              {[
                { icon: ShieldCheckIcon, text: "Secure account protection" },
                { icon: Zap, text: "Instant verification process" },
                { icon: Leaf, text: "Protected farming data" },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-green-100"
                >
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-4 h-4 text-green-400" />
                  </div>
                  <span className="font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Verification Form */}
        <div className="flex items-center justify-center p-8 lg:p-12 relative z-10">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-xl">
                  <span className="text-xl">🌾</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-lime-400 rounded-full animate-ping"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">AgroVision</h1>
                <p className="text-green-200 text-xs">Smart Agriculture</p>
              </div>
            </div>

            {/* Form Container */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              {/* Form Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl mb-6 border border-green-400/30">
                  {isLoading ? (
                    <Loader2 className="w-8 h-8 text-green-400 animate-spin" />
                  ) : success ? (
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  ) : (
                    <AlertCircle className="w-8 h-8 text-red-400" />
                  )}
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  {isLoading
                    ? "Verifying Your Account"
                    : success
                    ? "Verification Successful"
                    : "Verification Failed"}
                </h3>

                <p className="text-green-200">
                  {isLoading
                    ? "Please wait while we confirm your verification..."
                    : success
                    ? "Your account has been successfully verified!"
                    : "There was an issue with your verification."}
                </p>
              </div>

              {/* Loading State */}
              {isLoading && (
                <div className="flex flex-col items-center space-y-4">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                  <p className="text-green-200 text-sm">
                    Confirming your verification token...
                  </p>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <Alert className="border-green-400/50 bg-green-500/10 backdrop-blur-sm rounded-xl mb-6">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <AlertDescription className="text-green-300 font-medium mt-1">
                    {success}
                  </AlertDescription>
                </Alert>
              )}

              {/* Error Message */}
              {error && (
                <Alert className="border-red-400/50 bg-red-500/10 backdrop-blur-sm rounded-xl mb-6">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <AlertDescription className="text-red-300 font-medium mt-1">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {/* Action Buttons */}
              {!isLoading && (
                <div className="space-y-4">
                  {success && (
                    <Link href="/auth/login" className="block">
                      <Button className="w-full h-14 bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500 hover:from-green-600 hover:via-emerald-600 hover:to-lime-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group">
                        <span className="relative z-10 flex items-center justify-center gap-3">
                          <CheckCircle className="w-5 h-5" />
                          <span>Continue to Sign In</span>
                        </span>
                      </Button>
                    </Link>
                  )}

                  <Link href="/auth/login" className="block">
                    <Button
                      variant="outline"
                      className="w-full h-12 bg-white/10 border-white/20 hover:bg-white/20 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Sign In</span>
                      </span>
                    </Button>
                  </Link>
                </div>
              )}

              {/* Help Text */}
              <div className="text-center mt-8 pt-6 border-t border-white/20">
                <p className="text-green-200 text-sm">
                  Having trouble?{" "}
                  <Link
                    href="/contact"
                    className="text-green-300 hover:text-green-200 font-medium hover:underline transition-colors"
                  >
                    Contact our support team
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
