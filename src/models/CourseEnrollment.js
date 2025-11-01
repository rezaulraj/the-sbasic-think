import mongoose from "mongoose";

const courseEnrollmentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    progress: { type: Number, default: 0 }, // 0–100%
    completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
    certificateIssued: { type: Boolean, default: false },
    paymentStatus: { type: String, enum: ["pending", "paid"], default: "paid" },
  },
  { timestamps: true }
);

export default mongoose.model("CourseEnrollment", courseEnrollmentSchema);
