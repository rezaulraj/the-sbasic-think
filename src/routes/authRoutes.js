import express from "express";
import {
  register,
  login,
  googleAuth,
  getMe,
  logout,
  updateProfile,
} from "../controllers/authController.js";
import { protect } from "../middlewares/auth.js";
import {
  validateRegister,
  validateLogin,
  validateGoogleAuth,
} from "../middlewares/validation.js";

const router = express.Router();

// Public routes
router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/google", validateGoogleAuth, googleAuth);

// Protected routes
router.use(protect); // All routes below this are protected
router.get("/me", getMe);
router.post("/logout", logout);
router.put("/profile", updateProfile);

export default router;
