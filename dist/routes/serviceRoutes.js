"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const serviceController_1 = require("../controllers/serviceController");
const uploadMiddleware_1 = require("../middlewares/uploadMiddleware");
const uploadErrorHandler_1 = __importDefault(require("../utils/uploadErrorHandler"));
const ServiceRouter = (0, express_1.Router)();
//service routes
ServiceRouter.get("/", serviceController_1.serviceController.getAllServices);
ServiceRouter.post("/", uploadMiddleware_1.uploadMiddleware.uploadImage("serviceFronteImage").single("frontImage"), serviceController_1.serviceController.createService, uploadErrorHandler_1.default);
ServiceRouter.route("/:id")
    .get(serviceController_1.serviceController.getServiceById)
    .put(serviceController_1.serviceController.updateService)
    .delete(serviceController_1.serviceController.deleteOneService);
ServiceRouter.post("/delete-many", serviceController_1.serviceController.deleteManyService);
exports.default = ServiceRouter;
