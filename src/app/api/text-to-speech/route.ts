import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";

// Initialize clients (this happens once per server start)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const geminiModel = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

/**
 * Handles POST requests to the /api/chat endpoint
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Extract the prompt from the request body
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // 2. Get text response from Gemini
    console.log(`Generating content for prompt: ${prompt}`);
    const result = await geminiModel.generateContent(prompt);
    const textResponse = result.response.text();
    console.log(`Received text response: ${textResponse}`);

    // 3. Generate audio from the text response

    // STEP 2: Synthesize speech using the OpenAI TTS API
    console.log(`Synthesizing speech with OpenAI for: ${textResponse}`);
    const ttsResponse = await openai.audio.speech.create({
      model: "tts-1",
      voice: "nova",
      input: textResponse,
    });

    // Convert the audio stream to a Buffer, then to Base64
    const audioBuffer = Buffer.from(await ttsResponse.arrayBuffer());
    const audioBase64 = audioBuffer.toString("base64");

    // Return both the original text and the Base64 audio
    return NextResponse.json({
      text: textResponse,
      audio: audioBase64,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to process the request." },
      { status: 500 }
    );
  }
}
