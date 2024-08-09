import { Router } from "express";
import { loginUserCtr, registerUser } from "../controllers/UserController";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUserCtr);

export default router;
