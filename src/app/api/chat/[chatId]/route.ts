import ChatMessageSchema from "@/app/model/ChatMessageSchema";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
  const params = await context?.params;
  const chatId = await params.chatId;

  console.log(chatId, "chatId");
  try {
    if (!chatId) {
      return NextResponse.json(
        { error: "Chat ID is required" },
        { status: 400 },
      );
    }
    const res = await ChatMessageSchema.find({
      chatId,
      type: "interview",
    }).sort({ createdAt: 1 });

    if (res?.length === 0) {
      return NextResponse.json({ error: "No messages found" }, { status: 404 });
    }

    return NextResponse.json({ data: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
