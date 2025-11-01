import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    order: { type: Number, default: 0 },

    materials: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Material",
      },
    ],

    // 🔒 Upload Locking
    isUploading: { type: Boolean, default: false },
    uploadProgress: { type: Number, default: 0 },
    uploadStatus: {
      type: String,
      enum: ["ready", "in-progress", "completed"],
      default: "ready",
    },
    lockOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Lesson", lessonSchema);
