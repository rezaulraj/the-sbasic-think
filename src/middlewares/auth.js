import jwt from "jsonwebtoken";
import User from "../models/User.js";
import logger from "../utils/logger.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in cookie first, then in header
    if (req.cookies.token) {
      token = req.cookies.token;
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to access this route. Please login.",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }

      next();
    } catch (error) {
      logger.error("JWT verification error:", error);
      return res.status(401).json({
        success: false,
        message: "Not authorized to access this route. Invalid token.",
      });
    }
  } catch (error) {
    next(error);
  }
};

// Grant access to specific roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.user.role} is not authorized to access this route`,
      });
    }
    next();
  };
};

// Optional auth - doesn't throw error if no token
export const optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (req.cookies.token) {
      token = req.cookies.token;
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
    }

    next();
  } catch (error) {
    next();
  }
};
