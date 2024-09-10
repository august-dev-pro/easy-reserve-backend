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
exports.serviceOptionService = void 0;
const serviceOptionModel_1 = __importDefault(require("../models/serviceOptionModel"));
const errorHandle_1 = require("../utils/errorHandle");
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceOption = yield serviceOptionModel_1.default.create(data);
        return serviceOption;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(400, "Error creating service option", {
            errorMessage: error.message,
            stack: error.stack,
        });
    }
});
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const servicesOptions = yield serviceOptionModel_1.default.find();
        return servicesOptions;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(500, "Error retrieving service options", {
            errorMessage: error.message,
            stack: error.stack,
        });
    }
});
const getById = (serviceOptionId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceOption = yield serviceOptionModel_1.default.findById(serviceOptionId);
        return serviceOption;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(500, "Error retrieving service options", {
            errorMessage: error.message,
            stack: error.stack,
        });
    }
});
const update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceOption = yield serviceOptionModel_1.default.findByIdAndUpdate(id, data, {
            new: true,
        });
        return serviceOption;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(400, "Error updating service option", {
            errorMessage: error.message,
            stack: error.stack,
        });
    }
});
const deleteOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceOption = yield serviceOptionModel_1.default.findByIdAndDelete(id);
        return serviceOption;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(400, "Error deleting service option", {
            errorMessage: error.message,
            stack: error.stack,
        });
    }
});
exports.serviceOptionService = {
    create,
    getAll,
    update,
    deleteOne,
    getById,
};
