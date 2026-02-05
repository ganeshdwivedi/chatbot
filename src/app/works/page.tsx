import { Briefcase, MessageSquare, Activity, Award } from "lucide-react";

const HowItWorksView = () => {
  const steps = [
    {
      step: "01",
      title: "Select Your Target",
      text: "Paste a job description or choose a standard role (e.g., 'Google - Product Manager').",
      align: "left",
      icon: <Briefcase />,
    },
    {
      step: "02",
      title: "The Mock Interview",
      text: "Engage in a dynamic chat or voice session. The AI adapts follow-up questions based on your answers.",
      align: "right",
      icon: <MessageSquare />,
    },
    {
      step: "03",
      title: "Instant Analysis",
      text: "Receive granular scores on Confidence, Clarity, and Technical Accuracy after every response.",
      align: "left",
      icon: <Activity />,
    },
    {
      step: "04",
      title: "Review & Improve",
      text: "See 'Gold Standard' answer examples and track your improvement over time.",
      align: "right",
      icon: <Award />,
    },
  ];

  return (
    <div
      id="how-it-works"
      className="pt-32 bg-slate-950 pb-20 px-4 animate-in fade-in duration-500"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Your personal interview <br /> bootcamp
          </h1>
          <p className="text-slate-400 text-lg">
            Simulate the pressure of the real thing in a safe environment.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-cyan-500 to-slate-800 hidden md:block" />

          <div className="space-y-12 md:space-y-24">
            {steps.map((item, index) => {
              const isRight = item.align === "right";

              return (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    isRight ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`flex-1 text-center ${
                      isRight ? "md:text-left" : "md:text-right"
                    }`}
                  >
                    <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-emerald-500/50 transition-colors relative group">
                      <div className="absolute top-4 right-4 text-6xl font-bold text-slate-800 opacity-20 group-hover:text-emerald-900 group-hover:opacity-40 transition-colors">
                        {item.step}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {item.title}
                      </h3>
                      <p className="text-slate-400">{item.text}</p>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 rounded-full border-4 border-slate-900 shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center text-white bg-gradient-to-br from-emerald-500 to-cyan-500">
                      {item.icon}
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="flex-1 hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksView;
