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
exports.commentController = void 0;
const commentService_1 = __importDefault(require("../services/commentService"));
const errorHandle_1 = require("../utils/errorHandle");
const createComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commentData = req.body;
        const newComment = yield commentService_1.default.create(commentData);
        return res.status(201).json({
            status: 201,
            data: newComment,
            message: "Commentaire creé avec succès, ",
        });
    }
    catch (error) {
        return next(new errorHandle_1.ErrorHandler(400, "Erreur lors de la création du commentaire", {
            errorMeaage: error,
            stack: error.stack,
        }));
    }
});
const updateComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commentId = req.params.commentId;
        const commentData = req.body;
        const newComment = yield commentService_1.default.update(commentId, commentData);
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
    }
    catch (error) {
        return next(new errorHandle_1.ErrorHandler(400, "erreur lors de la modification du commentaire", {
            errorMessage: error.message,
            stack: error.stack,
        }));
    }
});
const getAllComments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield commentService_1.default.getAll();
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
    }
    catch (error) {
        return next(new errorHandle_1.ErrorHandler(400, "erreur lors de la recuperation des commentaires", {
            errorMessage: error.message,
            stack: error.stack,
        }));
    }
});
const deleteComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const commentId = req.params.commentId;
    try {
        const comment = commentService_1.default.deleteOne(commentId);
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
    }
    catch (error) {
        return next(new errorHandle_1.ErrorHandler(400, `erreur lors de la suppression du commentaire: ${commentId}`, {
            errorMessage: error.message,
            stack: error.stack,
        }));
    }
});
const getCommentById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const commentId = req.params.commentId;
    try {
        const comment = yield commentService_1.default.getById(commentId);
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
    }
    catch (error) {
        return next(new errorHandle_1.ErrorHandler(400, "erreur lors de le recuperation du commentaire", {
            errorMessage: error.message,
            stack: error.stack,
        }));
    }
});
const deleteManyComments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const Ids = req.body;
    try {
        const deletedComments = yield commentService_1.default.deleteMany(Ids);
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
    }
    catch (error) {
        return next(new errorHandle_1.ErrorHandler(400, "erreur lors de la suppressions des commentaires", {
            errorMessage: error.message,
            stack: error.stack,
        }));
    }
});
exports.commentController = {
    createComment,
    updateComment,
    deleteComment,
    deleteManyComments,
    getAllComments,
    getCommentById,
};
