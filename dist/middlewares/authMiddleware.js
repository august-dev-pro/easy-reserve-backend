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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorHandle_1 = require("../utils/errorHandle");
const tokenBlacklist_1 = __importDefault(require("../models/tokenBlacklist"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Vérifier la présence du token dans les cookies
        const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.authToken;
        if (!token) {
            throw new errorHandle_1.ErrorHandler(401, "Accès non autorisé, token manquant");
        }
        // Vérifier si le token est dans la liste noire
        const blacklistedToken = yield tokenBlacklist_1.default.findOne({ token });
        if (blacklistedToken) {
            return res
                .status(401)
                .json({ statusCode: 401, message: "Token invalide." });
        }
        // Vérifier et décoder le token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // Attacher les informations utilisateur décodées à req.user
        req.user = decoded;
        // Passer au middleware suivant
        next();
    }
    catch (error) {
        return next(new errorHandle_1.ErrorHandler(401, "Accès non autorisé, token invalide", {
            stack: error.stack,
            message: error.message,
        }));
    }
});
exports.default = authMiddleware;
