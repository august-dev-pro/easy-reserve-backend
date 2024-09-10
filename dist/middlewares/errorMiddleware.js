"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandle_1 = require("../utils/errorHandle");
const errorMiddleware = (err, req, res, next) => {
    (0, errorHandle_1.handleError)(err, res);
};
exports.default = errorMiddleware;
