"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const errorHandle_1 = require("./errorHandle");
// Middleware pour gérer les erreurs liées à Multer
const uploadErrorHandler = (err, req, res, next) => {
    if (err instanceof multer_1.default.MulterError) {
        return res.status(400).json({
            status: "error",
            statusCode: 400,
            message: "Erreur lors de l'upload du fichier, verifié le nom du champ.",
            stack: err.message,
        });
    }
    else if (err instanceof errorHandle_1.ErrorHandler) {
        return res.status(err.statusCode).json({
            status: "error",
            statusCode: err.statusCode,
            message: err.message,
            stack: err.stack,
        });
    }
    else {
        return res.status(500).json({
            status: "error",
            statusCode: 500,
            message: "Erreur serveur interne",
            stack: err.stack,
        });
    }
};
exports.default = uploadErrorHandler;
