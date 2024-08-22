import { NextFunction, Request, Response } from "express";
import userService from "../services/userService";
import { ErrorHandler } from "../utils/errorHandle";
import path from "path";

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    return next(
      new ErrorHandler(400, "erreur lors de la creation de l'utilisateur", {
        error: error.message,
      })
    );
  }
};
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAllUsers();
    res.status(201).json(users);
  } catch (error: any) {
    return next(
      new ErrorHandler(400, "erreur lors de la recuperation des utilisateurs", {
        error: error.message,
        stack: error.stack,
      })
    );
  }
};
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  /* const { firstName, lastName, email, password, phone } = req.body; */

  try {
    // Appeler la fonction pour mettre à jour l'utilisateur
    const user = await userService.updateUser(userId, req.body);
    if (!user) {
      return next(new ErrorHandler(404, "Utilisateur non trouvé"));
    }
    res.status(200).json({
      message: "utilisateur modifié avec succès",
      user,
    });
  } catch (error: any) {
    return next(
      new ErrorHandler(400, "Erreur lors de la mise à jour de l'utilisateur", {
        error: error.message,
        stack: error.stack,
      })
    );
  }
};
const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  try {
    const user = await userService.getUserById(userId);
    res.status(201).json({
      message: "utilisateur trouvé",
      user,
    });
  } catch (error: any) {
    return next(
      new ErrorHandler(400, "erreur lors de la creation de l'utilisateur", {
        error: error.message,
        stack: error.stack,
      })
    );
  }
};
const deleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId;
  try {
    const user = await userService.deleteOneUser(userId);
    res.status(201).json({
      user,
      ùessage: "utilisateur supprimer avec succès",
    });
  } catch (error: any) {
    return next(
      new ErrorHandler(400, "erreur lors de la supression de l'utilisateur", {
        error: error.message,
        stack: error.stack,
      })
    );
  }
};
const deleteManyUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ids: string[] = req.body;
  try {
    const users = await userService.deleteManyUsers(ids);
    res.status(201).json({
      users,
      message: `les utilisateurs [${ids.toString()}] ont bien été supprimés`,
    });
  } catch (error: any) {
    return next(
      new ErrorHandler(400, "erreur lors de la supression  des utilisateur", {
        error: error.message,
        stack: error.stack,
      })
    );
  }
};

// Route pour mettre à jour un utilisateur avec une photo de profil
const updateUserProfileImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    return next(new ErrorHandler(400, "Aucune image n'a été envoyée"));
  }

  const userId = req.params.id;
  const profileImage = req.file
    ? path.relative(process.cwd(), req.file.path)
    : ""; // Chemin du fichier stocké

  try {
    const updatedUser = await userService.updateUserProfileImageInDb(
      userId,
      profileImage
    );

    if (!updatedUser) {
      return res.status(404).json({
        statusCode: 404,
        message: `Utilisateur non trouvé: ${userId}`,
      });
    }

    res.status(200).json({
      statusCode: 200,
      message: "Photo de profil mise à jour avec succès",
      user: updatedUser,
    });
  } catch (error: any) {
    return next(
      new ErrorHandler(
        400,
        `Erreur lors de la mise à jour de la photo de profil`,
        {
          errorMessage: error.message,
          stack: error.stack,
        }
      )
    );
  }
};
export const userController = {
  registerUser,
  getAllUsers,
  updateUser,
  getUserById,
  deleteManyUsers,
  deleteUserById,
  updateUserProfileImage,
};
