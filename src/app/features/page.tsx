import React from "react";
import {
  BarChart2,
  Target,
  ShieldCheck,
  Users,
  CheckCircle2,
  BrainCircuit,
  FileText,
} from "lucide-react";

const page = () => {
  return (
    <div className="pt-32 pb-20 bg-slate-950 px-4 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-violet-400 font-medium mb-4 tracking-wider text-sm uppercase">
            Powerful Capabilities
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Everything needed to <br />
            validate with confidence
          </h1>
          <p className="text-slate-400 text-lg">
            Our AI engine combines real-time market data with advanced reasoning
            to simulate the entire startup lifecycle in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <BrainCircuit />,
              title: "Logic Stress-Testing",
              desc: "Identify flaws in your business model before you build. Our AI challenges your assumptions like a seasoned VC.",
            },
            {
              icon: <Users />,
              title: "Persona Simulation",
              desc: "Generate synthetic user interviews based on your specific demographic targets to gauge interest.",
            },
            {
              icon: <BarChart2 />,
              title: "Market Sizing (TAM/SAM)",
              desc: "Get instant calculations for Total Addressable Market using real-time industry reports and data.",
            },
            {
              icon: <Target />,
              title: "Competitor Recon",
              desc: "Deep-dive analysis of existing players, their pricing strategies, and feature gaps you can exploit.",
            },
            {
              icon: <FileText />,
              title: "Generated Documents",
              desc: "Export professional Pitch Decks, Lean Canvases, and Financial Models directly from the analysis.",
            },
            {
              icon: <ShieldCheck />,
              title: "Risk Assessment",
              desc: "A comprehensive breakdown of legal, technical, and market risks associated with your idea.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:bg-slate-800/50 hover:border-violet-500/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center text-violet-400 mb-6 group-hover:scale-110 transition-transform group-hover:text-violet-300 group-hover:border-violet-500/50">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Feature Deep Dive */}
        <div className="mt-32 bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl border border-slate-800 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-violet-600/5 blur-[100px] -z-10"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-16 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">
                Synthetic Focus Groups
              </h3>
              <p className="text-slate-400 mb-8 text-lg">
                Don't have access to 100 potential customers? We generate them.
                Our "Synthetic User Agents" possess unique personalities,
                budgets, and pain points tailored to your niche.
              </p>
              <ul className="space-y-4">
                {[
                  "Simulate 100+ interviews in minutes",
                  "Detect pricing sensitivity",
                  "Identify feature priorities",
                  "Uncover hidden objections",
                ].map((pt, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-slate-300"
                  >
                    <CheckCircle2 className="text-violet-500 w-5 h-5 flex-shrink-0" />{" "}
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 relative shadow-2xl">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                  A1
                </div>
                <div className="bg-slate-900 rounded-2xl rounded-tl-none p-4 text-sm text-slate-300 border border-slate-800">
                  <p className="font-semibold text-blue-400 mb-1">
                    Persona: Sarah, Marketing Manager
                  </p>
                  "I'd pay $50/mo for this, but only if it integrates with
                  HubSpot. Otherwise, it's just another tool I have to manage."
                </div>
              </div>
              <div className="flex gap-4 mb-2">
                <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center font-bold">
                  A2
                </div>
                <div className="bg-slate-900 rounded-2xl rounded-tl-none p-4 text-sm text-slate-300 border border-slate-800">
                  <p className="font-semibold text-green-400 mb-1">
                    Persona: Mike, Freelancer
                  </p>
                  "The price is too high for me. I can do most of this manually
                  in Excel."
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
