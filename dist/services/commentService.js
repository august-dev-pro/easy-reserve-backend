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
const mongoose_1 = __importDefault(require("mongoose"));
const commentModel_1 = __importDefault(require("../models/commentModel"));
const errorHandle_1 = require("../utils/errorHandle");
const create = (commentData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = yield commentModel_1.default.create(commentData);
        return comment;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(400, "erreur lors de l'enregistrement du commentaire", {
            errorMessage: error.mesage,
            stack: error.stack,
        });
    }
});
const update = (commentId, commentData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newComment = yield commentModel_1.default.findByIdAndUpdate(commentId, commentData, {
            new: true,
            runValidators: true,
        });
        return newComment;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(400, "erreur lors de la mise a jour du commentaire", {
            errorMessage: error.mesage,
            stack: error.stack,
        });
    }
});
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = commentModel_1.default.find();
        return comments;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(400, "erreur lors de la recuperation des commentaires", {
            errorMessage: error.mesage,
            stack: error.stack,
        });
    }
});
const getById = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = yield commentModel_1.default.findById(commentId);
        return comment;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(400, "erreur lors de la recuperation du commentaire", {
            errorMessage: error.mesage,
            stack: error.stack,
        });
    }
});
const deleteOne = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = yield commentModel_1.default.findByIdAndDelete(commentId);
        return comment;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(400, "erreur lors de la supression du commentaire", {
            errorMessage: error.mesage,
            stack: error.stack,
        });
    }
});
const deleteMany = (commentIds) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Utiliser $in pour trouver les utilisateurs avec les IDs spécifiés
        const result = yield commentModel_1.default.deleteMany({
            _id: { $in: commentIds.map((id) => new mongoose_1.default.Types.ObjectId(id)) },
        });
        // Vérifier combien de documents ont été supprimés
        if (result.deletedCount === 0) {
            throw new errorHandle_1.ErrorHandler(500, "No comment were deleted");
        }
        return result.deletedCount > 0
            ? yield commentModel_1.default.find({
                _id: { $in: commentIds.map((id) => new mongoose_1.default.Types.ObjectId(id)) },
            })
            : null;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(400, `erreur lors de la supression des commentaires ${commentIds}`, {
            errorMessage: error.mesage,
            stack: error.stack,
        });
    }
});
const commentService = {
    create,
    getAll,
    update,
    getById,
    deleteMany,
    deleteOne,
};
exports.default = commentService;
