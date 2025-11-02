import app from "./src/app.js";
import connectDB from "./src/config/database.js";
import logger from "./src/utils/logger.js";

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  logger.error("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  logger.error(err.name, err.message);
  process.exit(1);
});

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  logger.error("UNHANDLED REJECTION! 💥 Shutting down...");
  logger.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Graceful shutdown
process.on("SIGTERM", () => {
  logger.info("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    logger.info("💥 Process terminated!");
  });
});
