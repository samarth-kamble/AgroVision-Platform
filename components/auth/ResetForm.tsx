"use client";

import React, { useState, useTransition } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { ResetSchema } from "@/schema";
import { reset } from "@/actions/reset";

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
  MailIcon,
  AlertCircle,
  ArrowRight,
  Leaf,
  Sun,
  Droplets,
  TreePine,
  Wheat,
  Apple,
  CheckCircle,
  KeyRound,
  Send,
  ArrowLeft,
  Shield,
} from "lucide-react";

export const ResetForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      reset(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
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
              Recover Your
              <span className="bg-gradient-to-r from-green-400 via-lime-400 to-emerald-400 bg-clip-text text-transparent block">
                Access Instantly
              </span>
            </h2>

            <p className="text-xl text-green-100 mb-8 leading-relaxed">
              Don&apos;t worry! It happens to the best farmers. Enter your email
              and we&apos;ll send you a secure link to reset your password.
            </p>

            {/* Feature List */}
            <div className="space-y-4">
              {[
                { icon: Shield, text: "Secure password recovery" },
                { icon: MailIcon, text: "Email verification system" },
                { icon: KeyRound, text: "Instant access restoration" },
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

        {/* Right Side - Reset Form */}
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
                <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-green-400/30">
                  <MailIcon className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Forgot Your Password?
                </h3>
                <p className="text-green-200">
                  No problem! Enter your email and we&apos;ll send you a reset
                  link
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-semibold flex items-center gap-2">
                          <MailIcon className="w-4 h-4 text-green-400" />
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

                  {/* Info Box */}
                  <div className="bg-blue-500/10 border border-blue-400/30 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <MailIcon className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-blue-200 text-sm font-medium mb-1">
                          Check your email
                        </p>
                        <p className="text-blue-100 text-xs">
                          We&apos;ll send you a secure link to reset your
                          password. The link will expire in 1 hours for
                          security.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Error Messages */}
                  {error && (
                    <Alert className="border-red-400/50 bg-red-500/10 backdrop-blur-sm rounded-xl">
                      <AlertCircle className="h-4 w-4 text-red-400" />
                      <AlertDescription className="text-red-300 font-medium mt-1">
                        {error}
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
                          <span>Sending Reset Link...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Send Reset Email</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </Button>
                </form>
              </Form>

              {/* Back to Login Link */}
              <div className="text-center mt-8 pt-6 border-t border-white/20">
                <p className="text-green-200 mb-4">Remember your password?</p>
                <Link
                  href="/auth/login"
                  className="inline-flex items-center gap-2 px-6 py-3 text-green-300 hover:text-white font-semibold transition-all duration-300 hover:bg-white/10 rounded-xl border border-green-400/50 hover:border-green-400 shadow-sm hover:shadow-lg transform hover:scale-105"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
