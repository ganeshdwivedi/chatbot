"use client";
import React, { useState, useEffect } from "react";
import {
  Rocket,
  BarChart2,
  Target,
  ShieldCheck,
  Zap,
  TrendingUp,
  Users,
  ArrowRight,
  Search,
  BrainCircuit,
  Globe,
} from "lucide-react";
import { useRouter } from "next/navigation";

const App = () => {
  const [ideaInput, setIdeaInput] = useState("");
  const router = useRouter();
  // Handle scroll effect for navbar

  const features = [
    {
      icon: <BrainCircuit className="w-6 h-6 text-violet-400" />,
      title: "AI-Powered Analysis",
      desc: "Our LLM models dissect your business logic, identifying potential pitfalls before you spend a dime.",
    },
    {
      icon: <Globe className="w-6 h-6 text-blue-400" />,
      title: "Market Deep Dive",
      desc: "Real-time access to market trends, TAM/SAM/SOM calculations, and competitor saturation metrics.",
    },
    {
      icon: <Users className="w-6 h-6 text-teal-400" />,
      title: "User Persona Matching",
      desc: "Simulate user interviews with AI agents based on your specific target demographics.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-violet-500 selection:text-white font-sans overflow-x-hidden">
      {/* Navbar */}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] -z-10"></div>

        <div className="max-w-4xl mx-auto text-center z-10 relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 text-violet-300 text-sm font-medium mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            AI Model 2.0 Now Live
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
            Don&apos;t Build Before <br /> You{" "}
            <span className="text-violet-400">Validate</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Stop guessing. Use our AI-driven engine to analyze market fit,
            competitor density, and financial viability in seconds.
          </p>

          {/* Interactive Input Component */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
            <div className="relative flex items-center bg-slate-900 rounded-xl border border-slate-800 p-2 shadow-2xl">
              <Search className="w-6 h-6 text-slate-500 ml-3" />
              <input
                type="text"
                placeholder="Describe your startup idea (e.g., Uber for dog walking)..."
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-500 px-4 py-3"
                value={ideaInput}
                onChange={(e) => setIdeaInput(e.target.value)}
              />
              <button
                onClick={() => {
                  router.push(`/chat`);
                }}
                className="hidden cursor-pointer md:flex items-center gap-2 bg-white text-slate-950 hover:bg-slate-200 px-6 py-3 rounded-lg font-bold transition-all"
              >
                Analyze <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <button className="mt-4 w-full md:hidden bg-white text-slate-950 py-3 rounded-lg font-bold">
              Analyze Idea
            </button>
          </div>

          {/* Trusted By */}
          <div className="mt-20 pt-10 border-t border-slate-800/50">
            <p className="text-sm text-slate-500 font-medium mb-6">
              TRUSTED BY FOUNDERS FROM
            </p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Simple text logos for demo purposes */}
              <span className="text-xl font-bold text-white">Y Combinator</span>
              <span className="text-xl font-bold text-white">Techstars</span>
              <span className="text-xl font-bold text-white">ProductHunt</span>
              <span className="text-xl font-bold text-white">IndieHackers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl p-2 shadow-2xl overflow-hidden group">
            {/* Top Bar Mockup */}
            <div className="h-10 border-b border-slate-800 flex items-center px-4 gap-2 mb-4 bg-slate-900/80">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
              <div className="mx-auto bg-slate-800/50 px-3 py-1 rounded-md text-xs text-slate-400 font-mono">
                valid8r-report-v2.pdf
              </div>
            </div>

            {/* Dashboard Grid Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 md:p-8">
              {/* Score Card */}
              <div className="md:col-span-1 bg-slate-800/30 rounded-xl p-6 border border-slate-700/50 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-600"></div>
                <h3 className="text-slate-400 text-sm font-semibold mb-4 uppercase tracking-wider">
                  Viability Score
                </h3>
                <div className="text-6xl font-bold text-white mb-2">
                  87<span className="text-2xl text-slate-500">/100</span>
                </div>
                <div className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full font-medium">
                  High Potential
                </div>
              </div>

              {/* Chart Mockup */}
              <div className="md:col-span-2 bg-slate-800/30 rounded-xl p-6 border border-slate-700/50 relative overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider">
                    Market Demand Projection
                  </h3>
                  <BarChart2 className="text-violet-500 w-5 h-5" />
                </div>
                <div className="flex items-end gap-2 h-32 w-full">
                  {[30, 45, 35, 60, 55, 75, 65, 80, 95].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-slate-700/50 rounded-t-sm hover:bg-violet-500 transition-colors duration-300 relative group/bar"
                    >
                      <div
                        className="absolute bottom-0 w-full bg-violet-600/20"
                        style={{ height: `${h}%` }}
                      ></div>
                      <div
                        className="absolute bottom-0 w-full bg-gradient-to-t from-violet-600 to-violet-400"
                        style={{ height: `${h}%` }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths */}
              <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-800/30 p-4 rounded-lg border border-slate-700/50 flex items-start gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Target className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-300 font-semibold">
                      Niche Audience
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Strong alignment with Gen-Z creators.
                    </div>
                  </div>
                </div>
                <div className="bg-slate-800/30 p-4 rounded-lg border border-slate-700/50 flex items-start gap-3">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-300 font-semibold">
                      Growing Market
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Sector growing at 14% CAGR.
                    </div>
                  </div>
                </div>
                <div className="bg-slate-800/30 p-4 rounded-lg border border-slate-700/50 flex items-start gap-3">
                  <div className="p-2 bg-orange-500/10 rounded-lg">
                    <Zap className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-300 font-semibold">
                      Low Friction
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Easy adoption for existing workflows.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decor glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-violet-600/30 blur-[80px] rounded-full pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive Validation Suite
            </h2>
            <p className="text-slate-400 text-lg">
              We don&apos;t just give you a score. We give you the roadmap to
              success, backed by millions of data points.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-slate-950 border border-slate-800 hover:border-violet-500/50 hover:bg-slate-900 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-slate-800 group-hover:border-violet-500/30">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-violet-200 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  From Idea to <br />
                  <span className="text-violet-400">Blueprint</span> in Minutes
                </h2>
                <p className="text-slate-400 text-lg">
                  Traditional validation takes months. We shrunk it down to
                  three simple steps.
                </p>
              </div>

              <div className="space-y-8">
                {[
                  {
                    title: "Input your hypothesis",
                    desc: "Simply describe your product, target audience, and revenue model in plain English.",
                  },
                  {
                    title: "AI Agent Simulation",
                    desc: "Our agents scour the web for competitors and simulate user interviews to find holes in your logic.",
                  },
                  {
                    title: "Receive Actionable Report",
                    desc: "Get a 20-page PDF with pricing strategies, go-to-market plans, and risk assessments.",
                  },
                ].map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-violet-600/20 text-violet-400 flex items-center justify-center font-bold border border-violet-600/30">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1">
                        {step.title}
                      </h4>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="text-violet-400 font-semibold flex items-center gap-2 hover:gap-4 transition-all group">
                See a sample report{" "}
                <ArrowRight className="w-4 h-4 group-hover:text-violet-300" />
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-600 rounded-2xl blur-2xl opacity-20"></div>
              <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex-shrink-0 flex items-center justify-center">
                      <Users size={14} />
                    </div>
                    <div className="bg-slate-800 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl p-4 text-sm text-slate-300 max-w-[90%]">
                      I&apos;m worried that the market for Luxury Cat Hotels is
                      too small. Can you check saturation?
                    </div>
                  </div>
                  <div className="flex items-start gap-3 flex-row-reverse">
                    <div className="w-8 h-8 rounded-full bg-violet-600 flex-shrink-0 flex items-center justify-center">
                      <Zap size={14} />
                    </div>
                    <div className="bg-violet-600/20 border border-violet-600/20 rounded-tl-2xl rounded-bl-2xl rounded-br-2xl p-4 text-sm text-white max-w-[90%]">
                      <p className="mb-2 font-semibold text-violet-200">
                        Analysis Complete.
                      </p>
                      High saturation in urban centers (NYC, LA). However,
                      search volume for premium pet boarding is up 45% YoY.
                      Recommend pivoting to Tech-enabled Pet Sitting to reduce
                      overhead.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-b from-violet-900/20 to-slate-900 border border-violet-500/20 rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white relative z-10">
            Stop Dreaming. Start{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
              Building.
            </span>
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto relative z-10">
            Join 10,000+ founders who validated their startup ideas before
            writing a single line of code.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10">
            <button className="bg-white text-slate-950 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-100 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              Get Your Validation Score
            </button>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <ShieldCheck className="w-4 h-4" /> No credit card required
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 pt-20 pb-10 border-t border-slate-900 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-violet-600 p-1.5 rounded-md">
                <Rocket className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold">Valid8r</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              The standard for startup validation. Data-driven decisions for the
              modern entrepreneur.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <a href="#" className="hover:text-violet-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-violet-400 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-violet-400 transition-colors">
                  API Access
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <a href="#" className="hover:text-violet-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-violet-400 transition-colors">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-violet-400 transition-colors">
                  Founder Community
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <a href="#" className="hover:text-violet-400 transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-violet-400 transition-colors">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-sm text-slate-600">
          <p>&copy; 2024 Valid8r AI Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">
              Twitter
            </a>
            <a href="#" className="hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="#" className="hover:text-white transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
