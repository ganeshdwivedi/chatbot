import { connectDB } from "@/app/lib/db";
import ChatSchema from "@/app/model/ChatSchema";
import { NextResponse } from "next/server";

connectDB();
export async function POST(req: Request) {
  const { title } = await req.json();

  try {
    const chat = await ChatSchema.create({ title });

    return NextResponse.json(chat, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 401 });
  }
}
