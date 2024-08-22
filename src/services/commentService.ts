import mongoose from "mongoose";
import CommentModel, { IComment } from "../models/commentModel";
import { ErrorHandler } from "../utils/errorHandle";

const create = async (commentData: IComment): Promise<IComment> => {
  try {
    const comment = await CommentModel.create(commentData);
    return comment;
  } catch (error: any) {
    throw new ErrorHandler(
      400,
      "erreur lors de l'enregistrement du commentaire",
      {
        errorMessage: error.mesage,
        stack: error.stack,
      }
    );
  }
};
const update = async (
  commentId: string,
  commentData: IComment
): Promise<IComment | null> => {
  try {
    const newComment = await CommentModel.findByIdAndUpdate(
      commentId,
      commentData,
      {
        new: true,
        runValidators: true,
      }
    );
    return newComment;
  } catch (error: any) {
    throw new ErrorHandler(
      400,
      "erreur lors de la mise a jour du commentaire",
      {
        errorMessage: error.mesage,
        stack: error.stack,
      }
    );
  }
};
const getAll = async (): Promise<IComment[]> => {
  try {
    const comments = CommentModel.find();
    return comments;
  } catch (error: any) {
    throw new ErrorHandler(
      400,
      "erreur lors de la recuperation des commentaires",
      {
        errorMessage: error.mesage,
        stack: error.stack,
      }
    );
  }
};
const getById = async (commentId: string): Promise<IComment | null> => {
  try {
    const comment = await CommentModel.findById(commentId);
    return comment;
  } catch (error: any) {
    throw new ErrorHandler(
      400,
      "erreur lors de la recuperation du commentaire",
      {
        errorMessage: error.mesage,
        stack: error.stack,
      }
    );
  }
};
const deleteOne = async (commentId: string) => {
  try {
    const comment = await CommentModel.findByIdAndDelete(commentId);
    return comment;
  } catch (error: any) {
    throw new ErrorHandler(400, "erreur lors de la supression du commentaire", {
      errorMessage: error.mesage,
      stack: error.stack,
    });
  }
};
const deleteMany = async (commentIds: string[]) => {
  try {
    // Utiliser $in pour trouver les utilisateurs avec les IDs spécifiés
    const result = await CommentModel.deleteMany({
      _id: { $in: commentIds.map((id) => new mongoose.Types.ObjectId(id)) },
    });

    // Vérifier combien de documents ont été supprimés
    if (result.deletedCount === 0) {
      throw new ErrorHandler(500, "No comment were deleted");
    }

    return result.deletedCount > 0
      ? await CommentModel.find({
          _id: { $in: commentIds.map((id) => new mongoose.Types.ObjectId(id)) },
        })
      : null;
  } catch (error: any) {
    throw new ErrorHandler(
      400,
      `erreur lors de la supression des commentaires ${commentIds}`,
      {
        errorMessage: error.mesage,
        stack: error.stack,
      }
    );
  }
};
const commentService = {
  create,
  getAll,
  update,
  getById,
  deleteMany,
  deleteOne,
};

export default commentService;
