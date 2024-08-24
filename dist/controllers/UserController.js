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
exports.userController = void 0;
const userService_1 = __importDefault(require("../services/userService"));
const errorHandle_1 = require("../utils/errorHandle");
const path_1 = __importDefault(require("path"));
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService_1.default.createUser(req.body);
        res.status(201).json(user);
    }
    catch (error) {
        return next(new errorHandle_1.ErrorHandler(400, "erreur lors de la creation de l'utilisateur", {
            error: error.message,
        }));
    }
});
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userService_1.default.getAllUsers();
        res.status(201).json(users);
    }
    catch (error) {
        return next(new errorHandle_1.ErrorHandler(400, "erreur lors de la recuperation des utilisateurs", {
            error: error.message,
            stack: error.stack,
        }));
    }
});
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    /* const { firstName, lastName, email, password, phone } = req.body; */
    try {
        // Appeler la fonction pour mettre à jour l'utilisateur
        const user = yield userService_1.default.updateUser(userId, req.body);
        if (!user) {
            return next(new errorHandle_1.ErrorHandler(404, "Utilisateur non trouvé"));
        }
        res.status(200).json({
            message: "utilisateur modifié avec succès",
            user,
        });
    }
    catch (error) {
        return next(new errorHandle_1.ErrorHandler(400, "Erreur lors de la mise à jour de l'utilisateur", {
            error: error.message,
            stack: error.stack,
        }));
    }
});
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const user = yield userService_1.default.getUserById(userId);
        res.status(201).json({
            message: "utilisateur trouvé",
            user,
        });
    }
    catch (error) {
        return next(new errorHandle_1.ErrorHandler(400, "erreur lors de la creation de l'utilisateur", {
            error: error.message,
            stack: error.stack,
        }));
    }
});
const deleteUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const user = yield userService_1.default.deleteOneUser(userId);
        res.status(201).json({
            user,
            ùessage: "utilisateur supprimer avec succès",
        });
    }
    catch (error) {
        return next(new errorHandle_1.ErrorHandler(400, "erreur lors de la supression de l'utilisateur", {
            error: error.message,
            stack: error.stack,
        }));
    }
});
const deleteManyUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const ids = req.body;
    try {
        const users = yield userService_1.default.deleteManyUsers(ids);
        res.status(201).json({
            users,
            message: `les utilisateurs [${ids.toString()}] ont bien été supprimés`,
        });
    }
    catch (error) {
        return next(new errorHandle_1.ErrorHandler(400, "erreur lors de la supression  des utilisateur", {
            error: error.message,
            stack: error.stack,
        }));
    }
});
// Route pour mettre à jour un utilisateur avec une photo de profil
const updateUserProfileImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        return next(new errorHandle_1.ErrorHandler(400, "Aucune image n'a été envoyée"));
    }
    const userId = req.params.id;
    const profileImage = req.file
        ? path_1.default.relative(process.cwd(), req.file.path)
        : ""; // Chemin du fichier stocké
    try {
        const updatedUser = yield userService_1.default.updateUserProfileImageInDb(userId, profileImage);
        if (!updatedUser) {
            return res.status(404).json({
                statusCode: 404,
                message: `Utilisateur non trouvé: ${userId}`,
            });
        }
        res.status(200).json({
            statusCode: 200,
            message: "Photo de profil mise à jour avec succès",
            user: updatedUser,
        });
    }
    catch (error) {
        return next(new errorHandle_1.ErrorHandler(400, `Erreur lors de la mise à jour de la photo de profil`, {
            errorMessage: error.message,
            stack: error.stack,
        }));
    }
});
exports.userController = {
    registerUser,
    getAllUsers,
    updateUser,
    getUserById,
    deleteManyUsers,
    deleteUserById,
    updateUserProfileImage,
};
