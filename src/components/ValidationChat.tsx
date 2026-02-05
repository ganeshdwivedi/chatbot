"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  X,
  CheckCircle2,
  Send,
  Bot,
  AlertCircle,
  User,
  Clock,
  Award,
  TrendingUp,
  MessageSquare,
  FileText,
  Brain,
  Target,
  BarChart3,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { sanitizeMarkdown } from "./sanitizeString";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

// Interview Report Renderer Component (keep the same)
const InterviewReportMarkdown = ({ content }: { content: string }) => {
  const parseInterviewReport = (text: string) => {
    const sections: any = {};
    const lines = text.split("\n");
    sections.isComplete = text.includes("# Interview Complete");
    const overallScoreLine = lines.find((l) =>
      l.includes("### Overall Score:"),
    );
    sections.overallScore = overallScoreLine
      ? overallScoreLine.match(/(\d+\.?\d*)\/10/)?.[1]
      : "0";
    const verdictLine = lines.find((l) => l.includes("**Verdict:**"));
    sections.verdict = verdictLine
      ? verdictLine.replace("**Verdict:**", "").trim()
      : "";
    const technicalLine = lines.find((l) =>
      l.includes("### Technical Knowledge:"),
    );
    const problemSolvingLine = lines.find((l) =>
      l.includes("### Problem-Solving Skills:"),
    );
    const communicationLine = lines.find((l) =>
      l.includes("### Communication:"),
    );
    const experienceLine = lines.find((l) =>
      l.includes("### Practical Experience:"),
    );
    sections.scores = {
      technical: technicalLine?.match(/(\d+\.?\d*)\/10/)?.[1] || "0",
      problemSolving: problemSolvingLine?.match(/(\d+\.?\d*)\/10/)?.[1] || "0",
      communication: communicationLine?.match(/(\d+\.?\d*)\/10/)?.[1] || "0",
      experience: experienceLine?.match(/(\d+\.?\d*)\/10/)?.[1] || "0",
    };
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

  const data = parseInterviewReport(content);

  if (!data.isComplete) {
    return (
      <div className="prose prose-invert prose-sm max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    );
  }

  const getVerdictColor = () => {
    const verdict = data.verdict.toLowerCase();
    if (verdict.includes("strong hire"))
      return {
        bg: "from-emerald-500/10",
        border: "border-emerald-500/30",
        text: "text-emerald-400",
      };
    if (verdict.includes("hire"))
      return {
        bg: "from-green-500/10",
        border: "border-green-500/30",
        text: "text-green-400",
      };
    if (verdict.includes("maybe"))
      return {
        bg: "from-yellow-500/10",
        border: "border-yellow-500/30",
        text: "text-yellow-400",
      };
    return {
      bg: "from-red-500/10",
      border: "border-red-500/30",
      text: "text-red-400",
    };
  };

  const verdictColor = getVerdictColor();

  return (
    <div className="space-y-6 w-full">
      <div className="text-center py-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-500/30 mb-2">
          <Award className="w-5 h-5 text-violet-400" />
          <span className="text-violet-400 font-semibold">
            Interview Complete
          </span>
        </div>
        <h2 className="text-2xl font-bold text-white mt-2">
          Performance Report
        </h2>
      </div>

      <div
        className={`rounded-xl p-6 border-2 bg-gradient-to-br ${verdictColor.bg} ${verdictColor.border}`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-full ${verdictColor.bg} border ${verdictColor.border} flex items-center justify-center`}
            >
              <Award className={`w-6 h-6 ${verdictColor.text}`} />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium mb-1">
                Hiring Recommendation
              </div>
              <h2 className={`text-2xl font-bold ${verdictColor.text}`}>
                {data.verdict}
              </h2>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-400 mb-1">Overall Score</div>
            <div className="text-3xl font-bold text-white">
              {data.overallScore}
              <span className="text-lg text-slate-400">/10</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-4 h-4 text-blue-400" />
            <div className="text-xs text-slate-400">Technical</div>
          </div>
          <div className="text-2xl font-bold text-white">
            {data.scores.technical}
            <span className="text-sm text-slate-400">/10</span>
          </div>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-purple-400" />
            <div className="text-xs text-slate-400">Problem Solving</div>
          </div>
          <div className="text-2xl font-bold text-white">
            {data.scores.problemSolving}
            <span className="text-sm text-slate-400">/10</span>
          </div>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-4 h-4 text-green-400" />
            <div className="text-xs text-slate-400">Communication</div>
          </div>
          <div className="text-2xl font-bold text-white">
            {data.scores.communication}
            <span className="text-sm text-slate-400">/10</span>
          </div>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-orange-400" />
            <div className="text-xs text-slate-400">Experience</div>
          </div>
          <div className="text-2xl font-bold text-white">
            {data.scores.experience}
            <span className="text-sm text-slate-400">/10</span>
          </div>
        </div>
      </div>

      {data.strengths && (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-bold text-slate-200">Strengths</h3>
          </div>
          <div className="space-y-2.5">
            {parseListItems(data.strengths).map((item: any, idx: number) => (
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

      {data.areas_for_improvement && (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-slate-200">
              Areas for Improvement
            </h3>
          </div>
          <div className="space-y-2.5">
            {parseListItems(data.areas_for_improvement).map(
              (item: any, idx: number) => (
                <div key={idx} className="flex gap-2.5 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                  <span className="text-slate-300">
                    {renderTextWithBold(item.content)}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      )}

      {data.next_steps && (
        <div className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 border-2 border-violet-500/30 rounded-xl p-5">
          <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-violet-400" />
            Next Steps
          </h3>
          <div className="space-y-3">
            {parseListItems(data.next_steps).map((item: any, idx: number) => (
              <div
                key={idx}
                className="bg-slate-900/80 border border-slate-700 rounded-lg p-4"
              >
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-400 font-bold text-sm">
                    {idx + 1}
                  </div>
                  <div className="flex-1 text-sm text-slate-300">
                    {renderTextWithBold(item.content)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface ChatViewProps {
  designation?: string;
  role?: string;
  field?: string;
  experience?: string;
  difficulty?: string;
}

const ChatView = ({
  designation,
  role,
  field,
  experience,
  difficulty,
}: ChatViewProps) => {
  const [messages, setMessages] = useState<any[]>([]);
  const { register, watch, setValue } = useForm();
  const { input } = watch();
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [interviewMetadata, setInterviewMetadata] = useState({
    questionsAsked: 0,
    isComplete: false,
  });
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const { ChatId } = useParams();

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

  const isInterviewReport = (text: string) => {
    return text.includes("# Interview Complete");
  };

  const getAllMessagesOfChat = async () => {
    try {
      const response = await fetch(`/api/chat?chatId=${ChatId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setMessages(data.data || []);

      if (data.metadata) {
        setInterviewMetadata({
          questionsAsked: data.metadata.questionsAsked || 0,
          isComplete: data.metadata.status === "completed",
        });
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  const sendMessageToAPI = async (userQuery: string): Promise<void> => {
    setIsTyping(true);
    setError(null);

    const streamingMessageId = Date.now();

    try {
      // Build payload
      const payload: any = {
        message: userQuery,
        chatId: ChatId || null,
        userId: "user_123",
      };

      // Add interview config only for first message (no ChatId)
      if (!ChatId) {
        payload.designation = designation;
        payload.role = role;
        payload.field = field;
        payload.experience = experience;
        payload.difficulty = difficulty;
      }

      console.log("📤 Sending request:", payload);

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`,
        );
      }

      if (!response.body) {
        throw new Error("No response body (streaming not supported)");
      }

      // Add assistant message placeholder
      addMessage({
        _id: streamingMessageId,
        role: "assistant",
        text: "",
        isReport: false,
      });
      setIsTyping(false);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.trim()) continue;

          try {
            const parsed = JSON.parse(line);

            if (parsed.type === "content" && parsed.text) {
              accumulatedText += parsed.text;
              updateMessage(streamingMessageId, {
                text: accumulatedText,
              });
            }

            // Handle metadata
            if (parsed.type === "metadata") {
              console.log("📊 Metadata received:", parsed);

              setInterviewMetadata({
                questionsAsked: parsed.questionsAsked || 0,
                isComplete: parsed.isComplete || false,
              });

              // If new chat, redirect to the chat page
              if (parsed.isNewChat && parsed.chatId && !ChatId) {
                console.log("🔄 Redirecting to:", `/chat/${parsed.chatId}`);
                // Wait a bit for UI to update, then redirect
                setTimeout(() => {
                  router.push(`/chat/${parsed.chatId}`);
                }, 500);
              }
            }
          } catch (parseError) {
            console.warn("Failed to parse streaming data:", parseError, line);
          }
        }
      }

      updateMessage(streamingMessageId, {
        text: accumulatedText,
        isReport: isInterviewReport(accumulatedText),
      });

      console.log("✅ Streaming complete");
    } catch (err) {
      console.error("❌ API Error:", err);
      const message =
        err instanceof Error ? err.message : "Unknown error occurred";

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
        msg._id === messageId ? { ...msg, ...updates } : msg,
      ),
    );
  };

  const handleSend = () => {
    if (!input.trim() || isTyping) return;

    const newMsg = { _id: Date.now(), role: "user", text: input };
    addMessage(newMsg);

    const messageToSend = input;
    setValue("input", "");

    sendMessageToAPI(messageToSend);
  };

  return (
    <div className="flex-1 flex flex-col relative bg-slate-950">
      {/* Chat Header */}
      <div className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-950/80 backdrop-blur-sm z-10">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-white">
            {designation ? `${designation} Interview` : "Technical Interview"}
          </span>
          {!interviewMetadata.isComplete ? (
            <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 text-xs font-medium border border-green-500/20 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              In Progress
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Completed
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          {!interviewMetadata.isComplete && (
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Clock className="w-4 h-4" />
              <span>Question {interviewMetadata.questionsAsked}/10</span>
            </div>
          )}
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
              {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div
              className={`${
                msg.isReport ? "w-full max-w-4xl" : "max-w-[85%] sm:max-w-[75%]"
              } rounded-2xl p-4 sm:p-6 ${
                msg?.role === "user"
                  ? "bg-slate-800 text-slate-200 rounded-tr-sm"
                  : "bg-slate-900/50 border border-slate-800 text-slate-300 rounded-tl-sm"
              }`}
            >
              {msg.isReport ? (
                <InterviewReportMarkdown content={msg.text} />
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
        {interviewMetadata.isComplete ? (
          <div className="max-w-4xl mx-auto text-center py-4">
            <div className="flex items-center justify-center gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <p className="text-slate-300 font-medium">
                Interview completed! Review your results above.
              </p>
            </div>
            <button
              onClick={() => router.push("/chat")}
              className="px-6 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg transition-colors"
            >
              Start New Interview
            </button>
          </div>
        ) : (
          <>
            <div className="max-w-4xl mx-auto relative">
              <input
                type="text"
                {...register("input", { required: true })}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your answer here..."
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
                Answer thoughtfully and explain your reasoning clearly.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatView;
