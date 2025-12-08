"use client";
import { MoreHorizontal, Trash2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const initialIdea = "New Chat";
const ChatSideBar = () => {
  const [allChats, setAllChats] = useState([]);
  const { ChatId } = useParams();

  useEffect(() => {
    getAllChat();
  }, []);

  const getAllChat = async () => {
    try {
      const response = await fetch(`/api/chat`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setAllChats(data.data);
    } catch (error) {}
  };

  const deleteChat = async (chatId: string) => {
    try {
      const reponse = await fetch(`/api/chat/delete/${chatId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await reponse.json();
      getAllChat();
    } catch (error) {
      console.log("Error deleting chat:", error);
    }
  };

  console.log(allChats, "allChats", ChatId);
  return (
    <div className="hidden lg:flex w-64 flex-col border-r border-slate-800 bg-slate-950/50">
      <div className="p-4 border-b border-slate-800 flex justify-between items-center">
        <h3 className="font-semibold text-slate-200">History</h3>
        <button className="text-slate-400 hover:text-white">
          <MoreHorizontal size={16} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {allChats?.map((chat: { title: string; _id: string }) => (
          <Link href={`/chat/${chat?._id}`} key={chat?._id}>
            <div
              key={chat?._id}
              className={`${
                chat?._id === ChatId ? "border-white" : ""
              } bg-slate-800/40 hover:border-white my-1 text-white p-3 rounded-lg text-sm font-medium cursor-pointer border border-slate-700 relative group`}
            >
              <button
                onClick={() => deleteChat(chat?._id)}
                className="absolute right-2 top-[35%] hidden group-hover:block cursor-pointer z-10"
              >
                <Trash2 size={16} />
              </button>
              {chat?.title
                ? chat?.title.substring(0, 20) + "..."
                : "New Analysis"}
              <div className="text-xs text-slate-500 mt-1">Just now</div>
            </div>
          </Link>
        ))}
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
  );
};

export default ChatSideBar;
