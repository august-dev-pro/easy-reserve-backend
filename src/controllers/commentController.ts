import { IComment } from "../models/commentModel";
import { NextFunction, Request, Response } from "express";
import commentService from "../services/commentService";
import { ErrorHandler } from "../utils/errorHandle";

const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const commentData = req.body;
    const comment = await commentService.createComment(commentData);
    return res.status(201).json({
      status: 201,
      data: comment,
      message: "Commentaire creé avec succès.",
    });
  } catch (error: any) {
    return next(
      new ErrorHandler(400, "Erreur lors de la création du produit", {
        error: error,
      })
    );
  }
};

/*
const updateComment = async (req: Request, res: Response) => {
  try {
    const commentData = req.body;
    const comment = await commentService.updateComment(commentData);
    res.status(201).json(comment);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
const getComment = (req: Request, res: Response) => {
  try {
    const commentId = req.body;
    const comment = commentService.getComment(commentId);
    res.status(201).json(comment);
  } catch (error: any) {
    res.status(400).json(error.message);
  }
};
const deleteComment = (req: Request, res: Response) => {
  try {
    const commentId = req.body;
    const comment = commentService.deleteComment(commentId);
    res.status(201).json(comment);
  } catch (error: any) {
    res.status(400).json(error.message);
  }
};
*/
