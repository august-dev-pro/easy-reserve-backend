import { Router } from "express";
import { reservationController } from "../controllers/reservationController";

const reservationRouter = Router();

//routes
reservationRouter.get("/", reservationController.getAllReservation);
reservationRouter.post("/", reservationController.createReservation);
reservationRouter
  .route("/:reservationId")
  .get(reservationController.getReservationById)
  .put(reservationController.updateReservation)
  .delete(reservationController.deleteOneReservation);
reservationRouter.post(
  "/delete-many",
  reservationController.deleteManyReservation
);

export default reservationRouter;
