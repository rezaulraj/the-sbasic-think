// Utility functions
export const generateRandomPassword = (length = 16) => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
};

export const sanitizeUser = (user) => {
  const { password, ...sanitizedUser } = user.toObject ? user.toObject() : user;
  return sanitizedUser;
};

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
