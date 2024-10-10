import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/errorHandle";
import { IUser } from "../models/userModel";
import tokenBlacklist from "../models/tokenBlacklist";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Vérifier la présence du token dans les cookies
    const cookies = req.headers.cookie; // Obtenir la chaîne des cookies
    const cookieArr = cookies?.split(";") || []; // Diviser la chaîne des cookies en un tableau
    const authTokenCookie = cookieArr.find((cookie) =>
      cookie.trim().startsWith("authToken=")
    ); // Trouver le cookie authToken

    const token = authTokenCookie ? authTokenCookie.split("=")[1] : undefined; // Extraire la valeur du cookie

    if (!token) {
      throw new ErrorHandler(401, "Accès non autorisé, token manquant");
    }

    // Vérifier si le token est dans la liste noire
    const blacklistedToken = await tokenBlacklist.findOne({ token });
    if (blacklistedToken) {
      return res
        .status(401)
        .json({ statusCode: 401, message: "Token invalide." });
    }

    // Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as IUser;

    // Attacher les informations utilisateur décodées à req.user
    req.user = decoded;
    // Passer au middleware suivant
    next();
  } catch (error: any) {
    return next(
      new ErrorHandler(401, "Accès non autorisé, token invalide", {
        stack: error.stack,
        message: error.message,
      })
    );
  }
};
export default authMiddleware;
