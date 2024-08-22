import bcrypt from "bcrypt";
import userModel, { IUser } from "../models/userModel";
import { ErrorHandler } from "../utils/errorHandle";
import mongoose from "mongoose";

const createUser = async (userData: IUser) => {
  try {
    // Vérification de l'existence de l'utilisateur
    const existingUser = await userModel.findOne({ email: userData.email });
    if (existingUser) {
      throw new ErrorHandler(400, "User already exists");
    }

    // Hashage du mot de passe
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Création de l'utilisateur
    return await userModel.create({
      ...userData,
      password: hashedPassword,
    });
  } catch (error: any) {
    throw new ErrorHandler(
      500,
      error.message || "An error occurred while creating the user.",
      error.stack
    );
  }
};

const updateUser = async (
  userId: string,
  userData: IUser
): Promise<IUser | null> => {
  try {
    const user = await userModel.findByIdAndUpdate(userId, userData, {
      new: true,
      runValidators: true,
    });
    return user;
  } catch (error: any) {
    throw new ErrorHandler(
      500,
      "Erreur lors de la mise à jour de l'utilisateur",
      {
        stack: error.stack,
        message: error.message,
      }
    );
  }
};

const deleteOneUser = async (userId: string): Promise<IUser | null> => {
  try {
    const user = await userModel.findOneAndDelete({ _id: userId });
    return user;
  } catch (error: any) {
    throw new ErrorHandler(
      500,
      "Erreur lors de la suppression de l'utilisateur",
      {
        stack: error.stack,
        message: error.message,
      }
    );
  }
};

const getAllUsers = async (): Promise<IUser[]> => {
  try {
    const users = await userModel.find();
    return users;
  } catch (error: any) {
    throw new ErrorHandler(
      500,
      "erreur lors de la recuperation de l'utilisateur ",
      {
        stack: error.stack,
        message: error.message,
      }
    );
  }
};

const getUserById = async (userId: string): Promise<IUser | null> => {
  try {
    const user = userModel.findById({ _id: userId });
    return user;
  } catch (error: any) {
    throw new ErrorHandler(
      500,
      `erreur lors de la recuperation de l'utilisateur: ${userId}`,
      {
        stack: error.stack,
        message: error.message,
      }
    );
  }
};

const deleteManyUsers = async (usersIds: string[]): Promise<IUser[] | null> => {
  try {
    const result = await userModel.deleteMany({
      _id: { $in: usersIds.map((id) => new mongoose.Types.ObjectId(id)) },
    });
    if (result.deletedCount === 0) {
      throw new ErrorHandler(500, "No users were deleted");
    }

    return result.deletedCount > 0
      ? await userModel.find({
          _id: { $in: usersIds.map((id) => new mongoose.Types.ObjectId(id)) },
        })
      : null;
  } catch (error: any) {
    throw new ErrorHandler(500, "Error deleting users", {
      errorMessage: error.message,
      stack: error.stack,
    });
  }
};

const updateUserProfileImageInDb = async (
  userId: string,
  profileImage: string
) => {
  try {
    // Convertir le chemin absolu en chemin relatif
    const relativeImagePath = profileImage.replace(
      `${process.cwd()}\\src\\uploads\\profileImages\\`,
      ""
    );

    const updateImgdUser = await userModel.findByIdAndUpdate(
      userId,
      { profileImage: relativeImagePath },
      { new: true }
    );
    return updateImgdUser;
  } catch (error: any) {
    throw new ErrorHandler(
      400,
      `erreur lors de la sauvegarde des infos de profilImage: [userId:${userId}, profilImage:${profileImage}]`,
      {
        errorMessage: error.message,
        stack: error.stack,
      }
    );
  }
};

const userService = {
  createUser,
  updateUser,
  deleteOneUser,
  getAllUsers,
  getUserById,
  deleteManyUsers,
  updateUserProfileImageInDb,
};

export default userService;
