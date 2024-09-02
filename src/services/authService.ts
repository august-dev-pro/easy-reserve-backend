import tokenBlacklist from "../models/tokenBlacklist";
import userModel from "../models/userModel";
import { ErrorHandler } from "../utils/errorHandle";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authentification = async (userData: {
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

    // Génération d'un token JWT si l'authentification est réussie
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "3h" }
    );
    return token;
  } catch (error: any) {
    throw new ErrorHandler(500, "An error occurred during user login.", {
      stack: error.stack,
      message: error.message,
    });
  }
};
const logout = async (token: any) => {
  try {
    // Ajouter le token à la liste noire
    const result = await tokenBlacklist.create({ token });
    return result;
  } catch (error: any) {
    throw new ErrorHandler(
      500,
      "Erreur lors de l'ajout du token à la liste noire.",
      {
        errorMessage: error.message,
        stack: error.stack,
      }
    );
  }
};
const authService = { authentification, logout };

export default authService;
