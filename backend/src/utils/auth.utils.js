import bcrypt from "bcrypt";

// Hashed for register
export const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10); // Salt rounds
  } catch (error) {
    console.error("Error while hashing password:", error);
    throw new Error("Password hashing failed");
  }
};

// Compared for login
export const comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.error("Error while comparing password:", error);
    throw new Error("Password comparison failed");
  }
};

// Hash secret answer
export const answerHasher = async (answer) => {
  try {
    return await bcrypt.hash(answer, 10);
  } catch (error) {
    console.error("Error while hashing secret:", error);
    throw new Error("Secret hashing failed");
  }
};

// Compare secret answer
export const compareAnswer = async (answer, hashedAnswer) => {
  try {
    return await bcrypt.compare(answer, hashedAnswer);
  } catch (error) {
    console.error("Error while comparing secret:", error);
    throw new Error("Secret comparison failed");
  }
};
