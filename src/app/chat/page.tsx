"use client";
import ChatView from "@/components/ValidationChat";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const Page = () => {
  const [params, setParams] = useState({
    designation: "",
    role: "",
    field: "",
    experience: "",
    difficulty: "",
  });
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    setParams({
      designation: urlParams.get("designation") || "",
      role: urlParams.get("role") || "",
      field: urlParams.get("field") || "",
      experience: urlParams.get("experience") || "",
      difficulty: urlParams.get("difficulty") || "",
    });
  }, []);
  return (
    <Suspense fallback={<div>Loading chat...</div>}>
      <ChatView
        designation={params?.designation}
        role={params?.role}
        field={params?.field}
        experience={params?.experience}
        difficulty={params?.difficulty}
      />
    </Suspense>
  );
};

export default Page;
