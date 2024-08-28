// src/types/express.d.ts
import { Request } from "express";
import { IUser } from "../../src/models/userModel";

declare module "express-serve-static-core" {
  interface Request {
    user?: IUser; // Remplacez `any` par le type correct si vous avez un type spécifique pour `user`
  }
}
