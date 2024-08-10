import { Handler, NextFunction, Request, Response } from "express";
import userService from "../services/userService";
import { ErrorHandler } from "../utils/errorHandle";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    return next(
      new ErrorHandler(400, "erreur lors de la creation de l'utilisateur", {
        error: error.message,
      })
    );
  }
};

export const loginUserCtr = async (req: Request, res: Response) => {
  try {
    const user = await userService.loginUser(req.body);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};
