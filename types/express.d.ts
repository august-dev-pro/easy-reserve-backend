import { IUser } from "../src/models/userModel";

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Remplace `UserDocument` par le type correspondant à ton utilisateur
    }
  }
}
