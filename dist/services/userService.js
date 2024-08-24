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
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../models/userModel"));
const errorHandle_1 = require("../utils/errorHandle");
const mongoose_1 = __importDefault(require("mongoose"));
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Vérification de l'existence de l'utilisateur
        const existingUser = yield userModel_1.default.findOne({ email: userData.email });
        if (existingUser) {
            throw new errorHandle_1.ErrorHandler(400, "User already exists");
        }
        // Hashage du mot de passe
        const hashedPassword = yield bcrypt_1.default.hash(userData.password, 10);
        // Création de l'utilisateur
        return yield userModel_1.default.create(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(500, error.message || "An error occurred while creating the user.", error.stack);
    }
});
const updateUser = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findByIdAndUpdate(userId, userData, {
            new: true,
            runValidators: true,
        });
        return user;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(500, "Erreur lors de la mise à jour de l'utilisateur", {
            stack: error.stack,
            message: error.message,
        });
    }
});
const deleteOneUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findOneAndDelete({ _id: userId });
        return user;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(500, "Erreur lors de la suppression de l'utilisateur", {
            stack: error.stack,
            message: error.message,
        });
    }
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.find();
        return users;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(500, "erreur lors de la recuperation de l'utilisateur ", {
            stack: error.stack,
            message: error.message,
        });
    }
});
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = userModel_1.default.findById({ _id: userId });
        return user;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(500, `erreur lors de la recuperation de l'utilisateur: ${userId}`, {
            stack: error.stack,
            message: error.message,
        });
    }
});
const deleteManyUsers = (usersIds) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userModel_1.default.deleteMany({
            _id: { $in: usersIds.map((id) => new mongoose_1.default.Types.ObjectId(id)) },
        });
        if (result.deletedCount === 0) {
            throw new errorHandle_1.ErrorHandler(500, "No users were deleted");
        }
        return result.deletedCount > 0
            ? yield userModel_1.default.find({
                _id: { $in: usersIds.map((id) => new mongoose_1.default.Types.ObjectId(id)) },
            })
            : null;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(500, "Error deleting users", {
            errorMessage: error.message,
            stack: error.stack,
        });
    }
});
const updateUserProfileImageInDb = (userId, profileImage) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Convertir le chemin absolu en chemin relatif
        const relativeImagePath = profileImage.replace(`${process.cwd()}\\src\\uploads\\profileImages\\`, "");
        const updateImgdUser = yield userModel_1.default.findByIdAndUpdate(userId, { profileImage: relativeImagePath }, { new: true });
        return updateImgdUser;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(400, `erreur lors de la sauvegarde des infos de profilImage: [userId:${userId}, profilImage:${profileImage}]`, {
            errorMessage: error.message,
            stack: error.stack,
        });
    }
});
const userService = {
    createUser,
    updateUser,
    deleteOneUser,
    getAllUsers,
    getUserById,
    deleteManyUsers,
    updateUserProfileImageInDb,
};
exports.default = userService;
