import mongoose from "mongoose";
export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  iat: number; // Date d'émission du token
  exp: number; // Date d'expiration du token en secondes
}

const tokenBlacklistSchema = new mongoose.Schema({
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

const tokenBlacklist = mongoose.model("TokenBlacklist", tokenBlacklistSchema);

export default tokenBlacklist;
