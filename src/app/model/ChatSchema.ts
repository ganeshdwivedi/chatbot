import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  userId: { type: String, required: false, ref: "User" },
  title: { type: String, default: "New Chat" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Chat || mongoose.model("Chat", chatSchema);
