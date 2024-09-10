// src/types/express.d.ts
import { IUser } from "../../src/models/userModel";
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
declare module "express-serve-static-core" {
  interface Request {
    user?: IUser;
  }
}
