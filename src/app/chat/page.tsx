"use client";
import ChatSideBar from "@/components/ChatSideBar";
import ChatView from "@/components/ValidationChat";
import { useSearchParams } from "next/navigation";
import React from "react";

const Page = () => {
  const searchParams = useSearchParams();

  const designation: any = searchParams.get("designation");
  const role: any = searchParams.get("role");
  const field: any = searchParams.get("field");
  const experience: any = searchParams.get("experience");
  const difficulty: any = searchParams.get("difficulty");
  return (
    // <InterviewChat role="junior frontend developer" field="software engineer" />
    // <div className="flex h-screen pt-20 bg-slate-950 overflow-hidden animate-in fade-in duration-500">
    //   {/* Left Sidebar: History */}
    //   <ChatSideBar />
    //   <ChatView />
    // </div>
    // In your page component
    <ChatView
      designation={designation}
      role={role}
      field={field}
      experience={experience}
      difficulty={difficulty}
    />
  );
};

export default Page;
