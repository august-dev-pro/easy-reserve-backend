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
exports.serviceController = void 0;
const errorHandle_1 = require("../utils/errorHandle");
const serviceService_1 = require("../services/serviceService");
const path_1 = __importDefault(require("path"));
const getAllServices = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const services = yield serviceService_1.serviceService.getAll();
        if (services.length === 0) {
            return res.status(200).json({
                statutCode: 200,
                message: "aucun service trouvé",
                services: services,
            });
        }
        return res.status(200).json({
            statutCode: 200,
            message: "tous les services trouvés:",
            services: services,
        });
    }
    catch (error) {
        return next(new errorHandle_1.ErrorHandler(400, `une erreur s'est produite lors de la recuperation des services`, {
            errorMessage: error.message,
            stack: error.stack,
        }));
    }
});
const getServiceById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceId = req.params.serviceId;
    try {
        const service = yield serviceService_1.serviceService.getById(serviceId);
        if (!service) {
            return res.status(404).json({
                statusCode: 404,
                message: `service ${serviceId} non trouvé`,
            });
        }
        return res.status(200).json({
            status: 200,
            message: `service ${serviceId} a bien ete trouvé`,
            service: service,
        });
    }
    catch (error) {
        next(new errorHandle_1.ErrorHandler(400, `erreur lors de la recuperation du service ${serviceId}`, {
            errorMessage: error.message,
            stack: error.stack,
        }));
    }
});
const updateService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceId = req.params.serviceId;
    const newServiceData = req.body;
    try {
        const newService = yield serviceService_1.serviceService.update(serviceId, newServiceData);
        if (!newService) {
            return res.status(404).json({
                statusCode: 404,
                message: `service ${serviceId} non trouvé`,
            });
        }
        return res.status(200).json({
            statusCode: 200,
            message: `service ${serviceId} a bien ete mis a jour`,
        });
    }
    catch (error) {
        next(new errorHandle_1.ErrorHandler(400, `erreur lors de la mise a jour du service ${serviceId}`, {
            errorMessage: error.message,
            stack: error.stack,
        }));
    }
});
const deleteOneService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceId = req.params.serviceId;
    try {
        const service = yield serviceService_1.serviceService.deleteOne(serviceId);
        if (!service) {
            return res.status(404).json({
                statusCode: 404,
                message: `service ${serviceId} non trouvé`,
            });
        }
        return res.status(200).json({
            statusCode: 200,
            message: `service ${serviceId} a bien ete suprimé`,
        });
    }
    catch (error) {
        next(new errorHandle_1.ErrorHandler(400, ``, {
            errorMessage: error.message,
            stack: error.stack,
        }));
    }
});
const deleteManyService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const servicesIds = req.body;
    try {
        const services = yield serviceService_1.serviceService.deleteMany(servicesIds);
        if (!services) {
            return res.status(404).json({
                statusCode: 404,
                message: `les services ${servicesIds} n'ont pas ete trouvés`,
            });
        }
        return res.status(404).json({
            statusCode: 404,
            message: `les services ${servicesIds} ont bien ete suprimés`,
        });
    }
    catch (error) {
        next(new errorHandle_1.ErrorHandler(400, ``, {
            errorMessage: error.message,
            stack: error.stack,
        }));
    }
});
const createService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        return next(new errorHandle_1.ErrorHandler(400, "Aucune image n'a été envoyée"));
    }
    const frontImage = req.file
        ? path_1.default.relative(process.cwd(), req.file.path)
        : ""; // Chemin du fichier stocké
    const serviceData = req.body;
    const serviceDatas = Object.assign(Object.assign({}, serviceData), { frontImage: frontImage });
    try {
        const service = yield serviceService_1.serviceService.create(serviceDatas);
        return res.status(201).json({
            statusCode: 201,
            message: `la service a bien ete enregistré`,
            service: service,
        });
    }
    catch (error) {
        return next(new errorHandle_1.ErrorHandler(400, `une erreur s'est produite lors de la creation de la service`, {
            errorMessage: error.message,
            stack: error.stack,
        }));
    }
});
exports.serviceController = {
    getAllServices,
    getServiceById,
    updateService,
    deleteOneService,
    deleteManyService,
    createService,
};
