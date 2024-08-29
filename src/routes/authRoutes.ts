import { Router } from "express";
import { loginUser } from "../controllers/authController";

const authRoutes = Router();

authRoutes.post("/login", loginUser);
authRoutes.post("/logout", loginUser);

export default authRoutes;
