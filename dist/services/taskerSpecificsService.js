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
exports.taskerSpecificsService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const taskerSpecificsModel_1 = __importDefault(require("../models/taskerSpecificsModel"));
const errorHandle_1 = require("../utils/errorHandle");
const create = (taskerSpecificsData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskerSpecifics = yield taskerSpecificsModel_1.default.create(taskerSpecificsData);
        return taskerSpecifics;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(400, `erreur lors de la creation de taskerSpecifics`, {
            statusCode: 400,
            errorMessage: error.message,
            stack: error.stack,
        });
    }
});
const update = (taskerSpecificsId, newTaskerSpecificsData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTaskerSpecifics = yield taskerSpecificsModel_1.default.findByIdAndUpdate(taskerSpecificsId, newTaskerSpecificsData);
        return newTaskerSpecifics;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(400, `erreur lors de la mise a jour de taskerSpecifics ${taskerSpecificsId}`, {
            statusCode: 400,
            errorMessage: error.message,
            stack: error.stack,
        });
    }
});
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTaskerSpecifics = yield taskerSpecificsModel_1.default.find();
        return allTaskerSpecifics;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(400, `erreur lors de  la recuperation des taskerSpecifics`, {
            statusCode: 400,
            errorMessage: error.message,
            stack: error.stack,
        });
    }
});
const getById = (taskerSpecificsId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskerSpecifics = yield taskerSpecificsModel_1.default.findById(taskerSpecificsId);
        return taskerSpecifics;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(400, `erreur lors de recuperation de taskerSpecifics: ${taskerSpecificsId}`, {
            statusCode: 400,
            errorMessage: error.message,
            stack: error.stack,
        });
    }
});
const deleteOne = (taskerSpecificsId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTaskerSpecifics = taskerSpecificsModel_1.default.findByIdAndDelete(taskerSpecificsId);
        return deletedTaskerSpecifics;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(400, `erreur lors de la supression de taskerSpecifics: ${taskerSpecificsId}`, {
            statusCode: 400,
            errorMessage: error.message,
            stack: error.stack,
        });
    }
});
const deleteMany = (taskerSpecificsIds) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield taskerSpecificsModel_1.default.deleteMany({
            _id: {
                $in: taskerSpecificsIds.map((id) => new mongoose_1.default.Types.ObjectId(id)),
            },
        });
        if (result.deletedCount === 0) {
            throw new errorHandle_1.ErrorHandler(500, "No reservation were deleted");
        }
        return result.deletedCount > 0
            ? yield taskerSpecificsModel_1.default.find({
                _id: {
                    $in: taskerSpecificsIds.map((id) => new mongoose_1.default.Types.ObjectId(id)),
                },
            })
            : null;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(400, `erreur lors de la supression des taskerSpecifics: ${taskerSpecificsIds}`, {
            statusCode: 400,
            errorMessage: error.message,
            stack: error.stack,
        });
    }
});
exports.taskerSpecificsService = {
    create,
    update,
    getAll,
    getById,
    deleteMany,
    deleteOne,
};
