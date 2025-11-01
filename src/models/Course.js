import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],
    price: { type: Number, default: 0 },
    thumbnail: { type: String },
    tags: [String],
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    duration: { type: Number, default: 0 }, // total minutes
    published: { type: Boolean, default: false },

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

export default mongoose.model("Course", courseSchema);
