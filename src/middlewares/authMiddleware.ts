import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/errorHandle";
import { IUser } from "../models/userModel";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Vérifier la présence du token dans l'en-tête Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ErrorHandler(401, "Accès non autorisé, token manquant");
    }

    // Extraire le token de l'en-tête
    const token = authHeader.split(" ")[1];

    // Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as IUser;

    // Attacher les informations utilisateur décodées à req.user
    req.user = decoded;

    // Passer au middleware suivant
    next();
  } catch (error: any) {
    throw new ErrorHandler(401, "Accès non autorisé, token invalide", {
      stack: error.stack,
      message: error.message,
    });
  }
};

export default authMiddleware;
