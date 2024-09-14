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
exports.reservationController = void 0;
const errorHandle_1 = require("../utils/errorHandle");
const reservationService_1 = require("../services/reservationService");
const getAllReservation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reservations = yield reservationService_1.reservationService.getAll();
        if (reservations.length < 1) {
            return res.status(200).json({
                statusCode: 200,
                message: "aucune reservation trouvé",
                reservations: reservationService_1.reservationService,
            });
        }
        return res.status(200).json({
            statusCode: 200,
            message: "les reservations ont bien ete recuperés",
            reservations: reservationService_1.reservationService,
        });
    }
    catch (error) {
        return next(new errorHandle_1.ErrorHandler(400, `une erreur s'est produite lors de la recuperation des reservation`, {
            errorMessage: error.message,
            stack: error.stack,
        }));
    }
});
const getReservationById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reservationId = req.body;
    try {
        const reservation = yield reservationService_1.reservationService.getById(reservationId);
        if (!reservation) {
            return res.status(404).json({
                statusCode: 404,
                message: `la reservation ${reservationId} n'a pas ete trouvé`,
            });
        }
        return res.status(200).json({
            statusCode: 200,
            message: `la reservation ${reservationId} a bien ete recuperé`,
            reservation: reservation,
        });
    }
    catch (error) {
        return next(new errorHandle_1.ErrorHandler(400, `une erreur s'est produite lors de la recuperation du service ${reservationId}`, {
            errorMessage: error.message,
            stack: error.stack,
        }));
    }
});
const createReservation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reservationData = req.body;
    try {
        const reservation = yield reservationService_1.reservationService.create(reservationData);
        return res.status(201).json({
            statusCode: 201,
            message: `la reservation a bien ete enregistré`,
            reservation: reservation,
        });
    }
    catch (error) {
        return next(new errorHandle_1.ErrorHandler(400, `une erreur s'est produite lors de la creation de la reservation`, {
            errorMessage: error.message,
            stack: error.stack,
        }));
    }
});
const updateReservation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { reservationId, newReservationData } = req.body;
    try {
        const newRaservation = yield reservationService_1.reservationService.update(reservationId, newReservationData);
        if (!newRaservation) {
            return res.status(404).json({
                statusCode: 404,
                message: `la reservation ${reservationId} n'a pas ete trouvé!`,
            });
        }
        return res.status(200).json({
            statusCode: 200,
            message: `la reservation ${reservationId} a bien ete mis a jour`,
            newReservation: newRaservation,
        });
    }
    catch (error) {
        return next(new errorHandle_1.ErrorHandler(400, `une erreur s'est produite lors de la mise a jour de la reservation ${reservationId}`, {
            errorMessage: error.message,
            stack: error.stack,
        }));
    }
});
const deleteOneReservation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reservationId = req.params.reservationId;
    try {
        const deletedReservation = yield reservationService_1.reservationService.deleteOne(reservationId);
        if (!deletedReservation) {
            return res.status(404).json({
                stausCode: 404,
                message: `la reservation ${reservationId} n'a pas ete trouvé`,
            });
        }
        return res.status(200).json({
            stausCode: 200,
            message: `la reservation ${reservationId} a bien ete suprimé`,
            reservationId: deletedReservation,
        });
    }
    catch (error) {
        return next(new errorHandle_1.ErrorHandler(400, `une erreur s'est produite lors de supression de la reservation ${reservationId}`, {
            errorMessage: error.message,
            stack: error.stack,
        }));
    }
});
const deleteManyReservation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reservationsIds = req.body;
    try {
        const deletedReservations = yield reservationService_1.reservationService.deleteMany(reservationsIds);
        if (!deletedReservations) {
            return res.status(404).json({
                stausCode: 404,
                message: `les reservations ${reservationsIds} n'ont pas ete trouvés`,
            });
        }
        return res.status(200).json({
            stausCode: 200,
            message: `les reservations ${reservationsIds} on bien ete suprimés`,
            reservationId: deletedReservations,
        });
    }
    catch (error) {
        return next(new errorHandle_1.ErrorHandler(400, `une erreur s'est produite lors de la supression des reservation ${reservationsIds}`, {
            errorMessage: error.message,
            stack: error.stack,
        }));
    }
});
exports.reservationController = {
    getAllReservation,
    getReservationById,
    updateReservation,
    deleteManyReservation,
    deleteOneReservation,
    createReservation,
};
