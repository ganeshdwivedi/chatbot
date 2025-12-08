import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true, ref: "User" },
  planId: { type: String, required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
});

export default mongoose.models.Subscription ||
  mongoose.model("Subscription", subscriptionSchema);
