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
    const newComment = await commentService.create(commentData);
    return res.status(201).json({
      status: 201,
      data: newComment,
      message: "Commentaire creé avec succès, ",
    });
  } catch (error: any) {
    return next(
      new ErrorHandler(400, "Erreur lors de la création du commentaire", {
        errorMeaage: error,
        stack: error.stack,
      })
    );
  }
};

const updateComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const commentId = req.params.commentId;
    const commentData = req.body;
    const newComment = await commentService.update(commentId, commentData);
    if (!newComment) {
      return res.status(404).json({
        statusCode: 404,
        message: `le commentaire ${commentId} non trouvé`,
      });
    }
    return res.status(200).json({
      statusCode: 200,
      message: "commentaire modifié avec succès",
      newComment: newComment,
    });
  } catch (error: any) {
    return next(
      new ErrorHandler(400, "erreur lors de la modification du commentaire", {
        errorMessage: error.message,
        stack: error.stack,
      })
    );
  }
};

const getAllComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comments = await commentService.getAll();

    if (comments.length === 0) {
      return res.status(200).json({
        status: 200,
        message: "aucun commentaire trouvés",
        comments: comments,
      });
    }
    return res.status(200).json({
      status: 200,
      message: "tous les commentaires retrouvés",
      comments: comments,
    });
  } catch (error: any) {
    return next(
      new ErrorHandler(400, "erreur lors de la recuperation des commentaires", {
        errorMessage: error.message,
        stack: error.stack,
      })
    );
  }
};

const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const commentId = req.params.commentId;
  try {
    const comment = commentService.deleteOne(commentId);
    if (!comment) {
      return res.status(404).json({
        statusCode: 404,
        message: `le commentaire ${commentId} a pas été trouvé`,
        comment: null,
      });
    }
    return res.status(200).json({
      statusCode: 200,
      message: `le commentaire ${commentId} a bien été suprimé`,
      comment: comment,
    });
  } catch (error: any) {
    return next(
      new ErrorHandler(
        400,
        `erreur lors de la suppression du commentaire: ${commentId}`,
        {
          errorMessage: error.message,
          stack: error.stack,
        }
      )
    );
  }
};

const getCommentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const commentId = req.params.commentId;
  try {
    const comment = await commentService.getById(commentId);
    if (!comment) {
      return res.status(200).json({
        statusCode: 404,
        message: `commentaire ${commentId} n'a pas été trouvé`,
        comment: null,
      });
    }
    return res.status(200).json({
      statusCode: 200,
      message: `commentaire ${commentId} a bien été trouvé`,
      comment: comment,
    });
  } catch (error: any) {
    return next(
      new ErrorHandler(400, "erreur lors de le recuperation du commentaire", {
        errorMessage: error.message,
        stack: error.stack,
      })
    );
  }
};

const deleteManyComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const Ids: string[] = req.body;
  try {
    const deletedComments = await commentService.deleteMany(Ids);

    if (!deletedComments) {
      return res.status(404).json({
        status: 404,
        message: "les commentaires n'ont pas ete trouvés",
        comments: null,
      });
    }
    return res.status(200).json({
      STATUS_CODES: 200,
      message: "les commentaires ont bien ete supprimés",
      comments: deletedComments,
    });
  } catch (error: any) {
    return next(
      new ErrorHandler(400, "erreur lors de la suppressions des commentaires", {
        errorMessage: error.message,
        stack: error.stack,
      })
    );
  }
};
export const commentController = {
  createComment,
  updateComment,
  deleteComment,
  deleteManyComments,
  getAllComments,
  getCommentById,
};
