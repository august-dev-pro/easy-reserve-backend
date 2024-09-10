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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const reviewModel_1 = __importDefault(require("../models/reviewModel"));
const errorHandle_1 = require("../utils/errorHandle");
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield reviewModel_1.default.find();
        return reviews;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(400, `error lors de la recuperation des reviews`, {
            erroeMessage: error.message,
            stack: error.stack,
        });
    }
});
const create = (reviewData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review = yield reviewModel_1.default.create(reviewData);
        return review;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(400, `error lors de la creation du commentaire`, {
            erroeMessage: error.message,
            stack: error.stack,
        });
    }
});
const getById = (reviewId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review = yield reviewModel_1.default.findById(reviewId);
        return review;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(400, `error lors de la recuperation du commentaire ${reviewId}`, {
            erroeMessage: error.message,
            stack: error.stack,
        });
    }
});
const update = (reviewId, NewReviewData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newReview = yield reviewModel_1.default.findByIdAndUpdate(reviewId, NewReviewData);
        return newReview;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(400, `error lors de la mise a jour du commentaire`, {
            erroeMessage: error.message,
            stack: error.stack,
        });
    }
});
const deleteOne = (reviewId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Vérification si l'ID est valide
        if (!mongoose_1.default.Types.ObjectId.isValid(reviewId)) {
            throw new errorHandle_1.ErrorHandler(400, `L'ID fourni n'est pas valide : ${reviewId}`);
        }
        const deletedReview = yield reviewModel_1.default.findByIdAndDelete(reviewId);
        if (!deletedReview) {
            throw new errorHandle_1.ErrorHandler(404, `Aucune review trouvée avec l'ID : ${reviewId}`);
        }
        return deletedReview;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(400, `Erreur lors de la suppression de la review`, {
            errorMessage: error.message,
            stack: error.stack,
        });
    }
});
const deleteMany = (reviewIds) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Utiliser $in pour trouver les utilisateurs avec les IDs spécifiés
        const result = yield reviewModel_1.default.deleteMany({
            _id: {
                $in: reviewIds.map((id) => new mongoose_1.default.Types.ObjectId(id)),
            },
        });
        // Vérifier combien de documents ont été supprimés
        if (result.deletedCount === 0) {
            throw new errorHandle_1.ErrorHandler(500, "No review were deleted");
        }
        return result.deletedCount > 0
            ? yield reviewModel_1.default.find({
                _id: {
                    $in: reviewIds.map((id) => new mongoose_1.default.Types.ObjectId(id)),
                },
            })
            : null;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(400, `error lors de la supression des reviewsss ${reviewIds}`, {
            erroeMessage: error.message,
            stack: error.stack,
        });
    }
});
exports.reviewService = {
    getAll,
    create,
    getById,
    update,
    deleteOne,
    deleteMany,
};
