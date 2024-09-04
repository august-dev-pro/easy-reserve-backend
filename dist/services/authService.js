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
const tokenBlacklist_1 = __importDefault(require("../models/tokenBlacklist"));
const userModel_1 = __importDefault(require("../models/userModel"));
const errorHandle_1 = require("../utils/errorHandle");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authentification = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = userData;
        // Recherche de l'utilisateur par email
        const user = yield userModel_1.default.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }
        // Vérification du mot de passe
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }
        // Génération d'un token JWT si l'authentification est réussie
        const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "3h" });
        return token;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(500, "An error occurred during user login.", {
            stack: error.stack,
            message: error.message,
        });
    }
});
const logout = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Ajouter le token à la liste noire
        const result = yield tokenBlacklist_1.default.create({ token });
        return result;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(500, "Erreur lors de l'ajout du token à la liste noire.", {
            errorMessage: error.message,
            stack: error.stack,
        });
    }
});
const authService = { authentification, logout };
exports.default = authService;
