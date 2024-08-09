import { Request, Response } from "express";
import { createUser, loginUser } from "../services/userService";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const loginUserCtr = async (req: Request, res: Response) => {
  try {
    const user = await loginUser(req.body);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};
