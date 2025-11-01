import mongoose from "mongoose";

const materialSchema = new mongoose.Schema(
  {
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      required: true,
    },
    type: {
      type: String,
      enum: ["video", "pdf", "quiz", "assignment", "other"],
      required: true,
    },
    title: { type: String, required: true },
    fileUrl: { type: String },
    duration: { type: Number, default: 0 }, // for videos
    size: { type: Number, default: 0 }, // file size in bytes
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🔒 Upload Tracking
    isUploading: { type: Boolean, default: false },
    progress: { type: Number, default: 0 },
    uploadStatus: {
      type: String,
      enum: ["pending", "in-progress", "completed", "failed"],
      default: "pending",
    },
    lockOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Material", materialSchema);
