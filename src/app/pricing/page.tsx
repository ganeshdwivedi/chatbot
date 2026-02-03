"use client";
import React from "react";
import { CheckCircle2 } from "lucide-react";

const Page = () => {
  return (
    <div className="pt-32 bg-slate-950 pb-20 px-4 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Simple, transparent pricing
          </h1>
          <p className="text-slate-400 text-lg">
            Invest in validation today to save thousands on failed development
            tomorrow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Starter */}
          <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-8 flex flex-col">
            <h3 className="text-xl font-semibold text-white mb-2">Hobbyist</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-white">$0</span>
              <span className="text-slate-500">/month</span>
            </div>
            <p className="text-slate-400 text-sm mb-8">
              Perfect for testing the waters with your first idea.
            </p>
            <button
              onClick={() => alert("Pricing is Not Available at the moment")}
              className="w-full bg-slate-800 text-white font-semibold py-3 rounded-lg hover:bg-slate-700 transition-colors mb-8 border border-slate-700"
            >
              Get Started
            </button>
            <div className="space-y-4 flex-1">
              {[
                "3 Validations / mo",
                "Basic Market Data",
                "Community Support",
                "Web Access",
              ].map((feat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-sm text-slate-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-slate-500" /> {feat}
                </div>
              ))}
            </div>
          </div>

          {/* Pro */}
          <div className="bg-slate-900 border border-violet-500 rounded-2xl p-8 flex flex-col relative shadow-[0_0_40px_rgba(124,58,237,0.15)] transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-violet-600 to-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">
              Most Popular
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Founder</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-white">$29</span>
              <span className="text-slate-500">/month</span>
            </div>
            <p className="text-slate-400 text-sm mb-8">
              For serious founders building their next big thing.
            </p>
            <button
              onClick={() => alert("Pricing is Not Available at the moment")}
              className="w-full bg-violet-600 text-white font-semibold py-3 rounded-lg hover:bg-violet-500 transition-colors mb-8 shadow-lg shadow-violet-900/20"
            >
              Start Free Trial
            </button>
            <div className="space-y-4 flex-1">
              {[
                "Unlimited Validations",
                "Detailed Financial Models",
                "Export to PDF/Deck",
                "Competitor Deep Dive",
                "Synthetic User Agents",
              ].map((feat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-sm text-white font-medium"
                >
                  <CheckCircle2 className="w-4 h-4 text-violet-400" /> {feat}
                </div>
              ))}
            </div>
          </div>

          {/* Enterprise */}
          <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-8 flex flex-col">
            <h3 className="text-xl font-semibold text-white mb-2">Agency</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-white">$99</span>
              <span className="text-slate-500">/month</span>
            </div>
            <p className="text-slate-400 text-sm mb-8">
              For incubators and dev shops validating client ideas.
            </p>
            <button
              onClick={() => alert("Pricing is Not Available at the moment")}
              className="w-full bg-slate-800 text-white font-semibold py-3 rounded-lg hover:bg-slate-700 transition-colors mb-8 border border-slate-700"
            >
              Contact Sales
            </button>
            <div className="space-y-4 flex-1">
              {[
                "Everything in Founder",
                "API Access",
                "White-label Reports",
                "Team Collaboration",
                "Priority Support",
              ].map((feat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-sm text-slate-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-slate-500" /> {feat}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="text-slate-500 text-sm">
            Need a custom plan?{" "}
            <a href="#" className="text-violet-400 hover:text-white underline">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
