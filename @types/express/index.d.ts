// @types/express/index.d.ts

import { IUser } from "../../src/models/userModel";

declare module "express-serve-static-core" {
  interface Request {
    user?: IUser;
  }
}
