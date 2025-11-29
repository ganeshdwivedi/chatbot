"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Rocket,
  BarChart2,
  Target,
  ShieldCheck,
  Zap,
  TrendingUp,
  Users,
  Menu,
  X,
  ArrowRight,
  CheckCircle2,
  Search,
  BrainCircuit,
  Globe,
  MessageSquare,
  MoreHorizontal,
  FileText,
  Download,
  Share2,
  Send,
  Bot,
  ChevronRight,
  PieChart,
  Activity,
  Lock,
  AlertCircle,
  Lightbulb,
  AlertTriangle,
  TrendingDown,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { sanitizeMarkdown } from "./sanitizeString";

// Custom Markdown Renderer Component
const ValidationMarkdown = ({ content }: { content: string }) => {
  const parseValidationMarkdown = (text: string) => {
    const sections: any = {};
    const lines = text.split("\n");

    // Extract verdict
    const verdictLine = lines.find((l) => l.startsWith("# Verdict:"));
    sections.verdict = verdictLine
      ? verdictLine.replace("# Verdict:", "").trim()
      : "";
    sections.isPositive = sections.verdict.toLowerCase().includes("yes");

    // Extract risk score
    const riskLine = lines.find((l) => l.includes("**Risk Score:**"));
    sections.riskScore = riskLine ? riskLine.match(/(\d+)\/10/)?.[1] : "0";

    // Extract sections
    let currentSection = "";
    let currentContent: string[] = [];

    lines.forEach((line) => {
      if (line.startsWith("## ")) {
        if (currentSection) {
          sections[currentSection.toLowerCase().replace(/\s+/g, "_")] =
            currentContent;
        }
        currentSection = line.replace("## ", "").trim();
        currentContent = [];
      } else if (line.trim() && !line.startsWith("#")) {
        currentContent.push(line);
      }
    });

    if (currentSection) {
      sections[currentSection.toLowerCase().replace(/\s+/g, "_")] =
        currentContent;
    }

    return sections;
  };

  const parseListItems = (items: string[]) => {
    return items
      .filter((item) => item.trim())
      .map((item) => {
        const cleaned = item.replace(/^[-*]\s+/, "").replace(/^\d+\.\s+/, "");
        const boldMatch = cleaned.match(/\*\*(.*?)\*\*:\s*(.*)/);
        if (boldMatch) {
          return { title: boldMatch[1], content: boldMatch[2], hasBold: true };
        }
        return { title: null, content: cleaned, hasBold: false };
      });
  };

  // Function to render text with bold markdown
  const renderTextWithBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={idx} className="font-semibold text-slate-100">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  const data = parseValidationMarkdown(content);

  return (
    <div className="space-y-6 w-full">
      {/* Verdict Header */}
      <div
        className={`rounded-xl p-6 border-2 ${
          data.isPositive
            ? "bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/30"
            : "bg-gradient-to-br from-red-500/10 to-rose-500/10 border-red-500/30"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            {data.isPositive ? (
              <CheckCircle2
                className="w-8 h-8 text-emerald-400 flex-shrink-0"
                strokeWidth={2.5}
              />
            ) : (
              <AlertCircle
                className="w-8 h-8 text-red-400 flex-shrink-0"
                strokeWidth={2.5}
              />
            )}
            <div>
              <div className="text-xs text-slate-400 font-medium mb-1">
                Verdict
              </div>
              <h2
                className={`text-2xl font-bold ${
                  data.isPositive ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {data.verdict}
              </h2>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-400 mb-1">Risk Score</div>
            <div className="text-3xl font-bold text-white">
              {data.riskScore}
              <span className="text-lg text-slate-400">/10</span>
            </div>
          </div>
        </div>
      </div>

      {/* Explanation */}
      {data.explanation && (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-slate-200">Explanation</h3>
          </div>
          <div className="space-y-3">
            {parseListItems(data.explanation).map((item: any, idx: number) => (
              <div key={idx} className="flex gap-3 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                <div className="text-slate-300">
                  {item.hasBold && item.title ? (
                    <>
                      <span className="font-semibold text-slate-100">
                        {item.title}:
                      </span>{" "}
                      {renderTextWithBold(item.content)}
                    </>
                  ) : (
                    renderTextWithBold(item.content)
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Points to Consider */}
      {data.points_to_consider && (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-bold text-slate-200">
              Points to Consider
            </h3>
          </div>
          <div className="space-y-3">
            {parseListItems(data.points_to_consider).map(
              (item: any, idx: number) => (
                <div key={idx} className="flex gap-3 text-sm">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-semibold text-xs">
                    {idx + 1}
                  </div>
                  <div className="flex-1 text-slate-300">
                    {item.hasBold && item.title ? (
                      <>
                        <span className="font-semibold text-slate-100">
                          {item.title}:
                        </span>{" "}
                        {renderTextWithBold(item.content)}
                      </>
                    ) : (
                      renderTextWithBold(item.content)
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* Pros and Cons Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Pros */}
        {data.pros && (
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-bold text-slate-200">Pros</h3>
            </div>
            <div className="space-y-2.5">
              {parseListItems(data.pros).map((item: any, idx: number) => (
                <div key={idx} className="flex gap-2.5 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                  <span className="text-slate-300">
                    {renderTextWithBold(item.content)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cons */}
        {data.cons && (
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingDown className="w-5 h-5 text-red-400" />
              <h3 className="text-lg font-bold text-slate-200">Cons</h3>
            </div>
            <div className="space-y-2.5">
              {parseListItems(data.cons).map((item: any, idx: number) => (
                <div key={idx} className="flex gap-2.5 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                  <span className="text-slate-300">
                    {renderTextWithBold(item.content)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* What to Do Better */}
      {data.what_to_do_better && (
        <div className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 border-2 border-violet-500/30 rounded-xl p-5">
          <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
            <Rocket className="w-5 h-5 text-violet-400" />
            What to Do Better
          </h3>
          <div className="space-y-3">
            {parseListItems(data.what_to_do_better).map(
              (item: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-slate-900/80 border border-slate-700 rounded-lg p-4"
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-400 font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div className="flex-1 text-sm text-slate-300">
                      {item.hasBold && item.title ? (
                        <>
                          <div className="font-semibold text-slate-100 mb-1">
                            {item.title}
                          </div>
                          <p>{renderTextWithBold(item.content)}</p>
                        </>
                      ) : (
                        <p>{renderTextWithBold(item.content)}</p>
                      )}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const ChatView = ({ initialIdea }: any) => {
  const [messages, setMessages] = useState<any[]>([
    {
      id: 1,
      type: "ai",
      text: "Hello! I'm Valid8r. What startup idea would you like to stress-test today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Simulated Analysis State
  const [metrics, setMetrics] = useState({
    score: 0,
    tam: "$0",
    competitors: 0,
    sentiment: "Neutral",
  });

  useEffect(() => {
    if (initialIdea) {
      addMessage({
        id: 1,
        type: "user",
        text: `Validate my idea: ${initialIdea}`,
      });
      sendMessageToAPI(initialIdea);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const addMessage = (msg: any) => {
    setMessages((prev: any) => [...prev, msg]);
  };

  // Check if message is a validation report
  const isValidationReport = (text: string) => {
    return text.includes("# Verdict:") && text.includes("## Explanation");
  };

  // API Integration Function
  const sendMessageToAPI = async (userQuery: string) => {
    setIsTyping(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userQuery,
          conversationHistory: messages.map((m) => ({
            id: m.id,
            type: m.type,
            text: m.text,
          })),
          context: {
            initialIdea: initialIdea || null,
            currentMetrics: metrics,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // update metrics if any
      if (data.metrics) {
        setMetrics({
          score: data.metrics.score || metrics.score,
          tam: data.metrics.tam || metrics.tam,
          competitors: data.metrics.competitors || metrics.competitors,
          sentiment: data.metrics.sentiment || metrics.sentiment,
        });
      }

      const aiRawText = data.message;

      addMessage({
        id: Date.now(),
        type: "ai",
        text: aiRawText,
        isValidation: isValidationReport(aiRawText),
      });
    } catch (err) {
      console.error("API Error:", err);
      const message =
        err instanceof Error ? err.message : "Unknown error occurred";

      addMessage({
        id: Date.now(),
        type: "ai",
        text: `Error: ${message}`,
      });

      setError(message);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = () => {
    if (!input.trim() || isTyping) return;

    const newMsg = { id: Date.now(), type: "user", text: input };
    addMessage(newMsg);

    const messageToSend = input;
    setInput("");

    sendMessageToAPI(messageToSend);
  };

  return (
    <div className="flex h-screen pt-20 bg-slate-950 overflow-hidden animate-in fade-in duration-500">
      {/* Left Sidebar: History */}
      <div className="hidden lg:flex w-64 flex-col border-r border-slate-800 bg-slate-950/50">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center">
          <h3 className="font-semibold text-slate-200">History</h3>
          <button className="text-slate-400 hover:text-white">
            <MoreHorizontal size={16} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          <div className="bg-slate-800/40 text-white p-3 rounded-lg text-sm font-medium cursor-pointer border border-slate-700">
            {initialIdea
              ? initialIdea.substring(0, 20) + "..."
              : "New Analysis"}
            <div className="text-xs text-slate-500 mt-1">Just now</div>
          </div>
        </div>
        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-violet-400 transition-colors w-full">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-blue-500 flex items-center justify-center text-white font-bold">
              G
            </div>
            <span>Guest</span>
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative bg-slate-950">
        {/* Chat Header */}
        <div className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-950/80 backdrop-blur-sm z-10">
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold text-white">
              {initialIdea ? "Validating Idea" : "New Validation"}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 text-xs font-medium border border-green-500/20 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>{" "}
              Live Agent
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Share"
            >
              <Share2 size={18} />
            </button>
            <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-sm transition-colors border border-slate-700">
              <Download size={16} /> Export Report
            </button>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="text-red-300 hover:text-red-200"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {messages.map((msg: any) => (
            <div
              key={msg.id}
              className={`flex gap-4 ${
                msg.type === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                  msg?.type === "user"
                    ? "bg-slate-700 text-slate-300"
                    : "bg-gradient-to-br from-violet-600 to-blue-600 text-white"
                }`}
              >
                {msg.type === "user" ? <Users size={16} /> : <Bot size={16} />}
              </div>
              <div
                className={`${
                  msg.isValidation
                    ? "w-full max-w-4xl"
                    : "max-w-[85%] sm:max-w-[75%]"
                } rounded-2xl p-4 sm:p-6 ${
                  msg.type === "user"
                    ? "bg-slate-800 text-slate-200 rounded-tr-sm"
                    : "bg-slate-900/50 border border-slate-800 text-slate-300 rounded-tl-sm"
                }`}
              >
                {msg.isValidation ? (
                  <ValidationMarkdown content={msg.text} />
                ) : msg.content ? (
                  <ReactMarkdown>{sanitizeMarkdown(msg.content)}</ReactMarkdown>
                ) : (
                  <div className="text-slate-300 whitespace-pre-wrap">
                    {msg.text}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 text-white flex items-center justify-center animate-pulse">
                <Bot size={16} />
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl rounded-tl-sm p-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></span>
                <span
                  className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></span>
                <span
                  className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-slate-800 bg-slate-950">
          <div className="max-w-4xl mx-auto relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask follow-up questions about market size, competitors, or pricing..."
              className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl pl-4 pr-12 py-4 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all shadow-lg placeholder:text-slate-500"
              disabled={isTyping}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="absolute right-2 top-2 p-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
            </button>
          </div>
          <div className="text-center mt-2">
            <p className="text-xs text-slate-600">
              Valid8r can make mistakes. Review generated financial models
              carefully.
            </p>
          </div>
        </div>
      </div>

      {/* Right Sidebar: Context & Metrics */}
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
                  {metrics.tam}
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
    </div>
  );
};

export default ChatView;
