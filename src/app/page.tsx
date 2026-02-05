"use client";
import { useState } from "react";

import {
  Mic,
  Video,
  Code,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  Bot,
  User,
  Cpu,
  Star,
  Quote,
} from "lucide-react";
import { useRouter } from "next/navigation";

const HomeView = () => {
  const [roleInput, setRoleInput] = useState("");
  const router = useRouter();

  const onStartPractice = (role: string) => {
    if (!role || !role.trim()) return;
    router.push(`/chat?designation=Frontend&role=Developer&field=React&experience=2&difficulty=medium
`);
  };

  return (
    <div className="animate-in bg-slate-950 fade-in duration-500">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-600/20 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[100px] -z-10"></div>

        <div className="max-w-4xl mx-auto text-center z-10 relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 text-emerald-300 text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            New: Coding Challenge Mode
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
            Ace Your Next <br />{" "}
            <span className="text-emerald-400">Interview</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Stop practicing in front of the mirror. Use our AI coach to simulate
            real interviews for any role, from Engineering to Sales.
          </p>

          {/* Interactive Input Component */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
            <div className="relative flex items-center bg-slate-900 rounded-xl border border-slate-800 p-2 shadow-2xl">
              <Briefcase className="w-6 h-6 text-slate-500 ml-3" />
              <input
                type="text"
                placeholder="Enter a job title (e.g., Senior React Developer)..."
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-500 px-4 py-3"
                value={roleInput}
                onChange={(e) => setRoleInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && onStartPractice(roleInput)
                }
              />
              <button
                onClick={() => onStartPractice(roleInput)}
                className="hidden md:flex items-center gap-2 bg-white text-slate-950 hover:bg-slate-200 px-6 py-3 rounded-lg font-bold transition-all"
              >
                Start Practicing <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => onStartPractice(roleInput)}
              className="mt-4 w-full md:hidden bg-white text-slate-950 py-3 rounded-lg font-bold"
            >
              Start Practicing
            </button>
          </div>

          <div className="mt-8 flex justify-center gap-2 text-sm text-slate-500">
            <span>Try:</span>
            <button
              onClick={() => onStartPractice("Product Manager")}
              className="text-emerald-400 hover:text-emerald-300 hover:underline"
            >
              Product Manager
            </button>
            <span>•</span>
            <button
              onClick={() => onStartPractice("Data Scientist")}
              className="text-emerald-400 hover:text-emerald-300 hover:underline"
            >
              Data Scientist
            </button>
            <span>•</span>
            <button
              onClick={() => onStartPractice("UX Designer")}
              className="text-emerald-400 hover:text-emerald-300 hover:underline"
            >
              UX Designer
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-slate-800 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "50k+", label: "Interviews Practiced" },
            { num: "150+", label: "Job Roles Supported" },
            { num: "4.9/5", label: "User Rating" },
            { num: "92%", label: "Success Rate" },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.num}
              </div>
              <div className="text-sm text-slate-400 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 border-b border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm font-medium mb-8">
            TRUSTED BY CANDIDATES HIRED AT
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            {[
              "GOOGLE",
              "AMAZON",
              "NETFLIX",
              "META",
              "MICROSOFT",
              "SPOTIFY",
            ].map((logo, i) => (
              <span
                key={i}
                className="text-xl font-bold text-white tracking-widest"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Deep Dive Features */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto space-y-24">
          {/* Feature 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
                <Cpu size={14} /> AI Analysis
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Real-time feedback on <br />
                your delivery.
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                It's not just what you say, it's how you say it. Our audio
                engine analyzes your pacing, tone, and filler words (ums, ahs)
                to ensure you sound confident and professional.
              </p>
              <ul className="space-y-4">
                {[
                  "Detects filler words automatically",
                  "Analyzes speech pace (WPM)",
                  "Sentiment & Confidence scoring",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-slate-300"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-emerald-500/20 rounded-xl blur-xl"></div>
              <div className="relative bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <span className="text-sm text-slate-400">
                      Audio Analysis
                    </span>
                    <span className="text-emerald-400 text-xs font-bold px-2 py-1 bg-emerald-500/10 rounded">
                      LIVE
                    </span>
                  </div>
                  <div className="flex items-center gap-1 h-12">
                    {[
                      40, 60, 30, 80, 50, 90, 40, 70, 30, 60, 40, 80, 50, 70,
                      40, 60,
                    ].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-emerald-500 rounded-full animate-pulse"
                        style={{
                          height: `${h}%`,
                          animationDelay: `${i * 0.05}s`,
                        }}
                      ></div>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-slate-950 p-3 rounded-lg text-center">
                      <div className="text-xs text-slate-500 mb-1">Pace</div>
                      <div className="text-white font-bold">140 WPM</div>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-lg text-center">
                      <div className="text-xs text-slate-500 mb-1">Fillers</div>
                      <div className="text-emerald-400 font-bold">0%</div>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-lg text-center">
                      <div className="text-xs text-slate-500 mb-1">Clarity</div>
                      <div className="text-white font-bold">98/100</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center lg:flex-row-reverse">
            <div className="lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-6">
                <Code size={14} /> Tech Mode
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Crush the coding <br />
                interview.
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                Don't fear the whiteboard. Practice algorithms and system design
                in our integrated IDE. The AI acts as your pair programmer,
                giving subtle hints when you get stuck.
              </p>
              <ul className="space-y-4">
                {[
                  "Supports Python, JS, Java, C++",
                  "System Design whiteboard mode",
                  "Time complexity analysis included",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-slate-300"
                  >
                    <CheckCircle2 className="w-5 h-5 text-cyan-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative lg:order-1">
              <div className="absolute -inset-4 bg-cyan-500/20 rounded-xl blur-xl"></div>
              <div className="relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
                <div className="bg-slate-950 border-b border-slate-800 p-3 flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="p-4 font-mono text-xs md:text-sm text-slate-300 space-y-2">
                  <div className="flex">
                    <span className="text-slate-600 mr-4">1</span>
                    <span className="text-purple-400">function</span>{" "}
                    <span className="text-blue-400">twoSum</span>(nums, target){" "}
                    {"{"}
                  </div>
                  <div className="flex">
                    <span className="text-slate-600 mr-4">2</span>{" "}
                    <span className="text-purple-400">const</span> map ={" "}
                    <span className="text-purple-400">new</span> Map();
                  </div>
                  <div className="flex">
                    <span className="text-slate-600 mr-4">3</span>{" "}
                    <span className="text-purple-400">for</span> (
                    <span className="text-purple-400">let</span> i = 0; i {"<"}{" "}
                    nums.length; i++) {"{"}
                  </div>
                  <div className="flex">
                    <span className="text-slate-600 mr-4">4</span>{" "}
                    <span className="text-slate-500">// ... solving ...</span>
                  </div>
                  <div className="flex">
                    <span className="text-slate-600 mr-4">5</span> {"}"}
                  </div>
                  <div className="flex">
                    <span className="text-slate-600 mr-4">6</span>
                    {"}"}
                  </div>
                </div>
                <div className="bg-slate-950/80 p-3 border-t border-slate-800 flex items-center gap-3">
                  <Bot size={16} className="text-cyan-400" />
                  <span className="text-xs text-cyan-100">
                    Hint: Consider using a hash map to store complements for
                    O(n) time complexity.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-slate-900/30 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Don't take our word for it
            </h2>
            <p className="text-slate-400">
              Join thousands of candidates landing their dream jobs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "The behavioral feedback was a game changer. I realized I was rambling, and Intervue helped me structure my answers using STAR.",
                author: "Sarah J.",
                role: "PM at Spotify",
                bg: "bg-emerald-500",
              },
              {
                quote:
                  "Practicing coding problems while talking through my thought process was exactly what I needed to pass the Google onsite.",
                author: "David L.",
                role: "SWE at Google",
                bg: "bg-blue-500",
              },
              {
                quote:
                  "I was terrified of the system design round. The whiteboard mode helped me visualize my architecture before explaining it.",
                author: "Michael R.",
                role: "Senior Eng at Netflix",
                bg: "bg-red-500",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-slate-950 border border-slate-800 p-8 rounded-2xl relative group hover:-translate-y-2 transition-transform duration-300"
              >
                <Quote className="absolute top-8 right-8 text-slate-800 w-10 h-10 group-hover:text-slate-700 transition-colors" />
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className="text-yellow-500 fill-yellow-500"
                    />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed relative z-10">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full ${t.bg} flex items-center justify-center text-white font-bold text-sm`}
                  >
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">
                      {t.author}
                    </div>
                    <div className="text-slate-500 text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-900/10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to ace your interview?
          </h2>
          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
            Start practicing today with 5 free mock interviews. No credit card
            required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => onStartPractice("General Interview")}
              className="px-8 py-4 bg-white text-slate-950 font-bold rounded-full hover:bg-slate-100 transition-colors shadow-xl shadow-emerald-500/10"
            >
              Start Practicing Now
            </button>
            <button
              onClick={() => onStartPractice("Demo Mode")}
              className="px-8 py-4 bg-slate-900 text-white border border-slate-700 font-bold rounded-full hover:bg-slate-800 transition-colors"
            >
              View Demo
            </button>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            Includes 50+ role templates • Instant Feedback • Resume Review
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 pt-20 pb-10 border-t border-slate-900 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-emerald-500 to-cyan-500 p-1.5 rounded-lg">
                <Mic className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">Intervue.AI</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              The most advanced AI interview coach for job seekers in tech,
              finance, and product management.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-400 transition-colors"
                >
                  For Teams
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Interview Guide
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Question Bank
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-400 transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-sm text-slate-600">
          <p>&copy; 2024 Intervue.AI Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">
              Twitter
            </a>
            <a href="#" className="hover:text-white transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeView;
