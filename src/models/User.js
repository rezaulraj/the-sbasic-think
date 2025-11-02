import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId; // Password required only for non-Google users
      },
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: ["student", "instructor", "admin"],
      default: "student",
    },
    avatar: {
      type: String,
      default: "",
    },
    googleId: {
      type: String,
      sparse: true, // Allows multiple null values
    },
    bio: {
      type: String,
      maxlength: [500, "Bio cannot be more than 500 characters"],
    },
    verified: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ googleId: 1 });

// Encrypt password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Update lastLogin on login
userSchema.methods.updateLastLogin = async function () {
  this.lastLogin = new Date();
  await this.save();
};

// Password verification
userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

// Virtual for user profile URL
userSchema.virtual("profileUrl").get(function () {
  return `/api/users/${this._id}/profile`;
});

export default mongoose.model("User", userSchema);
