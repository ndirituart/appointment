
import { users } from "../appwrite.config";

export const getJWT = async (userId: string) => {
  try {
    //using JWT doesn't work with the current appwrite version, so we create a session instead and use the session cookie for authentication

    const session = await users.createSession(userId);
    return session;
  } catch (error) {
    console.error("Error creating JWT:", error);
  }
};