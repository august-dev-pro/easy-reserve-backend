import { IUser } from "../src/models/userModel";
import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Remplace `UserDocument` par le type correspondant à ton utilisateur
    }
  }
}
