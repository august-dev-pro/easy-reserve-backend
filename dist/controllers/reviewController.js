"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewController = void 0;
const errorHandle_1 = require("../utils/errorHandle");
const reviewService_1 = require("../services/reviewService");
const getAllReviews = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield reviewService_1.reviewService.getAll();
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
    }
    catch (error) {
        return next(new errorHandle_1.ErrorHandler(400, `erreur lors de `, {
            errorMessage: error.message,
            stack: error.stack,
        }));
    }
});
const getReviewById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewId = req.params.id;
    try {
        const review = yield reviewService_1.reviewService.getById(reviewId);
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
    }
    catch (error) {
        return next(new errorHandle_1.ErrorHandler(400, `erreur lors de recuperation du review ${reviewId}`, {
            errorMessage: error.message,
            stack: error.stack,
        }));
    }
});
const updateReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewId = req.params.id;
    const reviewData = req.body;
    try {
        const updatedReview = yield reviewService_1.reviewService.update(reviewId, reviewData);
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
    }
    catch (error) {
        return next(new errorHandle_1.ErrorHandler(400, `erreur lors de la mise à jour de la review`, {
            errorMessage: error.message,
            stack: error.stack,
        }));
    }
});
const deleteOneReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviewId = req.params.id;
        if (!reviewId) {
            return next(new errorHandle_1.ErrorHandler(400, "L'ID de la review n'a pas été fourni"));
        }
        const deletedReview = yield reviewService_1.reviewService.deleteOne(reviewId);
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
    }
    catch (error) {
        return next(new errorHandle_1.ErrorHandler(400, `Erreur lors de la suppression de la review ${req.params.id}`, {
            errorMessage: error.message,
            stack: error.stack,
        }));
    }
});
const deleteManyReviews = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewIds = req.body;
    try {
        const deletedReviews = yield reviewService_1.reviewService.deleteMany(reviewIds);
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
    }
    catch (error) {
        return next(new errorHandle_1.ErrorHandler(400, `erreur lors de la supression des revives`, {
            errorMessage: error.message,
            stack: error.stack,
        }));
    }
});
const createReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewData = req.body;
    try {
        const newReview = yield reviewService_1.reviewService.create(reviewData);
        return res.status(201).json({
            statusCode: 201,
            message: `review a bien ete creé avec l'id: ${newReview._id}`,
            Review: newReview,
        });
    }
    catch (error) {
        return next(new errorHandle_1.ErrorHandler(400, `erreur lors de l'enregistrement de la review`, {
            errorMessage: error.message,
            stack: error.stack,
        }));
    }
});
exports.reviewController = {
    getAllReviews,
    getReviewById,
    updateReview,
    deleteManyReviews,
    deleteOneReview,
    createReview,
};
