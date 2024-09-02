import { Router } from "express";
import authController from "../controllers/authController";

const authRoutes = Router();

authRoutes.post("/", authController.loginUser);
export default authRoutes;
