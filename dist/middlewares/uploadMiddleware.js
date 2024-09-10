"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMiddleware = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const errorHandle_1 = require("../utils/errorHandle");
const fs_1 = __importDefault(require("fs"));
const createStorage = (folder) => {
    const uploadDir = path_1.default.join(__dirname, "../uploads", folder);
    if (!fs_1.default.existsSync(uploadDir)) {
        fs_1.default.mkdirSync(uploadDir, { recursive: true });
    }
    return multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            cb(null, uploadDir); // Utilisation de uploadDir ici
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            cb(null, file.fieldname + "-" + uniqueSuffix + path_1.default.extname(file.originalname));
        },
    });
};
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    }
    else {
        cb(new Error("Type de fichier non supporté"), false);
    }
};
// Fonction pour créer un middleware d'upload avec un sous-dossier spécifique
const uploadImage = (specific) => {
    try {
        const result = (0, multer_1.default)({
            storage: createStorage(specific),
            limits: { fileSize: 1024 * 1024 * 5 }, // Limite de 5MB
            fileFilter: fileFilter,
        });
        if (!result) {
            throw new errorHandle_1.ErrorHandler(400, "erreur de base de donnée");
        }
        return result;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(400, "Erreur lors de la configuration de multer", {
            errorMessage: error.message,
            stack: error.stack,
        });
    }
};
exports.uploadMiddleware = {
    uploadImage,
};
