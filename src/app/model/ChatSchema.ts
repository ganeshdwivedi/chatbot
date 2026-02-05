import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: false,
      ref: "User",
      default: "guest",
    },

    title: {
      type: String,
      required: true,
      default: "New Chat",
    },

    type: {
      type: String,
      enum: ["normal", "interview"],
      default: "normal",
    },

    metadata: {
      field: {
        type: String, // e.g. Frontend, Backend, Full Stack
      },
      designation: {
        type: String, // e.g. Frontend Developer
      },
      role: {
        type: String, // e.g. React Developer
      },
      experience: {
        type: String, // e.g. 0-1, 2-4, 5+ years
      },
      difficulty: {
        type: String,
        enum: ["easy", "medium", "hard"],
        default: "medium",
      },
      startedAt: {
        type: Date,
        default: Date.now,
      },
      completedAt: {
        type: Date,
      },
      status: {
        type: String,
        enum: ["in-progress", "completed", "abandoned"],
        default: "in-progress",
      },
      questionsAsked: {
        type: Number,
        default: 0,
      },
      totalQuestions: {
        type: Number,
        default: 5, // can be 5–10
      },
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Chat || mongoose.model("Chat", chatSchema);
