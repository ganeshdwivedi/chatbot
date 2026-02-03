import React from "react";
import { Globe, MessageSquare, Cpu, Database } from "lucide-react";

const Page = () => {
  return (
    <div className="pt-32 bg-slate-950 pb-20 px-4 animate-in fade-in duration-500">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            From Napkin Sketch to <br />
            Business Plan
          </h1>
          <p className="text-slate-400 text-lg">
            Our process mimics a 3-month accelerator program, condensed into 5
            minutes.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-600 via-blue-600 to-slate-800 hidden md:block"></div>

          <div className="space-y-12 md:space-y-24">
            {[
              {
                step: "01",
                title: "Input Hypothesis",
                text: "Describe your idea in plain English. Include your target audience, revenue model, and any specific concerns you have.",
                align: "left",
                icon: <MessageSquare />,
              },
              {
                step: "02",
                title: "Market Scan",
                text: "Our agents crawl the web for competitors, market trends, and search volume data to establish a baseline.",
                align: "right",
                icon: <Globe />,
              },
              {
                step: "03",
                title: "Logic Stress-Test",
                text: "The AI acts as a 'Devil's Advocate', challenging your assumptions to find holes in your logic before the market does.",
                align: "left",
                icon: <Cpu />,
              },
              {
                step: "04",
                title: "Financial Modeling",
                text: "We generate a preliminary 3-year P&L based on industry benchmarks for CAC, LTV, and Churn.",
                align: "right",
                icon: <Database />,
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`flex flex-col md:flex-row items-center gap-8 ${item.align === "right" ? "md:flex-row-reverse" : ""}`}
              >
                <div
                  className={`flex-1 text-center md:text-${item.align === "left" ? "right" : "left"}`}
                >
                  <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-violet-500/50 transition-colors relative group">
                    <div className="absolute top-4 right-4 text-6xl font-bold text-slate-800 opacity-20 group-hover:text-violet-900 group-hover:opacity-40 transition-colors">
                      {item.step}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-slate-400">{item.text}</p>
                  </div>
                </div>

                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-slate-950 border-4 border-slate-900 shadow-[0_0_20px_rgba(124,58,237,0.3)] flex items-center justify-center text-white bg-gradient-to-br from-violet-600 to-blue-600">
                    {item.icon}
                  </div>
                </div>

                <div className="flex-1 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
