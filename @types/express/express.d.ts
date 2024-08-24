// src/types/express.d.ts
import { Request } from "express";
import { IUser } from "../../src/models/userModel";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
