import express from "express";
import {
  getUsers,
  getUser,
  updateUserRole,
  deleteUser,
} from "../controllers/userController.js";
import { protect, authorize } from "../middlewares/auth.js";

const router = express.Router();

// All routes are protected
router.use(protect);

// Admin only routes
router.get("/", authorize("admin"), getUsers);
router.put("/:id/role", authorize("admin"), updateUserRole);
router.delete("/:id", authorize("admin"), deleteUser);

// User can access their own profile
router.get("/:id", getUser);

export default router;
