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
exports.serviceService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ServiceModel_1 = __importDefault(require("../models/ServiceModel"));
const errorHandle_1 = require("../utils/errorHandle");
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const services = yield ServiceModel_1.default.find();
        return services;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(400, "erreur lors de la recuperation des services", {
            errorMessage: error.message,
            stack: error.stack,
        });
    }
});
const getById = (serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const service = yield ServiceModel_1.default.findById(serviceId);
        return service;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(400, `erreur lors de la recuperation du service: ${serviceId}`, {
            errorMessage: error.message,
            stack: error.stack,
        });
    }
});
const update = (serviceId, newServiceData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newService = yield ServiceModel_1.default.findByIdAndUpdate(serviceId, newServiceData);
        return newService;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(400, "erreur lors de la mise a jour du service", {
            erroMessage: error.message,
            stack: error.stack,
        });
    }
});
const deleteOne = (serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const service = yield ServiceModel_1.default.findByIdAndDelete(serviceId);
        return service;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(400, "erreur lors de la supression du service", {
            erroMessage: error.message,
            stack: error.stack,
        });
    }
});
const deleteMany = (servicesIds) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Utiliser $in pour trouver les utilisateurs avec les IDs spécifiés
        const result = yield ServiceModel_1.default.deleteMany({
            _id: {
                $in: servicesIds.map((id) => new mongoose_1.default.Types.ObjectId(id)),
            },
        });
        // Vérifier combien de documents ont été supprimés
        if (result.deletedCount === 0) {
            throw new errorHandle_1.ErrorHandler(500, "No comment were deleted");
        }
        return result.deletedCount > 0
            ? yield ServiceModel_1.default.find({
                _id: {
                    $in: servicesIds.map((id) => new mongoose_1.default.Types.ObjectId(id)),
                },
            })
            : null;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(400, "erreur lors de la supression des service", {
            errorMessage: error.message,
            stack: error.stack,
        });
    }
});
const create = (serviceData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const service = yield ServiceModel_1.default.create(serviceData);
        return service;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(400, `erreur lors de la creation du service`, {
            errorMessage: error.message,
            stack: error.stack,
        });
    }
});
exports.serviceService = {
    getAll,
    getById,
    update,
    deleteMany,
    deleteOne,
    create,
};
