"use client";

import React, { useState, useTransition } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { LoginSchema } from "@/schema";
import { Login } from "@/actions/login";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ShieldCheckIcon,
  AlertCircle,
  ArrowRight,
  Leaf,
  Sun,
  Droplets,
  TreePine,
  Wheat,
  Apple,
  Eye,
  EyeOff,
  CheckCircle,
  Zap,
} from "lucide-react";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already used with another provider!"
      : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const data = await Login(values);

      if (data?.error) {
        form.reset();
        setError(data.error);
      }

      if (data?.success) {
        form.reset();
        setSuccess(data.success);
      }

      if (data?.twoFactor) {
        setShowTwoFactor(true);
      }
    });
  };

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
              Welcome Back to the
              <span className="bg-gradient-to-r from-green-400 via-lime-400 to-emerald-400 bg-clip-text text-transparent block">
                Future of Farming
              </span>
            </h2>

            <p className="text-xl text-green-100 mb-8 leading-relaxed">
              Continue your journey with cutting-edge agricultural technology.
              Monitor crops, optimize yields, and grow sustainably with
              AI-powered insights.
            </p>

            {/* Feature List */}
            <div className="space-y-4">
              {[
                { icon: Zap, text: "Real-time crop monitoring" },
                { icon: Sun, text: "Weather-based recommendations" },
                { icon: Leaf, text: "Sustainable farming practices" },
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

        {/* Right Side - Login Form */}
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
                <h3 className="text-2xl font-bold text-white mb-2">
                  {showTwoFactor ? "Two-Factor Authentication" : "Sign In"}
                </h3>
                <p className="text-green-200">
                  {showTwoFactor
                    ? "Enter the 6-digit code from your authenticator app"
                    : "Enter your credentials to access your dashboard"}
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {showTwoFactor ? (
                    <FormField
                      control={form.control}
                      name="code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white font-semibold flex items-center gap-2">
                            <ShieldCheckIcon className="w-4 h-4 text-green-400" />
                            Authentication Code
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              placeholder="000000"
                              className="h-14 text-center text-xl font-mono tracking-[0.5em] bg-white/10 border-white/20 rounded-2xl focus:border-green-400 focus:ring-4 focus:ring-green-400/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                              maxLength={6}
                            />
                          </FormControl>
                          <FormMessage className="text-red-300" />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <>
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white font-semibold">
                              Email Address
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={isPending}
                                placeholder="farmer@agrovision.com"
                                type="email"
                                className="h-14 bg-white/10 border-white/20 rounded-2xl focus:border-green-400 focus:ring-4 focus:ring-green-400/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                              />
                            </FormControl>
                            <FormMessage className="text-red-300" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white font-semibold">
                              Password
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  disabled={isPending}
                                  placeholder="Enter your password"
                                  type={showPassword ? "text" : "password"}
                                  className="h-14 bg-white/10 border-white/20 rounded-2xl focus:border-green-400 focus:ring-4 focus:ring-green-400/20 text-white placeholder:text-white/50 backdrop-blur-sm pr-12"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                                >
                                  {showPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                  ) : (
                                    <Eye className="w-5 h-5" />
                                  )}
                                </button>
                              </div>
                            </FormControl>
                            <div className="text-right mt-2">
                              <Link
                                href="/auth/reset"
                                className="text-sm text-green-300 hover:text-green-200 font-medium hover:underline transition-colors"
                              >
                                Forgot password?
                              </Link>
                            </div>
                            <FormMessage className="text-red-300" />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  {/* Error Messages */}
                  {(error || urlError) && (
                    <Alert className="border-red-400/50 bg-red-500/10 backdrop-blur-sm rounded-xl">
                      <AlertCircle className="h-4 w-4 text-red-400" />
                      <AlertDescription className="text-red-300 font-medium mt-1">
                        {error || urlError}
                      </AlertDescription>
                    </Alert>
                  )}

                  {success && (
                    <Alert className="border-green-400/50 bg-green-500/10 backdrop-blur-sm rounded-xl">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <AlertDescription className="text-green-300 font-medium mt-1">
                        {success}
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Submit Button */}
                  <Button
                    disabled={isPending}
                    type="submit"
                    className="w-full h-14 bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500 hover:from-green-600 hover:via-emerald-600 hover:to-lime-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {isPending ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Signing in...</span>
                        </>
                      ) : (
                        <>
                          <span>
                            {showTwoFactor
                              ? "Verify & Enter"
                              : "Sign In to Dashboard"}
                          </span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </Button>
                </form>
              </Form>

              {/* Register Link */}
              <div className="text-center mt-8 pt-6 border-t border-white/20">
                <p className="text-green-200 mb-4">New to AgroVision?</p>
                <Link
                  href="/auth/register"
                  className="inline-flex items-center gap-2 px-6 py-3 text-green-300 hover:text-white font-semibold transition-all duration-300 hover:bg-white/10 rounded-xl border border-green-400/50 hover:border-green-400 shadow-sm hover:shadow-lg transform hover:scale-105"
                >
                  <span>Create Your Account</span>
                  <Leaf className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
