import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

const PricingView = () => {
  return (
    <div
      id="pricing"
      className="pt-32 bg-slate-950 pb-20 px-4 animate-in fade-in duration-500"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Invest in your career
          </h1>
          <p className="text-slate-400 text-lg">
            Plans designed for active job seekers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-8 flex flex-col">
            <h3 className="text-xl font-semibold text-white mb-2">Free</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-white">$0</span>
              <span className="text-slate-500">/mo</span>
            </div>
            <p className="text-slate-400 text-sm mb-8">
              Basic behavioral questions.
            </p>

            <Link
              href="/register"
              className="w-full text-center bg-slate-800 text-white font-semibold py-3 rounded-lg hover:bg-slate-700 transition-colors mb-8 border border-slate-700"
            >
              Start Free
            </Link>

            <div className="space-y-4 flex-1">
              {[
                "5 Mock Interviews / mo",
                "Standard Question Bank",
                "Basic Feedback",
                "Text Mode Only",
              ].map((feat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-sm text-slate-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-slate-500" />
                  {feat}
                </div>
              ))}
            </div>
          </div>

          {/* Pro Plan */}
          <div className="bg-slate-900 border border-emerald-500 rounded-2xl p-8 flex flex-col relative shadow-[0_0_40px_rgba(16,185,129,0.15)] transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">
              Best Value
            </div>

            <h3 className="text-xl font-semibold text-white mb-2">
              Pro Job Seeker
            </h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-white">$19</span>
              <span className="text-slate-500">/mo</span>
            </div>
            <p className="text-slate-400 text-sm mb-8">
              Unlimited practice for serious candidates.
            </p>

            <Link
              href="/register"
              className="w-full text-center bg-emerald-600 text-white font-semibold py-3 rounded-lg hover:bg-emerald-500 transition-colors mb-8 shadow-lg shadow-emerald-900/20"
            >
              Get Pro
            </Link>

            <div className="space-y-4 flex-1">
              {[
                "Unlimited Interviews",
                "Role-Specific Scenarios",
                "Voice Mode Analysis",
                "Resume Parsing",
                "Detailed Progress Reports",
              ].map((feat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-sm text-white font-medium"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  {feat}
                </div>
              ))}
            </div>
          </div>

          {/* Lifetime Plan */}
          <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-8 flex flex-col">
            <h3 className="text-xl font-semibold text-white mb-2">Lifetime</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-white">$149</span>
              <span className="text-slate-500">/once</span>
            </div>
            <p className="text-slate-400 text-sm mb-8">
              Own the tool forever. Good for coaches.
            </p>

            <Link
              href="/register"
              className="w-full text-center bg-slate-800 text-white font-semibold py-3 rounded-lg hover:bg-slate-700 transition-colors mb-8 border border-slate-700"
            >
              Buy License
            </Link>

            <div className="space-y-4 flex-1">
              {[
                "All Pro Features",
                "Export Transcripts",
                "Priority Support",
                "Future Updates Included",
                "Coach Dashboard",
              ].map((feat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-sm text-slate-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-slate-500" />
                  {feat}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingView;
