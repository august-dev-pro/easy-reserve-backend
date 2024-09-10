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
exports.reservationService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const reservationModel_1 = __importDefault(require("../models/reservationModel"));
const errorHandle_1 = require("../utils/errorHandle");
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allReservations = yield reservationModel_1.default.find();
        return allReservations;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(400, `erreur lors de la recuperation des reservations `, {
            errorMessage: error.message,
            stack: error.stack,
        });
    }
});
const getById = (reservationId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reservation = yield reservationModel_1.default.findById(reservationId);
        return reservation;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(400, `erreur lors de `, {
            errorMessage: error.message,
            stack: error.stack,
        });
    }
});
const update = (reservationId, newReservationData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newReservation = yield reservationModel_1.default.findByIdAndUpdate(reservationId, newReservationData);
        return newReservation;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(400, `erreur lors de la mise a jour de la reservation `, {
            errorMessage: error.message,
            stack: error.stack,
        });
    }
});
const deleteOne = (reservationId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedReservation = yield reservationModel_1.default.findByIdAndDelete(reservationId);
        return deletedReservation;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(400, `erreur lors de `, {
            errorMessage: error.message,
            stack: error.stack,
        });
    }
});
const deleteMany = (reservationsIds) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield reservationModel_1.default.deleteMany({
            _id: {
                $in: reservationsIds.map((id) => new mongoose_1.default.Types.ObjectId(id)),
            },
        });
        if (result.deletedCount === 0) {
            throw new errorHandle_1.ErrorHandler(500, "No reservation were deleted");
        }
        return result.deletedCount > 0
            ? yield reservationModel_1.default.find({
                _id: {
                    $in: reservationsIds.map((id) => new mongoose_1.default.Types.ObjectId(id)),
                },
            })
            : null;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(400, `erreur lors de `, {
            errorMessage: error.message,
            stack: error.stack,
        });
    }
});
const create = (reservationData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reservation = yield reservationModel_1.default.create(reservationData);
        return reservation;
    }
    catch (error) {
        throw new errorHandle_1.ErrorHandler(400, `erreur lors de la creation de la reservation `, {
            errorMessage: error.message,
            stack: error.stack,
        });
    }
});
exports.reservationService = {
    getAll,
    getById,
    update,
    deleteOne,
    deleteMany,
    create,
};
