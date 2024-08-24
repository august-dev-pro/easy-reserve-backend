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
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskerSpecificsController = void 0;
const taskerSpecificsService_1 = require("../services/taskerSpecificsService");
const errorHandle_1 = require("../utils/errorHandle");
const createTaskerSpecifics = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const taskerSpecificsData = req.body;
    try {
        const taskerSpecifics = yield taskerSpecificsService_1.taskerSpecificsService.create(taskerSpecificsData);
        return res.status(201).json({
            statusCode: 201,
            message: `taskerSpecifics bien enregistré avec _id: ${taskerSpecifics === null || taskerSpecifics === void 0 ? void 0 : taskerSpecifics._id}`,
            taskerSpecifics: taskerSpecifics,
        });
    }
    catch (error) {
        return next(new errorHandle_1.ErrorHandler(400, `erreur lors de la creation de taskerSpecifics`, {
            statusCode: 400,
            errorMessage: error.message,
            stack: error.stack,
        }));
    }
});
const updateTaskerSpecifics = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const taskerSpecificsId = req.params.id;
    const newTaskerSpecificsData = req.body;
    try {
        const newTaskerSpecifics = yield taskerSpecificsService_1.taskerSpecificsService.update(taskerSpecificsId, newTaskerSpecificsData);
        if (!newTaskerSpecifics) {
            return res.status(404).json({
                statusCode: 404,
                message: `taskerSpecifics ${taskerSpecificsId} n'a pas ete trouvé`,
            });
        }
        return res.status(200).json({
            statusCode: 200,
            message: `taskerSpecifics ${taskerSpecificsId} a bien ete trouvé`,
            newTaskerSpecifics: newTaskerSpecifics,
        });
    }
    catch (error) {
        return next(new errorHandle_1.ErrorHandler(400, `erreur lors de la mise a jour de taskerSpecifics ${taskerSpecificsId}`, {
            statusCode: 400,
            errorMessage: error.message,
            stack: error.stack,
        }));
    }
});
const getAllTaskerSpecifics = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTaskerSpecifics = yield taskerSpecificsService_1.taskerSpecificsService.getAll();
        if (allTaskerSpecifics.length === 0) {
            return res.status(200).json({
                statusCode: 200,
                message: `aucun taskerSpecifics trouvé`,
            });
        }
        return res.status(200).json({
            statusCode: 200,
            message: `les taskerSpecifics ont bien ete recuperés`,
            allTaskerSpecifics: allTaskerSpecifics,
        });
    }
    catch (error) {
        return next(new errorHandle_1.ErrorHandler(400, `erreur lors de  la recuperation des taskerSpecifics`, {
            statusCode: 400,
            errorMessage: error.message,
            stack: error.stack,
        }));
    }
});
const getTaskerSpecificsById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const taskerSpecificsId = req.params.id;
    try {
        const taskerSpecifics = yield taskerSpecificsService_1.taskerSpecificsService.getById(taskerSpecificsId);
        if (!taskerSpecifics) {
            return res.status(404).json({
                statusCode: 404,
                message: `taskerSpecifics ${taskerSpecificsId} non trouvé`,
            });
        }
        return res.status(200).json({
            statusCode: 200,
            message: `taskerSpecifics ${taskerSpecificsId} a bien ete recuperé`,
            taskerSpecifics: taskerSpecifics,
        });
    }
    catch (error) {
        return next(new errorHandle_1.ErrorHandler(400, `erreur lors de recuperation de taskerSpecifics: ${taskerSpecificsId}`, {
            statusCode: 400,
            errorMessage: error.message,
            stack: error.stack,
        }));
    }
});
const deleteOneTaskerSpecifics = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const taskerSpecificsId = req.params.id;
    try {
        const deletedTaskerSpecifics = yield taskerSpecificsService_1.taskerSpecificsService.deleteOne(taskerSpecificsId);
        if (!deletedTaskerSpecifics) {
            return res.status(404).json({
                statusCode: 404,
                message: `taskerSpecifics ${taskerSpecificsId} non trouvé`,
            });
        }
        return res.status(200).json({
            statusCode: 200,
            message: `taskerSpecifics ${taskerSpecificsId} a bien ete suprimé`,
            deletedTaskerSpecifics: deletedTaskerSpecifics,
        });
    }
    catch (error) {
        return next(new errorHandle_1.ErrorHandler(400, `erreur lors de la supression de taskerSpecifics: ${taskerSpecificsId}`, {
            statusCode: 400,
            errorMessage: error.message,
            stack: error.stack,
        }));
    }
});
const deleteManyTaskerSpecifics = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const taskerSpecificsIds = req.body;
    try {
        const deletedTaskerSpecifics = yield taskerSpecificsService_1.taskerSpecificsService.deleteMany(taskerSpecificsIds);
        if (!deletedTaskerSpecifics) {
            return res.status(404).json({
                statusCode: 404,
                message: `taskerSpecifics ${taskerSpecificsIds} non trouvés`,
            });
        }
        return res.status(200).json({
            statusCode: 200,
            message: `taskerSpecifics ${taskerSpecificsIds} ont bien ete suprimés`,
            deletedTaskerSpecifics: deletedTaskerSpecifics,
        });
    }
    catch (error) {
        return next(new errorHandle_1.ErrorHandler(400, `erreur lors de la supression des taskerSpecifics: ${taskerSpecificsIds}`, {
            statusCode: 400,
            errorMessage: error.message,
            stack: error.stack,
        }));
    }
});
exports.taskerSpecificsController = {
    createTaskerSpecifics,
    updateTaskerSpecifics,
    deleteManyTaskerSpecifics,
    deleteOneTaskerSpecifics,
    getAllTaskerSpecifics,
    getTaskerSpecificsById,
};
