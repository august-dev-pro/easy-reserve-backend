"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorHandle_1 = require("../utils/errorHandle");
const authMiddleware = (req, res, next) => {
    try {
        // Vérifier la présence du token dans l'en-tête Authorization
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new errorHandle_1.ErrorHandler(401, "Accès non autorisé, token manquant");
        }
        // Extraire le token de l'en-tête
        const token = authHeader.split(" ")[1];
        // Vérifier et décoder le token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // Attacher les informations utilisateur décodées à req.user
        req.user = decoded;
        // Passer au middleware suivant
        next();
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(401, "Accès non autorisé, token invalide", {
            stack: error.stack,
            message: error.message,
        });
    }
};
exports.default = authMiddleware;
