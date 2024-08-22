import mongoose from "mongoose";
import ReviewModel, { IReview } from "../models/reviewModel";
import { ErrorHandler } from "../utils/errorHandle";

const getAll = async (): Promise<IReview[]> => {
  try {
    const reviews = await ReviewModel.find();
    return reviews;
  } catch (error: any) {
    throw new ErrorHandler(400, `error lors de la recuperation des reviews`, {
      erroeMessage: error.message,
      stack: error.stack,
    });
  }
};
const create = async (reviewData: IReview): Promise<IReview> => {
  try {
    const review = await ReviewModel.create(reviewData);
    return review;
  } catch (error: any) {
    throw new ErrorHandler(400, `error lors de la creation du commentaire`, {
      erroeMessage: error.message,
      stack: error.stack,
    });
  }
};
const getById = async (reviewId: string): Promise<IReview | null> => {
  try {
    const review = await ReviewModel.findById(reviewId);
    return review;
  } catch (error: any) {
    throw new ErrorHandler(
      400,
      `error lors de la recuperation du commentaire ${reviewId}`,
      {
        erroeMessage: error.message,
        stack: error.stack,
      }
    );
  }
};
const update = async (
  reviewId: string,
  NewReviewData: IReview
): Promise<IReview | null> => {
  try {
    const newReview = await ReviewModel.findByIdAndUpdate(
      reviewId,
      NewReviewData
    );
    return newReview;
  } catch (error: any) {
    throw new ErrorHandler(400, `error lors de la mise a jour du commentaire`, {
      erroeMessage: error.message,
      stack: error.stack,
    });
  }
};
const deleteOne = async (reviewId: string): Promise<IReview | null> => {
  try {
    // Vérification si l'ID est valide
    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      throw new ErrorHandler(400, `L'ID fourni n'est pas valide : ${reviewId}`);
    }

    const deletedReview = await ReviewModel.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      throw new ErrorHandler(
        404,
        `Aucune review trouvée avec l'ID : ${reviewId}`
      );
    }

    return deletedReview;
  } catch (error: any) {
    throw new ErrorHandler(400, `Erreur lors de la suppression de la review`, {
      errorMessage: error.message,
      stack: error.stack,
    });
  }
};
const deleteMany = async (reviewIds: string[]): Promise<IReview[] | null> => {
  try {
    // Utiliser $in pour trouver les utilisateurs avec les IDs spécifiés
    const result = await ReviewModel.deleteMany({
      _id: {
        $in: reviewIds.map((id: string) => new mongoose.Types.ObjectId(id)),
      },
    });

    // Vérifier combien de documents ont été supprimés
    if (result.deletedCount === 0) {
      throw new ErrorHandler(500, "No review were deleted");
    }

    return result.deletedCount > 0
      ? await ReviewModel.find({
          _id: {
            $in: reviewIds.map((id) => new mongoose.Types.ObjectId(id)),
          },
        })
      : null;
  } catch (error: any) {
    throw new ErrorHandler(
      400,
      `error lors de la supression des reviewsss ${reviewIds}`,
      {
        erroeMessage: error.message,
        stack: error.stack,
      }
    );
  }
};
export const reviewService = {
  getAll,
  create,
  getById,
  update,
  deleteOne,
  deleteMany,
};
