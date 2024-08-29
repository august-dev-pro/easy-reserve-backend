import { Request, Response } from "express";
import { authentification } from "../services/authService";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(req);

  try {
    const token = await authentification({ email, password });
    res.header("Authorization", `Bearer ${token}`);
    res.status(200).json({ message: "Authentification réussie", token });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};
