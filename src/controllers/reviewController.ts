import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils/errorHandle";
import { reviewService } from "../services/reviewService";

const getAllReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reviews = await reviewService.getAll();
    if (reviews.length < 1) {
      return res.status(200).json({
        statusCode: 404,
        message: `aucune review trouvé`,
        reviews: reviews,
      });
    }
    return res.status(200).json({
      statusCode: 200,
      message: `les reviews ont bien ete recuperés`,
      reviews: reviews,
    });
  } catch (error: any) {
    return next(
      new ErrorHandler(400, `erreur lors de `, {
        errorMessage: error.message,
        stack: error.stack,
      })
    );
  }
};
const getReviewById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reviewId = req.params.id;
  try {
    const review = await reviewService.getById(reviewId);
    if (!review) {
      return res.status(404).json({
        statuCode: 404,
        message: `la review ${reviewId} n'a pas ete trouvé`,
        review: null,
      });
    }
    return res.status(200).json({
      statuCode: 200,
      message: `la review ${reviewId} a bien ete trouvé recuperé`,
      review: review,
    });
  } catch (error: any) {
    return next(
      new ErrorHandler(
        400,
        `erreur lors de recuperation du review ${reviewId}`,
        {
          errorMessage: error.message,
          stack: error.stack,
        }
      )
    );
  }
};
const updateReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reviewId = req.params.id;
  const reviewData = req.body;
  try {
    const updatedReview = await reviewService.update(reviewId, reviewData);
    if (!updatedReview) {
      // Correction ici
      return res.status(404).json({
        statusCode: 404,
        message: `la review ${reviewId} n'a pas été trouvée`,
        newReview: null,
      });
    }
    return res.status(200).json({
      statusCode: 200,
      message: `la review ${reviewId} a bien été mise à jour`,
      newReview: updatedReview,
    });
  } catch (error: any) {
    return next(
      new ErrorHandler(400, `erreur lors de la mise à jour de la review`, {
        errorMessage: error.message,
        stack: error.stack,
      })
    );
  }
};
const deleteOneReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reviewId = req.params.id;

    if (!reviewId) {
      return next(
        new ErrorHandler(400, "L'ID de la review n'a pas été fourni")
      );
    }

    const deletedReview = await reviewService.deleteOne(reviewId);

    if (!deletedReview) {
      return res.status(404).json({
        statusCode: 404,
        message: `La review avec l'ID ${reviewId} n'a pas été trouvée`,
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: `La review avec l'ID ${reviewId} a bien été supprimée`,
      deletedReview: deletedReview,
    });
  } catch (error: any) {
    return next(
      new ErrorHandler(
        400,
        `Erreur lors de la suppression de la review ${req.params.id}`,
        {
          errorMessage: error.message,
          stack: error.stack,
        }
      )
    );
  }
};

const deleteManyReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reviewIds: string[] = req.body;
  try {
    const deletedReviews = await reviewService.deleteMany(reviewIds);
    if (!deletedReviews) {
      return res.status(404).json({
        statusCode: 404,
        message: `les reviews ${reviewIds} n'ont pas ete trouvées`,
      });
    }
    return res.status(200).json({
      statusCode: 200,
      message: `les reviews ${reviewIds} ont bien ete suprimées`,
      deletdReviews: deletedReviews,
    });
  } catch (error: any) {
    return next(
      new ErrorHandler(400, `erreur lors de la supression des revives`, {
        errorMessage: error.message,
        stack: error.stack,
      })
    );
  }
};
const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reviewData = req.body;
  try {
    const newReview = await reviewService.create(reviewData);
    return res.status(201).json({
      statusCode: 201,
      message: `review a bien ete creé avec l'id: ${newReview._id}`,
      Review: newReview,
    });
  } catch (error: any) {
    return next(
      new ErrorHandler(400, `erreur lors de l'enregistrement de la review`, {
        errorMessage: error.message,
        stack: error.stack,
      })
    );
  }
};
export const reviewController = {
  getAllReviews,
  getReviewById,
  updateReview,
  deleteManyReviews,
  deleteOneReview,
  createReview,
};
