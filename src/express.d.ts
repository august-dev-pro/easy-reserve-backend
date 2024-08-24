import { Request } from "express";
import { IUser } from "./models/userModel";

declare module "express-serve-static-core" {
  interface Request {
    user?: IUser; // Remplace UserDocument par le type correct de ton utilisateur
  }
}
