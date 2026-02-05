"use client";
import ChatSideBar from "@/components/ChatSideBar";
import ChatView from "@/components/ValidationChat";
import { MoreHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React from "react";

const initialIdea = "NewChat  ";
const page = () => {
  const searchParams = useSearchParams();

  const designation: any = searchParams.get("designation");
  const role: any = searchParams.get("role");
  const field: any = searchParams.get("field");
  const experience: any = searchParams.get("experience");
  const difficulty: any = searchParams.get("difficulty");
  return (
    <ChatView
      designation={designation}
      role={role}
      field={field}
      experience={experience}
      difficulty={difficulty}
    />
  );
};

export default page;
