
import { users } from "../appwrite.config";

export const getJWT = async (userId: string) => {
  try {

    const session = await users.createSession(userId);
    return session;
  } catch (error) {
    console.error("Error creating JWT:", error);
  }
};