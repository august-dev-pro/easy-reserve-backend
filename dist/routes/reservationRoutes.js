"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reservationController_1 = require("../controllers/reservationController");
const reservationRouter = (0, express_1.Router)();
//routes
reservationRouter.get("/", reservationController_1.reservationController.getAllReservation);
reservationRouter.post("/", reservationController_1.reservationController.createReservation);
reservationRouter
    .route("/:id")
    .get(reservationController_1.reservationController.getReservationById)
    .put(reservationController_1.reservationController.updateReservation)
    .delete(reservationController_1.reservationController.deleteOneReservation);
reservationRouter.post("/delete-many", reservationController_1.reservationController.deleteManyReservation);
exports.default = reservationRouter;
