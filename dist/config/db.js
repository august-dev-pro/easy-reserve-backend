"use strict";
// src/connectedDb.ts
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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectedDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const dbURL = process.env.DBURL;
    if (!dbURL) {
        console.error("DBURL environment variable is not set");
        process.exit(1);
    }
    try {
        yield mongoose_1.default.connect(dbURL, {
            serverSelectionTimeoutMS: 30000, // Temps de connexion à MongoDB en millisecondes
        });
        console.log("MongoDb connected");
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
});
exports.default = connectedDb;
