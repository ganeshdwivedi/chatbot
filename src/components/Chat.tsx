"use client";
import { Button, Card, Input, Space } from "antd";
import { ArrowLeft, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function InterviewChat({
  field,
  role,
}: {
  field: string;
  role: string;
}) {
  const router = useRouter();
  const [messages, setMessages] = useState<
    { role: "user" | "model"; content: string }[]
  >([]);
  const [input, setInput] = useState("");

  async function sendMessage() {
    if (!input.trim()) return;
    const userMessage = { role: "user" as "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages, field, role }),
    });

    console.log(res, "res");

    const data = await res.json();
    console.log(data, "data");
    setMessages([...newMessages, { role: "model", content: data.message }]);
  }

  return (
    // <Card>
    //   <div className="p-4 max-w-lg mx-auto">
    //     <div className="border rounded p-4 h-80 overflow-y-auto bg-white">
    //       {messages.map((m, i) => (
    //         <div
    //           key={i}
    //           className={m.role === "user" ? "text-right" : "text-left"}
    //         >
    //           <p
    //             className={
    //               m.role === "user"
    //                 ? "bg-blue-200 p-2 rounded"
    //                 : "bg-gray-200 p-2 rounded"
    //             }
    //           >
    //             {m.content}
    //           </p>
    //         </div>
    //       ))}
    //     </div>

    //     <div className="flex mt-2">
    //       <input
    //         value={input}
    //         onChange={(e) => setInput(e.target.value)}
    //         className="flex-1 border p-2 rounded-l"
    //         placeholder="Type your answer..."
    //       />
    //       <button
    //         onClick={sendMessage}
    //         className="bg-blue-500 text-white px-4 rounded-r"
    //       >
    //         Send
    //       </button>
    //     </div>
    //   </div>
    // </Card>

    <div className="h-screen w-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-md z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Button
            onClick={() => router.back()}
            type="text"
            className="flex items-center !text-indigo-600 hover:!text-indigo-800"
          >
            <ArrowLeft className="h-6 w-6 mr-2" />
            Back to Home
          </Button>
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-900">
              AI Interview Coach
            </h1>
            <p className="text-sm text-green-500 flex items-center justify-center">
              <span className="h-2 w-2 bg-green-500 rounded-full mr-1.5"></span>
              Online
            </p>
          </div>
          <div className="w-24"></div> {/* Spacer */}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex flex-col space-y-4">
          {messages.map((msg, index: number) => (
            <div
              key={index}
              className={`flex items-end ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "model" && (
                <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold mr-3 flex-shrink-0">
                  AI
                </div>
              )}
              <div
                className={`max-w-lg px-4 py-3 rounded-2xl shadow ${
                  msg.role === "user"
                    ? "bg-indigo-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {/* <div ref={messagesEndRef} /> */}
        </div>
      </main>

      <footer className="bg-white border-t p-4">
        <div className="!w-full flex gap-5 items-center">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onPressEnter={() => {
              if (input.trim()) sendMessage();
            }}
            placeholder="Type your answer..."
            className="flex-1 w-full !px-4 !py-3 border border-gray-300 !rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
          />
          <Button type="primary" icon={<Send />} onClick={sendMessage} />
        </div>
      </footer>
    </div>
  );
}
