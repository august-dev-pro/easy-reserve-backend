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
const authService_1 = __importDefault(require("../services/authService"));
const errorHandle_1 = require("../utils/errorHandle");
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const credentials = req.body;
    try {
        const token = yield authService_1.default.authentification(credentials);
        // Définir le cookie avec le token
        res.cookie("authToken", token, {
            httpOnly: true, // Cookie inaccessible via JavaScript
            secure: process.env.NODE_ENV === "production", // Utiliser HTTPS en production
            sameSite: "strict", // Prévenir les attaques CSRF
            maxAge: 3 * 60 * 60 * 1000, // Durée de validité du cookie (3 heures)
        });
        return res.status(200).json({
            statusCode: 200,
            message: "Authentification réussie",
            token: token,
        });
    }
    catch (error) {
        return res
            .status(401)
            .json({ errormessage: error.message, stack: error.stack });
    }
});
const logoutUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cookies = req.headers.cookie; // Obtenir la chaîne des cookies
        const cookieArr = (cookies === null || cookies === void 0 ? void 0 : cookies.split(";")) || []; // Diviser la chaîne des cookies en un tableau
        const authTokenCookie = cookieArr.find((cookie) => cookie.trim().startsWith("authToken=")); // Trouver le cookie authToken
        const token = authTokenCookie ? authTokenCookie.split("=")[1] : undefined; // Extraire la valeur du cookie
        console.log("Token:", req.headers.cookie);
        if (!token) {
            return res.status(400).json({
                statusCode: 404,
                message: "Aucun token trouvé dans les cookies",
            });
        }
        yield authService_1.default.logout(token); // Invalide le token en l'ajoutant à la liste noire
        // Supprime le cookie du client
        res.clearCookie("authToken");
        return res.status(200).json({
            statusCode: 200,
            message: "Déconnexion réussie",
            cookies: req.cookies,
        });
    }
    catch (error) {
        return next(new errorHandle_1.ErrorHandler(400, "Erreur lors de la déconnexion de l'utilisateur", {
            errorMessage: error.message,
            stack: error.stack,
        }));
    }
});
const authController = {
    loginUser,
    logoutUser,
};
exports.default = authController;
