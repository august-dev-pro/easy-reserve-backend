"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.ErrorHandler = void 0;
class ErrorHandler extends Error {
    constructor(statusCode, message, stack) {
        super();
        this.statusCode = statusCode;
        this.message = message;
        this.stack = stack;
    }
}
exports.ErrorHandler = ErrorHandler;
const handleError = (err, res) => {
    const { statusCode, message, stack } = err;
    res.status(statusCode).json({
        status: "error",
        statusCode: statusCode,
        message: message,
        stack: stack,
    });
};
exports.handleError = handleError;
