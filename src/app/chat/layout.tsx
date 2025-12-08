import ChatSideBar from "@/components/ChatSideBar";
import ChatView from "@/components/ValidationChat";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen pt-20 bg-slate-950 overflow-hidden animate-in fade-in duration-500">
      {/* Left Sidebar: History */}
      <ChatSideBar />
      {children}
    </div>
  );
};

export default layout;
