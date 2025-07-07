"use client";

import React, { useState } from "react";
import {
  MessageCircle,
  Send,
  Mail,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Sparkles,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { ContactFormData, submitContactForm } from "@/actions/contact-us";

const ContactUs = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev: ContactFormData) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage("");

    try {
      const result = await submitContactForm(formData);

      if (result?.status === "success") {
        // Reset form and show success message
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setSubmitStatus("success");
      } else {
        setSubmitStatus("error");
        setErrorMessage(
          result?.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      setErrorMessage("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative z-10 min-h-screen pt-20 pb-20 bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900">
      {/* Background Effects */}
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
        <div className="absolute top-24 left-1/4 w-6 h-6 bg-amber-400/20 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-40 right-1/4 w-5 h-5 bg-green-400/25 rounded-full animate-pulse delay-1500"></div>
        <div className="absolute bottom-48 left-1/6 w-4 h-4 bg-red-400/20 rounded-full animate-bounce delay-800"></div>
        <div className="absolute top-1/2 left-16 w-4 h-4 bg-green-300/30 rounded-full animate-bounce delay-1200"></div>
        <div className="absolute top-32 right-24 w-6 h-6 bg-yellow-400/25 rounded-full animate-pulse delay-2200"></div>
        <div className="absolute bottom-40 right-1/5 w-4 h-4 bg-blue-400/20 rounded-full animate-bounce delay-600"></div>
        <Sparkles className="absolute bottom-16 left-1/5 w-4 h-4 text-purple-400/20 animate-pulse delay-1800" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 text-green-300 font-medium mb-8 animate-bounce">
            <MessageCircle className="w-4 h-4" />
            <span>Contact Us</span>
            <MessageCircle className="w-4 h-4" />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Get in
            <span className="bg-gradient-to-r from-green-400 via-lime-400 to-emerald-400 bg-clip-text text-transparent block">
              Touch
            </span>
          </h1>

          <p className="text-xl text-green-100 mb-8 max-w-4xl mx-auto leading-relaxed">
            We&apos;re here to help you succeed. Reach out to us with any
            questions, feedback, or support needs.
          </p>
        </div>

        {/* Success/Error Messages */}
        {submitStatus && (
          <div className="mb-8 max-w-md mx-auto">
            {submitStatus === "success" ? (
              <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-100">
                  Message sent successfully! We&apos;ll get back to you soon.
                </span>
              </div>
            ) : (
              <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <span className="text-red-100">
                  {errorMessage || "Something went wrong. Please try again."}
                </span>
              </div>
            )}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Send className="w-6 h-6 text-green-400" />
              Send us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-green-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    maxLength={100}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-green-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-green-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your phone"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-green-300 mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-green-300 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  maxLength={1000}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell us how we can help you..."
                />
                <div className="text-right text-sm text-green-300 mt-1">
                  {formData.message.length}/1000
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500 hover:from-green-600 hover:via-emerald-600 hover:to-lime-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info - Rest of the component remains the same */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-6">
                Contact Information
              </h2>

              <div className="space-y-6">
                {[
                  {
                    icon: Mail,
                    title: "Email Us",
                    content: "support@agrovision.com",
                    subtitle: "We'll respond within 24 hours",
                  },
                  {
                    icon: Phone,
                    title: "Call Us",
                    content: "+1 (555) 123-4567",
                    subtitle: "Mon-Fri 9AM-6PM EST",
                  },
                  {
                    icon: MapPin,
                    title: "Visit Us",
                    content:
                      "123 Agricultural Innovation Center\nSan Francisco, CA 94105",
                    subtitle: "Schedule an appointment",
                  },
                ].map((contact, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <contact.icon className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">
                        {contact.title}
                      </h3>
                      <p className="text-green-100 whitespace-pre-line">
                        {contact.content}
                      </p>
                      <p className="text-sm text-green-300 mt-1">
                        {contact.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Clock className="w-6 h-6 text-green-400" />
                Office Hours
              </h2>

              <div className="space-y-3">
                {[
                  { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
                  { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
                  { day: "Sunday", hours: "Closed" },
                ].map((schedule, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0"
                  >
                    <span className="text-green-100">{schedule.day}</span>
                    <span className="text-green-300 font-medium">
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-6">Follow Us</h2>

              <div className="flex gap-4">
                {[
                  {
                    icon: Facebook,
                    name: "Facebook",
                    color: "hover:bg-blue-500",
                  },
                  {
                    icon: Twitter,
                    name: "Twitter",
                    color: "hover:bg-blue-400",
                  },
                  {
                    icon: Instagram,
                    name: "Instagram",
                    color: "hover:bg-pink-500",
                  },
                  {
                    icon: Linkedin,
                    name: "LinkedIn",
                    color: "hover:bg-blue-600",
                  },
                ].map((social, index) => (
                  <button
                    key={index}
                    className={`w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20 transition-all duration-300 transform hover:scale-110 ${social.color}`}
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5 text-white" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-6">
                Response Time
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400 mb-1">
                    24hrs
                  </div>
                  <div className="text-sm text-green-200">Email Response</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400 mb-1">
                    2hrs
                  </div>
                  <div className="text-sm text-green-200">Phone Response</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400 mb-1">
                    98%
                  </div>
                  <div className="text-sm text-green-200">
                    Satisfaction Rate
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400 mb-1">
                    24/7
                  </div>
                  <div className="text-sm text-green-200">
                    Support Available
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-green-400 to-lime-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "How quickly do you respond to inquiries?",
                answer:
                  "We typically respond to email inquiries within 24 hours and phone calls within 2 hours during business hours.",
              },
              {
                question: "What support do you offer for new users?",
                answer:
                  "We provide comprehensive onboarding, training materials, and dedicated support to help you get started with AgroVision.",
              },
              {
                question: "Can I schedule a demo of your platform?",
                answer:
                  "Absolutely! Contact us to schedule a personalized demo and see how AgroVision can benefit your farming operations.",
              },
              {
                question: "Do you offer technical support?",
                answer:
                  "Yes, we provide 24/7 technical support to ensure your farming operations run smoothly with our platform.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-green-100 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
