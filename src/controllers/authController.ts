import { NextFunction, Request, Response } from "express";
import authService from "../services/authService";
import { ErrorHandler } from "../utils/errorHandle";

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const credentials = req.body;
  try {
    const token = await authService.authentification(credentials);

    // Définir le cookie avec le token
    res.cookie("authToken", token, {
      httpOnly: true, // Cookie inaccessible via JavaScript
      secure: process.env.NODE_ENV === "production", // Utiliser HTTPS en production
      sameSite: "strict", // Prévenir les attaques CSRF
      maxAge: 3 * 60 * 60 * 1000, // Durée de validité du cookie (3 heures)
    });

    return res.status(200).json({
      statusCode: 200,
      message: "Authentification réussie",
      tooken: token,
    });
  } catch (error: any) {
    return res
      .status(401)
      .json({ errormessage: error.message, stack: error.stack });
  }
};

const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.cookies);

  try {
    const token = req.cookies?.authToken; // Assure-toi que le token est extrait correctement depuis le cookie

    if (!token) {
      return res.status(400).json({
        statusCode: 404,
        message: "Aucun token trouvé dans les cookies",
      });
    }

    await authService.logout(token); // Invalide le token en l'ajoutant à la liste noire

    // Supprime le cookie du client
    res.clearCookie("authToken");

    return res.status(200).json({
      statusCode: 200,
      message: "Déconnexion réussie",
    });
  } catch (error: any) {
    return next(
      new ErrorHandler(400, "Erreur lors de la déconnexion de l'utilisateur", {
        errorMessage: error.message,
        stack: error.stack,
      })
    );
  }
};

const authController = {
  loginUser,
  logoutUser,
};

export default authController;
