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
exports.serviceOptionController = void 0;
const errorHandle_1 = require("../utils/errorHandle");
const serviceOptionService_1 = require("../services/serviceOptionService");
const path_1 = __importDefault(require("path"));
const createServiceOption = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const image = req.file ? path_1.default.relative(process.cwd(), req.file.path) : "";
        const serviceOptionData = Object.assign(Object.assign({}, req.body), { image: image });
        const serviceOption = yield serviceOptionService_1.serviceOptionService.create(serviceOptionData);
        return res.status(201).json({
            statusCode: 201,
            message: "Service option created successfully",
            serviceOption: serviceOption,
        });
    }
    catch (error) {
        next(new errorHandle_1.ErrorHandler(400, "Error creating service option", {
            errorMessage: error.message,
            stack: error.stack,
        }));
    }
});
const getAllServiceOptions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceOptions = yield serviceOptionService_1.serviceOptionService.getAll();
        return res.status(200).json({
            statusCode: 200,
            serviceOptions,
        });
    }
    catch (error) {
        next(new errorHandle_1.ErrorHandler(500, "Error retrieving service options", {
            errorMessage: error.message,
            stack: error.stack,
        }));
    }
});
const updateServiceOption = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const image = req.file ? req.file.path : "";
        const serviceOption = yield serviceOptionService_1.serviceOptionService.update(id, {
            title,
            description,
            image,
        });
        if (!serviceOption) {
            return next(new errorHandle_1.ErrorHandler(404, "Service option not found"));
        }
        return res.status(200).json({
            statusCode: 200,
            message: "Service option updated successfully",
            serviceOption,
        });
    }
    catch (error) {
        next(new errorHandle_1.ErrorHandler(400, "Error updating service option", {
            errorMessage: error.message,
            stack: error.stack,
        }));
    }
});
const deleteServiceOption = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const serviceOption = yield serviceOptionService_1.serviceOptionService.deleteOne(id);
        if (!serviceOption) {
            return next(new errorHandle_1.ErrorHandler(404, "Service option not found"));
        }
        return res.status(200).json({
            statusCode: 200,
            message: "Service option deleted successfully",
            serviceOption,
        });
    }
    catch (error) {
        next(new errorHandle_1.ErrorHandler(400, "Error deleting service option", {
            errorMessage: error.message,
            stack: error.stack,
        }));
    }
});
exports.serviceOptionController = {
    createServiceOption,
    getAllServiceOptions,
    updateServiceOption,
    deleteServiceOption,
};
