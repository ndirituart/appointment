import { users } from "../appwrite.config";

export const getSessionToken = async () => {
  try {
    // This generates a JWT that is valid for 15 minutes
    const jwt = await users.createJWT();
    return jwt.jwt;
  } catch (error) {
    console.error("JWT Generation failed:", error);
  }
}