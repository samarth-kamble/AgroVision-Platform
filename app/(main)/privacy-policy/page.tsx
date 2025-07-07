import {
  Shield,
  Info,
  Eye,
  UserCheck,
  Database,
  Lock,
  Mail,
  Sparkles,
} from "lucide-react";

const PrivacyPolicy = () => (
  <div className="relative z-10 min-h-screen pt-20 pb-20 bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900">
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
      <div className="absolute top-24 left-1/4 w-6 h-6 bg-blue-400/20 rounded-full animate-bounce delay-300"></div>
      <div className="absolute top-40 right-1/4 w-5 h-5 bg-green-400/25 rounded-full animate-pulse delay-1500"></div>
      <div className="absolute bottom-48 left-1/6 w-4 h-4 bg-purple-400/20 rounded-full animate-bounce delay-800"></div>
      <div className="absolute top-1/2 left-16 w-4 h-4 bg-green-300/30 rounded-full animate-bounce delay-1200"></div>
      <div className="absolute top-32 right-24 w-6 h-6 bg-yellow-400/25 rounded-full animate-pulse delay-2200"></div>
      <div className="absolute bottom-40 right-1/5 w-4 h-4 bg-cyan-400/20 rounded-full animate-bounce delay-600"></div>
      <Sparkles className="absolute bottom-16 left-1/5 w-4 h-4 text-purple-400/20 animate-pulse delay-1800" />
    </div>

    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 text-green-300 font-medium mb-8">
          <Shield className="w-4 h-4" />
          <span>Privacy Policy</span>
          <Shield className="w-4 h-4" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Your Privacy
          <span className="bg-gradient-to-r from-green-400 via-lime-400 to-emerald-400 bg-clip-text text-transparent block">
            Is Our Priority
          </span>
        </h1>

        <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto leading-relaxed">
          We are committed to protecting your personal information and ensuring
          transparency in how we collect, use, and safeguard your data.
        </p>

        <div className="text-sm text-green-300 bg-white/10 backdrop-blur-xl rounded-lg p-4 border border-white/20">
          <strong>Last Updated:</strong> July 7, 2025
        </div>
      </div>

      {/* Privacy Sections */}
      <div className="space-y-8">
        {[
          {
            icon: Info,
            title: "Information We Collect",
            content: [
              {
                subtitle: "Personal Information",
                text: "We collect information you provide directly to us, including your name, email address, phone number, farm location, and farming practices when you register for our services.",
              },
              {
                subtitle: "Usage Data",
                text: "We automatically collect information about your interaction with our platform, including device information, IP address, browser type, and usage patterns.",
              },
              {
                subtitle: "Agricultural Data",
                text: "We collect data related to your farming activities, including crop images, soil conditions, weather data, and farming decisions to provide personalized recommendations.",
              },
            ],
          },
          {
            icon: Eye,
            title: "How We Use Your Information",
            content: [
              {
                subtitle: "Service Provision",
                text: "We use your information to provide and improve our AI-powered agricultural services, including disease prediction, fertilizer recommendations, and community features.",
              },
              {
                subtitle: "Communication",
                text: "We may use your contact information to send you important updates, newsletters, and promotional materials (which you can opt out of at any time).",
              },
              {
                subtitle: "Analytics & Research",
                text: "We analyze aggregated, anonymized data to improve our AI models and develop new features that benefit the farming community.",
              },
            ],
          },
          {
            icon: UserCheck,
            title: "Information Sharing",
            content: [
              {
                subtitle: "Service Providers",
                text: "We may share your information with trusted third-party service providers who assist us in operating our platform, processing payments, and delivering services.",
              },
              {
                subtitle: "Legal Compliance",
                text: "We may disclose your information if required by law or to protect our rights, safety, or the rights and safety of others.",
              },
              {
                subtitle: "Community Features",
                text: "Information you choose to share in community posts, forums, or public profiles will be visible to other users as per your privacy settings.",
              },
            ],
          },
          {
            icon: Database,
            title: "Data Security",
            content: [
              {
                subtitle: "Protection Measures",
                text: "We implement industry-standard security measures including encryption, secure servers, and regular security audits to protect your personal information.",
              },
              {
                subtitle: "Data Retention",
                text: "We retain your personal information only as long as necessary to provide services and comply with legal obligations.",
              },
              {
                subtitle: "International Transfers",
                text: "Your data may be transferred to and processed in countries other than your country of residence, always with appropriate safeguards in place.",
              },
            ],
          },
          {
            icon: Lock,
            title: "Your Rights",
            content: [
              {
                subtitle: "Access & Correction",
                text: "You have the right to access, update, or correct your personal information at any time through your account settings.",
              },
              {
                subtitle: "Data Portability",
                text: "You can request a copy of your data in a machine-readable format and transfer it to another service provider.",
              },
              {
                subtitle: "Deletion",
                text: "You can request deletion of your personal information, subject to certain legal and operational requirements.",
              },
            ],
          },
        ].map((section, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center">
                <section.icon className="w-6 h-6 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">{section.title}</h2>
            </div>

            <div className="space-y-4">
              {section.content.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="border-l-2 border-green-500/30 pl-4"
                >
                  <h3 className="text-lg font-semibold text-green-300 mb-2">
                    {item.subtitle}
                  </h3>
                  <p className="text-green-100 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Contact for Privacy */}
      <div className="mt-16 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl p-8 border border-white/20 backdrop-blur-xl text-center">
        <h3 className="text-2xl font-bold text-white mb-4">
          Questions About Privacy?
        </h3>
        <p className="text-green-100 mb-6">
          If you have any questions about this Privacy Policy or how we handle
          your data, please contact us.
        </p>
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105">
          <Mail className="w-5 h-5" />
          <span>Contact Privacy Team</span>
        </button>
      </div>
    </div>
  </div>
);

export default PrivacyPolicy;
