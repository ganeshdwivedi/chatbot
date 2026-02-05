import { connectDB } from "@/app/lib/db";
import ChatSchema from "@/app/model/ChatSchema";
import { NextResponse } from "next/server";

connectDB();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      userId,
      designation,
      role,
      field,
      experience,
      difficulty,
      totalQuestions,
    } = body;

    // Basic validation
    if (!designation || !role) {
      return NextResponse.json(
        { message: "Designation and role are required" },
        { status: 400 },
      );
    }

    const chat = await ChatSchema.create({
      userId: userId || "guest",
      title: `${designation} Interview - ${role}`,
      type: "interview",
      metadata: {
        field: field || role,
        designation,
        role,
        experience: experience || "2-4 years",
        difficulty: difficulty || "medium",
        startedAt: new Date(),
        status: "in-progress",
        questionsAsked: 0,
        totalQuestions: totalQuestions || 5, // configurable (5–10)
      },
    });

    return NextResponse.json(chat, { status: 201 });
  } catch (error: any) {
    console.error("Create Chat Error:", error);

    return NextResponse.json(
      { message: "Failed to create chat", error: error.message },
      { status: 500 },
    );
  }
}
