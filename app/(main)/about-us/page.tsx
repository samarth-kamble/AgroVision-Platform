import {
  Sparkles,
  Target,
  Award,
  Users,
  MessageCircle,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const AboutUs = () => {
  return (
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
            <Sparkles className="w-4 h-4" />
            <span>About AgroVision</span>
            <Sparkles className="w-4 h-4" />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Empowering Farmers
            <span className="bg-gradient-to-r from-green-400 via-lime-400 to-emerald-400 bg-clip-text text-transparent block">
              Through Innovation
            </span>
          </h1>

          <p className="text-xl text-green-100 mb-8 max-w-4xl mx-auto leading-relaxed">
            AgroVision is revolutionizing agriculture by connecting farmers with
            cutting-edge AI technology, expert knowledge, and a thriving
            community of agricultural professionals.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Our Mission</h3>
            </div>
            <p className="text-green-100 leading-relaxed">
              To democratize access to advanced agricultural technology and
              knowledge, empowering farmers worldwide to achieve sustainable,
              profitable, and efficient farming practices through AI-powered
              solutions.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Our Vision</h3>
            </div>
            <p className="text-green-100 leading-relaxed">
              To create a world where every farmer has access to the tools and
              knowledge needed to feed the growing global population while
              preserving our planet&apos;s resources for future generations.
            </p>
          </div>
        </div>

        {/* Core Features */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            What We{" "}
            <span className="bg-gradient-to-r from-green-400 to-lime-400 bg-clip-text text-transparent">
              Offer
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "AI-Powered Predictions",
                description:
                  "Advanced machine learning models for disease detection, yield prediction, and crop optimization.",
              },
              {
                icon: MessageCircle,
                title: "Expert Community",
                description:
                  "Connect with agricultural experts, share experiences, and learn from fellow farmers worldwide.",
              },
              {
                icon: TrendingUp,
                title: "Smart Marketplace",
                description:
                  "Access quality agricultural products, tools, and equipment at competitive prices.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-green-400" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-green-100 text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { value: "10K+", label: "Active Farmers" },
            { value: "25%", label: "Average Yield Increase" },
            { value: "30%", label: "Cost Reduction" },
            { value: "50+", label: "Countries Served" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 text-center hover:bg-white/15 transition-all duration-300"
            >
              <div className="text-3xl font-bold text-lime-400 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-green-200">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl p-12 border border-white/20 backdrop-blur-xl">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Farm?
            </h3>
            <p className="text-green-100 mb-8 max-w-2xl mx-auto">
              Join thousands of farmers who are already using AgroVision to
              boost their productivity and profitability.
            </p>
            <button className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500 hover:from-green-600 hover:via-emerald-600 hover:to-lime-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <span>Get Started Today</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
