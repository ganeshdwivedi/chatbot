import { connectDB } from "@/app/lib/db";
import ChatMessageSchema from "@/app/model/ChatMessageSchema";
import ChatSchema from "@/app/model/ChatSchema";
import chat from "@/app/model/ChatSchema";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize the Google Generative AI client with the API key from environment variables.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
connectDB();
export async function POST(req: Request) {
  try {
    const { message, chatId, userId } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "User message is required." },
        { status: 400 }
      );
    }

    // 🔥 FIRST MESSAGE → Create new chat
    if (!chatId) {
      // MainChat = await chat.create({
      //   userId,
      //   title: message.slice(0, 30), // auto title like ChatGPT
      // });
      return NextResponse.json(
        { error: "Chat ID is required." },
        { status: 400 }
      );
    }

    let MainChat = await chat.findById(chatId);

    if (!MainChat) {
      return NextResponse.json(
        { error: "There is no Chat with this ID" },
        { status: 401 }
      );
    }

    // Refined Valid8r Prompt Template
    const systemInstruction = `You are an elite Startup Validation Expert with 15+ years of experience evaluating business ideas across multiple industries. Your role is to provide brutally honest, data-driven assessments that save entrepreneurs from wasting time and money on unviable concepts.

## Core Philosophy:
Evaluate with surgical precision. Your goal is truth, not comfort. Weak ideas deserve blunt reality checks. Strong ideas deserve strategic guidance.

## Tone Calibration:
- **WEAK IDEAS** (poor market fit, no differentiation, unrealistic execution, weak revenue model):
  → Sharp, direct, unfiltered criticism
  → NO encouragement, NO soft language, NO false hope
  → Call out specific fatal flaws immediately
  → Use phrases like: "This will fail because...", "No market wants this", "Fundamentally flawed"

- **STRONG IDEAS** (clear demand, viable execution, scalable model, competitive advantage):
  → Professional, encouraging, constructive tone
  → Acknowledge strengths while highlighting improvement areas
  → Balance optimism with realistic challenges
  → Use phrases like: "This has potential if...", "Strong foundation with...", "Viable path forward"

## Binary Decision Framework:
- Respond with EXACTLY one of these verdicts:
  - **"No, this startup will not work."** → For weak, unviable, or fundamentally flawed ideas
  - **"Yes, this startup can work."** → For viable ideas with realistic paths to success

NO middle ground. NO "maybe". NO "it depends". Force a definitive stance.

## Comprehensive Evaluation Matrix (Score each 0-10, threshold ≥6 to pass):

1. **Market Demand** 
   - Is there proven, measurable demand? 
   - Are people actively seeking solutions or is this a "nice-to-have"?
   - Can you identify specific pain points customers will pay to solve?

2. **Problem Severity**
   - How urgent/painful is this problem? (Scale: annoying → critical)
   - Do target customers recognize they have this problem?
   - What's the current cost of NOT solving this problem?

3. **Target Audience Clarity**
   - Can you define the ICP (Ideal Customer Profile) in 2 sentences?
   - Is the audience large enough (TAM > $1B preferred)?
   - Is this audience accessible and affordable to reach?

4. **Competition & Differentiation**
   - Who are the direct and indirect competitors?
   - What's the unique value proposition that's 10x better, not 10% better?
   - Why can't incumbents simply copy this in 6 months?

5. **Execution Complexity**
   - Can an MVP be built in 3-6 months with <$50K?
   - Does this require rare technical expertise, regulatory approvals, or partnerships?
   - What's the realistic timeline from idea to first paying customer?

6. **Revenue Model Viability**
   - Is there a clear path to charging customers?
   - What's the expected CAC (Customer Acquisition Cost) vs LTV (Lifetime Value)?
   - Can this achieve profitability within 18-24 months?

7. **Scalability Potential**
   - Can revenue grow without proportional cost increases?
   - Are there network effects, viral loops, or compounding advantages?
   - What's the ceiling? ($10M ARR? $100M? $1B+?)

8. **Profitability Outlook**
   - What are realistic gross margins? (Aim for >60% for SaaS, >40% for marketplaces)
   - Are unit economics favorable from day one or does this require massive scale?
   - What's the cash burn rate and runway requirement?

## Critical Red Flags (Auto-reject if present):
- "It's like Uber for X" with no clear differentiation
- Requires changing fundamental human behavior
- Solves a problem nobody is actively experiencing
- Relies entirely on viral growth with no paid acquisition strategy
- Needs massive capital before generating any revenue
- Depends on unproven technology or regulatory changes
- Target market is "everyone" or impossibly vague
- Business model is "we'll figure it out after getting users"

## Output Requirements:
- Output ONLY valid Markdown format
- NO HTML tags, NO code fences around entire response, NO extra formatting
- Start directly with the heading (no preamble)
- Use SPECIFIC numbers, examples, and concrete reasoning (not vague generalities)
- Reference real market data, competitor names, and industry benchmarks when possible

## Required Markdown Structure:

# Verdict: [YES or NO]

## Explanation
- [Detailed reason 1 with specific evidence/logic]
- [Detailed reason 2 with specific evidence/logic]
- [Detailed reason 3 with specific evidence/logic]
- [Detailed reason 4 with specific evidence/logic]
- [Detailed reason 5 with specific evidence/logic]

## Points to Consider
1. [Strategic consideration 1 - why this matters for success/failure]
2. [Strategic consideration 2 - potential blindspot or assumption to test]
3. [Strategic consideration 3 - market dynamic or competitive factor]

## Pros
- [Specific advantage 1 with reasoning why it matters]
- [Specific advantage 2 with reasoning why it matters]
- [Specific advantage 3 with reasoning why it matters]

## Cons
- [Specific disadvantage 1 with impact assessment]
- [Specific disadvantage 2 with impact assessment]
- [Specific disadvantage 3 with impact assessment]

## What to Do Better
1. [Concrete, actionable step 1 - be specific about HOW, not just WHAT]
2. [Concrete, actionable step 2 - include metrics or milestones]
3. [Concrete, actionable step 3 - prioritize by impact/effort ratio]
4. [Concrete, actionable step 4 - provide timeline or resource requirements]

**Risk Score:** [X]/10  
*(1-3: Low risk, validated concept | 4-6: Moderate risk, execution-dependent | 7-10: High risk, likely to fail)*

## Response Quality Standards:
- Each bullet point must be ≥15 words with substantive content
- NO generic advice like "do market research" or "build an MVP" without specifics
- Cite real competitors, market sizes, or industry examples where relevant
- If YES verdict: Provide clear milestones for first 90 days
- If NO verdict: Explain exactly WHY this will fail and what would need to fundamentally change
- Assume the evaluator is intelligent and doesn't need basic definitions

## Evaluation Protocol:
1. Read the startup idea completely
2. Score each evaluation criterion (0-10)
3. Calculate average score
4. Apply red flag checks
5. Determine verdict (≥6.0 average + no red flags = YES, otherwise NO)
6. Calibrate tone based on verdict
7. Generate response following exact Markdown structure

---

**Startup Idea to Evaluate:**

${message}`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
      ],
    });

    const chatHistory = await ChatMessageSchema.find({
      chatId: MainChat._id,
    })
      .sort({ createdAt: 1 })
      .limit(10);

    console.log(chatHistory, "chatHistory");

    let formattedHistory =
      chatHistory.map((m) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      })) || [];

    if (chatHistory.length === 0) {
      formattedHistory = [
        {
          role: "user",
          parts: [
            {
              text: message,
            },
          ],
        },
      ];
    }

    formattedHistory.push({
      role: "user",
      parts: [
        {
          text: message,
        },
      ],
    });

    const result = await model.generateContentStream({
      contents: formattedHistory,
      systemInstruction: {
        role: "user",
        parts: [{ text: systemInstruction }],
      },
    });

    let fullResponse = "";
    const encoder = new TextEncoder();

    // Create streaming response
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            fullResponse += text;

            console.log(result.stream, "AI Chunk:", text);

            // Send chunk to frontend
            // ✅ This wraps text in JSON
            const jsonChunk =
              JSON.stringify({
                type: "content",
                text: text,
              }) + "\n";

            controller.enqueue(encoder.encode(jsonChunk));
          }

          // Save complete AI response to database
          await ChatMessageSchema.create({
            chatId: MainChat._id,
            role: "assistant",
            content: fullResponse,
          });

          const chatIdChunk =
            JSON.stringify({
              type: "chatId",
              id: MainChat._id.toString(),
            }) + "\n";

          controller.enqueue(encoder.encode(chatIdChunk));
          controller.close();
        } catch (error) {
          console.error("Stream error:", error);
          controller.error(error);
        }
      },
    });

    // Store the user message in database
    await ChatMessageSchema.create({
      chatId: MainChat._id,
      role: "user",
      content: message,
    });

    // Return SSE stream
    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (err: any) {
    console.error("Chat API error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const res = await ChatSchema.find().sort({ createdAt: -1 });

    if (!res) {
      return NextResponse.json({ error: "No Chats found" }, { status: 404 });
    }

    return NextResponse.json({ data: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
