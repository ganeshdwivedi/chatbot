"use client";
import { Activity, FileText, Lock } from "lucide-react";
import React, { useState } from "react";

const RightSideBar = () => {
  const [metrics, setMetrics] = useState({
    score: 0,
    tam: "$0",
    competitors: 0,
    sentiment: "Neutral",
  });
  return (
    <div className="hidden xl:flex w-80 flex-col border-l border-slate-800 bg-slate-950/50 p-6 space-y-6">
      <div>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
          Live Context
        </h3>

        <div className="space-y-4">
          {/* Score Card */}
          <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 relative overflow-hidden">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm text-slate-400 font-medium">
                Viability Score
              </span>
              <Activity size={16} className="text-violet-500" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">
                {metrics.score}
              </span>
              <span className="text-sm text-slate-500">/100</span>
            </div>
            <div className="mt-2 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-violet-600 to-blue-500 h-full transition-all duration-1000"
                style={{ width: `${metrics.score}%` }}
              ></div>
            </div>
          </div>

          {/* Metric Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-900 rounded-xl p-3 border border-slate-800">
              <div className="text-xs text-slate-500 mb-1">Est. TAM</div>
              <div className="text-lg font-semibold text-white">
                {metrics?.tam}
              </div>
            </div>
            <div className="bg-slate-900 rounded-xl p-3 border border-slate-800">
              <div className="text-xs text-slate-500 mb-1">Competitors</div>
              <div className="text-lg font-semibold text-white">
                {metrics.competitors}
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
            <div className="text-sm text-slate-400 font-medium mb-3">
              Detected Categories
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 rounded-md bg-slate-800 text-xs text-slate-300 border border-slate-700">
                SaaS
              </span>
              <span className="px-2 py-1 rounded-md bg-slate-800 text-xs text-slate-300 border border-slate-700">
                B2C
              </span>
              <span className="px-2 py-1 rounded-md bg-slate-800 text-xs text-slate-300 border border-slate-700">
                Gig Economy
              </span>
            </div>
          </div>

          <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
            <div className="flex justify-between items-center mb-3">
              <div className="text-sm text-slate-400 font-medium">
                Files Generated
              </div>
              <FileText size={14} className="text-slate-500" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-300 p-2 hover:bg-slate-800 rounded cursor-pointer transition-colors">
                <Lock size={12} className="text-violet-400" />{" "}
                Business_Plan_Draft.pdf
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300 p-2 hover:bg-slate-800 rounded cursor-pointer transition-colors">
                <Lock size={12} className="text-violet-400" />{" "}
                Financial_Model.xlsx
              </div>
            </div>
            <button className="w-full mt-3 py-2 text-xs font-medium text-violet-400 bg-violet-500/10 hover:bg-violet-500/20 rounded-lg transition-colors">
              Upgrade to Unlock
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;
