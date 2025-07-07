import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ArrowRight,
  Leaf,
  Heart,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import Logo from "@/public/Logo.png"; // Adjust the path as necessary

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "AI Dashboard", href: "/ai" },
        { name: "Analytics", href: "#" },
        { name: "Market Insights", href: "#" },
        { name: "Weather Station", href: "#" },
      ],
    },
    {
      title: "Solutions",
      links: [
        { name: "Crop Monitoring", href: "#" },
        { name: "Smart Irrigation", href: "#" },
        { name: "Pest Control", href: "#" },
        { name: "Yield Prediction", href: "#" },
        { name: "Supply Chain", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "#" },
        { name: "API Reference", href: "#" },
        { name: "Tutorials", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Case Studies", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about-us" },
        { name: "Careers", href: "#" },
        { name: "Press Kit", href: "#" },
        { name: "Partners", href: "#" },
        { name: "Contact", href: "/contact" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-slate-950 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.05),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.03),transparent_50%)]"></div>
      </div>

      <div className="relative z-10">
        {/* Newsletter Section */}
        <div className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Stay Updated with AgroVision
                </h3>
                <p className="text-gray-300 text-lg">
                  Get the latest insights, tips, and updates on smart
                  agriculture delivered directly to your inbox. Join thousands
                  of farmers worldwide!
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full h-12 bg-white/10 border border-white/20 rounded-xl px-4 text-white placeholder:text-white/50 focus:border-green-400 focus:ring-4 focus:ring-green-400/20 focus:outline-none transition-all"
                    />
                  </div>
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 whitespace-nowrap">
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-400 mt-4">
                  By subscribing, you agree to our Privacy Policy and consent to
                  receive updates from our company.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              {/* Logo */}
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl">
                    <span className="text-2xl">
                      <Image src={Logo} alt="AgroVision Logo" />
                    </span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-lime-400 rounded-full animate-ping"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
                    AgroVision
                  </h1>
                  <p className="text-green-200 text-sm font-medium">
                    Smart Agriculture Platform
                  </p>
                </div>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                Empowering farmers worldwide with AI-driven insights,
                sustainable practices, and cutting-edge technology to
                revolutionize agriculture for a better tomorrow.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-5 h-5 text-green-400" />
                  <span>contact@agrovision.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="w-5 h-5 text-green-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-green-400" />
                  <span>San Francisco, CA 94105</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4 mt-6">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-white/10 hover:bg-green-500/20 rounded-xl flex items-center justify-center text-gray-300 hover:text-green-400 transition-all duration-300 transform hover:scale-110"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={index} className="lg:col-span-1">
                <h4 className="text-white font-semibold mb-6 text-lg">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-green-400 transition-colors duration-300 flex items-center gap-2 group"
                      >
                        <span>{link.name}</span>
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-gray-300">
                <span>© {currentYear} AgroVision. Made with</span>
                <Heart className="w-4 h-4 text-red-400" />
                <span>for farmers worldwide.</span>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <a
                  href="/privacy-policy"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-8 right-8 z-50">
          <button className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-full shadow-2xl flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110 animate-bounce">
            <Leaf className="w-6 h-6" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
