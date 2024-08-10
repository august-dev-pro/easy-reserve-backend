import bcrypt from "bcrypt";
import userModel, { IUser } from "../models/userModel";
import { ErrorHandler } from "../utils/errorHandle";

export const createUser = async (userData: IUser) => {
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

export const loginUser = async (userData: {
  email: string;
  password: string;
}) => {
  try {
    const { email, password } = userData;

    // Recherche de l'utilisateur par email
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    // Vérification du mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    // Retourner l'utilisateur si l'authentification est réussie
    return user;
  } catch (error: any) {
    console.error("Error logging in user:", error.message);

    // Lever l'erreur pour que le contrôleur puisse la gérer
    throw new Error(error.message || "An error occurred during user login.");
  }
};

const userService = {
  createUser,
  loginUser,
};

export default userService;
