import {
  Video,
  Code,
  Sparkles,
  Briefcase,
  FileText,
  CheckCircle2,
} from "lucide-react";

const FeaturesView = () => {
  const features = [
    {
      icon: <Video />,
      title: "Real-time Feedback",
      desc: "Get instant analysis on your answers, tone, and pacing during mock video or text interviews.",
    },
    {
      icon: <Code />,
      title: "Technical Challenges",
      desc: "Interactive coding environments for engineering roles with AI pair-programming hints.",
    },
    {
      icon: <Sparkles />,
      title: "STAR Method Coach",
      desc: "Learn to structure your stories perfectly using Situation, Task, Action, and Result frameworks.",
    },
    {
      icon: <Briefcase />,
      title: "Role-Specific Logic",
      desc: "Simulations tailored for PMs, Designers, Marketers, and Developers using industry-standard questions.",
    },
    {
      icon: <FileText />,
      title: "Resume Parser",
      desc: "Upload your CV and get questions generated based on your actual experience gaps.",
    },
    {
      icon: <CheckCircle2 />,
      title: "Answer Refinement",
      desc: "The AI suggests 'Better Versions' of your answers to improve clarity and impact.",
    },
  ];

  return (
    <div
      id="features"
      className="pt-32 bg-slate-950 pb-20 px-4 animate-in fade-in duration-500"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-emerald-400 font-medium mb-4 tracking-wider text-sm uppercase">
            Smart Preparation
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Master every stage of <br /> the interview process
          </h1>
          <p className="text-slate-400 text-lg">
            From behavioral screening to technical deep-dives, our AI adapts to
            your specific role and industry.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:bg-slate-800/50 hover:border-emerald-500/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform group-hover:text-emerald-300 group-hover:border-emerald-500/50">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesView;
