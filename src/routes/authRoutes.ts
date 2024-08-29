import { Router } from "express";
import { loginUser } from "../controllers/authController";

const authRoutes = Router();

authRoutes.post("/login", loginUser);

export default authRoutes;
