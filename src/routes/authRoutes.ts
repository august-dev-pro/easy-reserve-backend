import { Router } from "express";
import authController from "../controllers/authController";

const authRoutes = Router();

authRoutes.post("/auth", authController.loginUser);
authRoutes.post("/sign-out", authController.logoutUser);
export default authRoutes;
