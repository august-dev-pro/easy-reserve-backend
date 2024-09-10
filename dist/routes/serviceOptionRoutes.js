"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const serviceOptionController_1 = require("../controllers/serviceOptionController");
const uploadMiddleware_1 = require("../middlewares/uploadMiddleware");
const uploadErrorHandler_1 = __importDefault(require("../utils/uploadErrorHandler"));
const serviceOptionsRouter = (0, express_1.Router)();
serviceOptionsRouter.post("/", uploadMiddleware_1.uploadMiddleware.uploadImage("serviceOptionsImage").single("image"), serviceOptionController_1.serviceOptionController.createServiceOption, uploadErrorHandler_1.default);
serviceOptionsRouter.get("/", serviceOptionController_1.serviceOptionController.getAllServiceOptions);
serviceOptionsRouter.put("/:id", serviceOptionController_1.serviceOptionController.updateServiceOption);
serviceOptionsRouter.delete("/:id", serviceOptionController_1.serviceOptionController.deleteServiceOption);
exports.default = serviceOptionsRouter;
