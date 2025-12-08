import ChatSchema from "@/app/model/ChatSchema";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, context: any) {
  const params = await context?.params;
  const chatId = await params.chatId;

  try {
    if (!chatId) {
      return NextResponse.json(
        { error: "Chat ID is required" },
        { status: 400 }
      );
    }

    const chat = await ChatSchema.findById(chatId);
    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }

    await ChatSchema.findByIdAndDelete(chatId);

    return NextResponse.json(
      { message: "Chat deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
