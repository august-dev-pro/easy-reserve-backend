import { Router } from "express";
import authController from "../controllers/authController";

const authRoutes = Router();

authRoutes.post("/", authController.loginUser);
authRoutes.post("/logout", authController.logoutUser);

export default authRoutes;
