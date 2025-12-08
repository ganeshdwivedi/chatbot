"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Rocket,
  TrendingUp,
  Users,
  X,
  CheckCircle2,
  MoreHorizontal,
  FileText,
  Download,
  Share2,
  Send,
  Bot,
  Activity,
  Lock,
  AlertCircle,
  Lightbulb,
  AlertTriangle,
  TrendingDown,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { sanitizeMarkdown } from "./sanitizeString";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

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
  const [messages, setMessages] = useState<any[]>([]);
  const { register, watch, setValue } = useForm();
  const { input } = watch();
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const { ChatId } = useParams();
  // Simulated Analysis State
  const [metrics, setMetrics] = useState({
    score: 0,
    tam: "$0",
    competitors: 0,
    sentiment: "Neutral",
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (ChatId) {
      getAllMessagesOfChat();
    }
  }, [ChatId]);

  const addMessage = (msg: any) => {
    setMessages((prev: any) => [...(prev || []), msg]);
  };

  // Check if message is a validation report
  const isValidationReport = (text: string) => {
    return text.includes("# Verdict:") && text.includes("## Explanation");
  };

  const getAllMessagesOfChat = async () => {
    try {
      const response = await fetch(`/api/chat/${ChatId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setMessages(data.data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const createChat = async (text: string) => {
    try {
      const res = await fetch("/api/chat/create", {
        method: "POST",
        body: JSON.stringify({ title: text }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json(); // { type: "chatid", id: chatId }

      // Redirect WITHOUT refresh
      if (data?._id) {
        sendMessageToAPI(text, data._id);
        router.push(`/chat/${data._id}`, { scroll: false });
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  // API Integration Function
  const sendMessageToAPI = async (userQuery: string, chatId?: string) => {
    setIsTyping(true);
    setError(null);

    // Create a temporary message ID for the streaming response
    const streamingMessageId = Date.now();

    // Add an empty AI message that we'll update as data streams in

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userQuery,
          chatId: ChatId || chatId,
          // userId: "user_123",
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!response.body) {
        throw new Error("No response body (streaming not supported)");
      }

      addMessage({
        _id: streamingMessageId,
        role: "assistant", // Changed from "type" to "role"
        text: "",
        isValidation: false,
      });
      setIsTyping(false);
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      // Read the stream
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        // Decode the chunk
        const chunk = decoder.decode(value, { stream: true });

        // Split by newlines in case multiple JSON objects come in one chunk
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.trim()) continue;

          try {
            const parsed = JSON.parse(line);

            // Handle content streaming
            if (parsed.type === "content" && parsed.text) {
              accumulatedText += parsed.text;

              updateMessage(streamingMessageId, {
                text: accumulatedText,
              });
            }

            // Handle metrics if your backend sends them
            if (parsed.metrics) {
              setMetrics({
                score: parsed.metrics.score || metrics.score,
                tam: parsed.metrics.tam || metrics.tam,
                competitors: parsed.metrics.competitors || metrics.competitors,
                sentiment: parsed.metrics.sentiment || metrics.sentiment,
              });
            }
          } catch (parseError) {
            console.warn("Failed to parse streaming data:", parseError, line);
          }
        }
      }

      // Final update - check validation status only once at the end
      updateMessage(streamingMessageId, {
        text: accumulatedText,
        isValidation: isValidationReport(accumulatedText),
      });
    } catch (err) {
      console.error("❌ API Error:", err);
      const message =
        err instanceof Error ? err.message : "Unknown error occurred";

      // Update the streaming message with error
      updateMessage(streamingMessageId, {
        text: `Error: ${message}`,
      });

      setError(message);
    } finally {
      setIsTyping(false);
    }
  };

  const updateMessage = (messageId: number, updates: Partial<any>) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg._id === messageId ? { ...msg, ...updates } : msg
      )
    );
  };

  const handleSend = () => {
    if (!input.trim() || isTyping) return;

    const newMsg = { _id: Date.now(), role: "user", text: input };
    addMessage(newMsg);

    const messageToSend = input;
    setValue("input", "");

    if (!ChatId) {
      createChat(messageToSend);
    } else {
      sendMessageToAPI(messageToSend);
    }
  };

  return (
    <>
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
          {/* <div className="flex items-center gap-3">
            <button
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Share"
            >
              <Share2 size={18} />
            </button>
            <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-sm transition-colors border border-slate-700">
              <Download size={16} /> Export Report
            </button>
          </div> */}
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
          {messages?.map((msg: any) => (
            <div
              key={`${msg?._id}`}
              className={`flex gap-4 ${
                msg?.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                  msg?.role === "user"
                    ? "bg-slate-700 text-slate-300"
                    : "bg-gradient-to-br from-violet-600 to-blue-600 text-white"
                }`}
              >
                {msg.role === "user" ? <Users size={16} /> : <Bot size={16} />}
              </div>
              <div
                className={`${
                  msg.isValidation
                    ? "w-full max-w-4xl"
                    : "max-w-[85%] sm:max-w-[75%]"
                } rounded-2xl p-4 sm:p-6 ${
                  msg?.role === "user"
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
              {...register("input", { required: true })}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask follow-up questions about market size, competitors, or pricing..."
              className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl pl-4 pr-12 py-4 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all shadow-lg placeholder:text-slate-500"
              disabled={isTyping}
            />
            <button
              onClick={handleSend}
              disabled={!input?.trim() || isTyping}
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
    </>
  );
};

export default ChatView;
