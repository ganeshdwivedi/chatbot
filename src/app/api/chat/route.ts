import { connectDB } from "@/app/lib/db";
import ChatMessageSchema from "@/app/model/ChatMessageSchema";
import ChatSchema from "@/app/model/ChatSchema";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
connectDB();

export async function POST(req: Request) {
  try {
    const {
      message,
      chatId,
      userId,
      designation,
      role,
      field,
      experience,
      difficulty,
    } = await req.json();

    if (!message) {
      return new Response(
        JSON.stringify({ error: "User message is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    let chat: any = null;
    let isNewChat = false;

    // 🔹 Case 1: Chat already exists → fetch it
    if (chatId) {
      chat = await ChatSchema.findById(chatId);
      if (!chat) {
        return new Response(JSON.stringify({ error: "Chat not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    // 🔹 Case 2: No chatId but we have designation & role → validate for new chat
    if (!chatId && (!designation || !role)) {
      return new Response(
        JSON.stringify({
          error: "Designation and role are required for new interview session.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Get interview metadata
    const interviewField = chat?.metadata?.field || field || role || "General";
    const interviewDesignation =
      chat?.metadata?.designation || designation || "Developer";
    const interviewExperience =
      chat?.metadata?.experience || experience || "2-4 years";
    const interviewDifficulty =
      chat?.metadata?.difficulty || difficulty || "medium";

    // Fetch chat history (if chat exists)
    const chatHistory = chat
      ? await ChatMessageSchema.find({ chatId: chat._id })
          .sort({ createdAt: 1 })
          .limit(50)
      : [];

    // Count questions asked
    const questionsAsked = chatHistory.filter(
      (m) =>
        m.role === "assistant" && !m.content.includes("# Interview Complete"),
    ).length;

    // Determine if interview should end
    const shouldEndInterview = questionsAsked >= 8;

    // Build system instruction
    const systemInstruction = buildInterviewSystemPrompt(
      interviewField,
      interviewDesignation,
      interviewExperience,
      interviewDifficulty,
      questionsAsked,
      shouldEndInterview,
    );

    // Initialize Gemini model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
      ],
    });

    // Format chat history for Gemini
    const formattedHistory = chatHistory.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    // Add current user message
    formattedHistory.push({
      role: "user",
      parts: [{ text: message }],
    });

    // Generate streaming response
    const result = await model.generateContentStream({
      contents: formattedHistory,
      systemInstruction: {
        role: "user",
        parts: [{ text: systemInstruction }],
      },
    });

    let fullResponse = "";
    const encoder = new TextEncoder();

    // 🔥 Create streaming response - NO SAVING UNTIL COMPLETE
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // 🔹 If new chat, create it NOW (before streaming starts)
          if (!chat) {
            chat = await ChatSchema.create({
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
              },
            });
            isNewChat = true;

            console.log("✅ New chat created:", chat._id.toString());
          }

          // 🔥 Stream AI response chunks WITHOUT saving yet
          for await (const chunk of result.stream) {
            const text = chunk.text();
            fullResponse += text;

            // Send chunk to frontend immediately
            const jsonChunk =
              JSON.stringify({
                type: "content",
                text: text,
              }) + "\n";

            controller.enqueue(encoder.encode(jsonChunk));
          }

          console.log("✅ Streaming complete, now saving messages...");

          // 🔹 NOW save everything to database (after streaming is done)

          // Save user message
          await ChatMessageSchema.create({
            chatId: chat._id,
            role: "user",
            content: message,
          });

          // Save AI response
          await ChatMessageSchema.create({
            chatId: chat._id,
            role: "assistant",
            content: fullResponse,
          });

          console.log("✅ Messages saved to database");

          // Check if interview is complete
          const isComplete = fullResponse.includes("# Interview Complete");

          if (isComplete) {
            await ChatSchema.findByIdAndUpdate(chat._id, {
              "metadata.completedAt": new Date(),
              "metadata.status": "completed",
              "metadata.questionsAsked": questionsAsked + 1,
            });
            console.log("✅ Interview marked as complete");
          } else {
            // Update questions asked count
            await ChatSchema.findByIdAndUpdate(chat._id, {
              "metadata.questionsAsked": questionsAsked + 1,
            });
          }

          // Send metadata with chatId (especially important for new chats)
          const metaChunk =
            JSON.stringify({
              type: "metadata",
              chatId: chat._id.toString(),
              isComplete: isComplete,
              questionsAsked: questionsAsked + 1,
              isNewChat: isNewChat,
            }) + "\n";

          controller.enqueue(encoder.encode(metaChunk));
          controller.close();

          console.log("✅ Stream closed successfully");
        } catch (error) {
          console.error("❌ Stream error:", error);
          controller.error(error);
        }
      },
    });

    // Return streaming response
    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (err: any) {
    console.error("❌ Interview API error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const chatId = searchParams.get("chatId");

    // If fetching specific chat messages
    if (chatId) {
      const messages = await ChatMessageSchema.find({ chatId }).sort({
        createdAt: 1,
      });

      const chat = await ChatSchema.findById(chatId);

      return new Response(
        JSON.stringify({
          data: messages,
          metadata: chat?.metadata,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    }

    // If fetching all interviews for a user
    const query: any = { type: "interview" };
    if (userId) {
      query.userId = userId;
    }

    const interviews = await ChatSchema.find(query).sort({ createdAt: -1 });

    if (!interviews || interviews.length === 0) {
      return new Response(
        JSON.stringify({ data: [], message: "No interview sessions found" }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(JSON.stringify({ data: interviews }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("❌ GET Interview error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// Helper function to build the interview system prompt
function buildInterviewSystemPrompt(
  field: string,
  designation: string,
  experience: string,
  difficulty: string,
  questionsAsked: number,
  shouldEndInterview: boolean,
): string {
  if (shouldEndInterview) {
    return `You are an Expert Technical Interviewer. The interview is now complete after ${questionsAsked} questions.

## Final Task: Generate Interview Report

Provide a comprehensive evaluation report in the following Markdown format:

# Interview Complete 🎯

## Overall Performance Summary
[2-3 sentences summarizing the candidate's overall performance]

## Score Breakdown

### Technical Knowledge: [X]/10
[Brief explanation of technical understanding demonstrated]

### Problem-Solving Skills: [X]/10
[Assessment of analytical and problem-solving abilities]

### Communication: [X]/10
[Evaluation of how clearly they explained concepts]

### Practical Experience: [X]/10
[Assessment of real-world application knowledge]

### Overall Score: [X]/10

## Strengths
- [Specific strength 1 with example from interview]
- [Specific strength 2 with example from interview]
- [Specific strength 3 with example from interview]

## Areas for Improvement
- [Specific area 1 with actionable advice]
- [Specific area 2 with actionable advice]
- [Specific area 3 with actionable advice]

## Detailed Question Analysis

### Question 1: [Topic]
**Answer Quality:** [Excellent/Good/Fair/Poor]
**Feedback:** [Specific feedback on this answer]

### Question 2: [Topic]
**Answer Quality:** [Excellent/Good/Fair/Poor]
**Feedback:** [Specific feedback on this answer]

[Continue for all questions asked]

## Hiring Recommendation

**Verdict:** [Strong Hire / Hire / Maybe / No Hire]

**Reasoning:** [2-3 sentences explaining the recommendation based on performance]

## Next Steps
1. [Specific suggestion for candidate improvement]
2. [Resource or topic to study]
3. [Practice recommendation]

---
**Interview Duration:** [Estimate based on question count]
**Position:** ${designation} - ${field}
**Experience Level:** ${experience}

---

Thank you for completing this interview! 🚀`;
  }

  return `You are an Expert Technical Interviewer conducting a ${difficulty} level interview for a **${designation}** position in **${field}** with **${experience}** of experience.

## Your Role & Objectives:
You are a senior technical interviewer at a top tech company. Your goal is to:
1. Assess the candidate's technical knowledge and practical skills
2. Evaluate problem-solving abilities and real-world application
3. Test understanding of current industry trends and best practices
4. Gauge communication skills and clarity of thought

## Interview Structure:
- **Total Questions:** 8-10 questions
- **Current Question:** ${questionsAsked + 1}
- **Interview Style:** Conversational but professional
- **Focus Areas:** 
  - Core technical concepts (30%)
  - Real-world scenarios (30%)
  - Latest trends and tools (20%)
  - Problem-solving (20%)

## Question Guidelines:

### Difficulty Calibration for ${experience}:
${getDifficultyGuidelines(experience, difficulty)}

### Question Categories (Rotate through):
1. **Fundamentals:** Core concepts every ${designation} must know
2. **Scenario-Based:** "How would you handle..." real-world situations
3. **Latest Trends:** Current technologies, frameworks, best practices in ${field}
4. **Problem-Solving:** Technical challenges requiring analytical thinking
5. **System Design:** (if applicable) Architecture and scaling questions
6. **Coding/Technical:** Practical implementation questions

## Response Format:

When evaluating an answer:
1. **Acknowledge** their response (briefly)
2. **Provide feedback** (1-2 sentences on their answer quality)
3. **Ask the next question** immediately

### Example Flow:
"Good explanation of [topic]. You covered [strength] well, though you could have mentioned [gap].

**Question ${questionsAsked + 2}:** [Next question based on performance]"

## Critical Rules:
- ONE question at a time
- Ask follow-up questions if answers are too brief or unclear
- Adjust difficulty based on performance (easier if struggling, harder if excelling)
- Focus on **${field}**-specific knowledge for **${designation}** role
- Include questions about latest 2024-2025 trends and tools
- NO generic questions like "tell me about yourself"
- Make questions specific, practical, and relevant to actual job scenarios

## Real-World Focus Areas for ${field}:
${getFieldSpecificFocus(field, designation)}

## Question Examples for This Level:
${getQuestionExamples(field, designation, experience)}

## After ${questionsAsked >= 8 ? "this" : "8-10"} questions:
${questionsAsked >= 7 ? "⚠️ This is one of the final questions. After this, prepare to conclude the interview." : "Continue asking relevant questions."}

## Tone:
- Professional but friendly
- Encouraging but objective
- Direct and clear
- Avoid overly formal language

---

**Current Context:**
- Position: ${designation}
- Field: ${field}
- Experience: ${experience}
- Question Number: ${questionsAsked + 1}

NOW: Evaluate the candidate's previous answer (if any) and ask the next relevant question. Be specific and practical.`;
}

// Helper functions (keep the same from previous version)
function getDifficultyGuidelines(
  experience: string,
  difficulty: string,
): string {
  const experienceLevel = experience.toLowerCase();
  if (experienceLevel.includes("fresher") || experienceLevel.includes("0-1")) {
    return `- Focus on fundamentals and basic concepts
- Test understanding of core technologies
- Include simple real-world scenarios
- Avoid advanced system design questions`;
  } else if (
    experienceLevel.includes("2-4") ||
    experienceLevel.includes("junior")
  ) {
    return `- Mix of fundamentals and intermediate concepts
- Real-world application scenarios
- Some problem-solving challenges
- Basic system design thinking`;
  } else if (
    experienceLevel.includes("5-7") ||
    experienceLevel.includes("mid")
  ) {
    return `- Advanced technical concepts
- Complex real-world scenarios
- System design and architecture
- Leadership and mentoring aspects`;
  } else {
    return `- Expert-level technical depth
- Large-scale system design
- Strategic technical decisions
- Team leadership and architecture ownership`;
  }
}

function getFieldSpecificFocus(field: string, designation: string): string {
  const fieldLower = field.toLowerCase();
  if (
    fieldLower.includes("frontend") ||
    fieldLower.includes("react") ||
    fieldLower.includes("web")
  ) {
    return `- Modern React patterns (hooks, context, suspense)
- State management (Redux, Zustand, Jotai)
- Performance optimization (code splitting, lazy loading, memoization)
- TypeScript best practices
- Testing (Jest, React Testing Library, Playwright)
- Build tools (Vite, Webpack, Turbopack)
- CSS architectures (Tailwind, CSS-in-JS, CSS Modules)
- Web APIs and browser performance`;
  } else if (
    fieldLower.includes("backend") ||
    fieldLower.includes("node") ||
    fieldLower.includes("api")
  ) {
    return `- RESTful API design and GraphQL
- Database optimization (indexing, query performance)
- Authentication & authorization (JWT, OAuth, RBAC)
- Microservices architecture
- Message queues and event-driven systems
- Caching strategies (Redis, CDN)
- API security and rate limiting
- Scalability and load balancing`;
  } else if (
    fieldLower.includes("fullstack") ||
    fieldLower.includes("full stack")
  ) {
    return `- End-to-end application architecture
- Database design and optimization
- API development and integration
- Frontend frameworks and state management
- DevOps basics (CI/CD, Docker)
- Authentication flows
- Performance optimization (both FE and BE)
- Cloud services (AWS, GCP, Azure)`;
  }
  return `- Core technical concepts in ${field}
- Industry best practices
- Latest tools and frameworks
- Real-world problem-solving`;
}

function getQuestionExamples(
  field: string,
  designation: string,
  experience: string,
): string {
  const fieldLower = field.toLowerCase();
  const expLower = experience.toLowerCase();
  let examples: string[] = [];

  if (fieldLower.includes("frontend") || fieldLower.includes("react")) {
    if (expLower.includes("fresher") || expLower.includes("0-1")) {
      examples = [
        "Explain the Virtual DOM and how React uses it for efficient rendering.",
        "What's the difference between controlled and uncontrolled components?",
        "How would you optimize a React component that's re-rendering too often?",
      ];
    } else if (expLower.includes("2-4")) {
      examples = [
        "Explain how you would implement code splitting in a large React application.",
        "Describe a situation where you optimized a slow-performing React app.",
        "How would you handle state management in a complex application?",
      ];
    } else {
      examples = [
        "Design a scalable micro-frontend architecture for a large e-commerce platform.",
        "How would you implement server-side rendering with streaming in Next.js?",
        "Explain your approach to building a design system across multiple products.",
      ];
    }
  } else if (fieldLower.includes("backend")) {
    if (expLower.includes("fresher") || expLower.includes("0-1")) {
      examples = [
        "Explain the difference between SQL and NoSQL databases.",
        "What is middleware in Express.js and how would you use it?",
        "How do you handle errors in asynchronous Node.js code?",
      ];
    } else if (expLower.includes("2-4")) {
      examples = [
        "Design a RESTful API for a social media application.",
        "How would you implement rate limiting to prevent API abuse?",
        "Explain how you'd optimize a slow database query.",
      ];
    } else {
      examples = [
        "Design a microservices architecture for a payment processing system.",
        "How would you implement distributed transactions across services?",
        "Explain your strategy for zero-downtime database migrations.",
      ];
    }
  }

  return examples.length > 0
    ? `Examples:\n${examples.map((ex, i) => `${i + 1}. ${ex}`).join("\n")}`
    : "Ask relevant questions based on the field and experience level.";
}
