import { NextFunction, Response, Request } from "express";
import { ErrorHandler } from "../utils/errorHandle";
import { reservationService } from "../services/reservationService";
import { IReservation } from "../models/reservationModel";

const getAllReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reservations = await reservationService.getAll();
    if (reservations.length < 1) {
      return res.status(200).json({
        statusCode: 200,
        message: "aucune reservation trouvé",
        reservations: reservations,
      });
    }
    return res.status(200).json({
      statusCode: 200,
      message: "les reservations ont bien ete recuperés",
      reservations: reservations,
    });
  } catch (error: any) {
    return next(
      new ErrorHandler(
        400,
        `une erreur s'est produite lors de la recuperation des reservation`,
        {
          errorMessage: error.message,
          stack: error.stack,
        }
      )
    );
  }
};

const getReservationById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reservationId: string = req.body;
  try {
    const reservation = await reservationService.getById(reservationId);
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
  } catch (error: any) {
    return next(
      new ErrorHandler(
        400,
        `une erreur s'est produite lors de la recuperation du service ${reservationId}`,
        {
          errorMessage: error.message,
          stack: error.stack,
        }
      )
    );
  }
};

const createReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reservationData: IReservation = req.body;
  try {
    const reservation = await reservationService.create(reservationData);
    return res.status(201).json({
      statusCode: 201,
      message: `la reservation a bien ete enregistré`,
      reservation: reservation,
    });
  } catch (error: any) {
    return next(
      new ErrorHandler(
        400,
        `une erreur s'est produite lors de la creation de la reservation`,
        {
          errorMessage: error.message,
          stack: error.stack,
        }
      )
    );
  }
};

const updateReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { reservationId, newReservationData } = req.body;
  try {
    const newRaservation = await reservationService.update(
      reservationId,
      newReservationData
    );
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
  } catch (error: any) {
    return next(
      new ErrorHandler(
        400,
        `une erreur s'est produite lors de la mise a jour de la reservation ${reservationId}`,
        {
          errorMessage: error.message,
          stack: error.stack,
        }
      )
    );
  }
};

const deleteOneReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reservationId = req.params.reservationId;
  try {
    const deletedReservation = await reservationService.deleteOne(
      reservationId
    );
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
  } catch (error: any) {
    return next(
      new ErrorHandler(
        400,
        `une erreur s'est produite lors de supression de la reservation ${reservationId}`,
        {
          errorMessage: error.message,
          stack: error.stack,
        }
      )
    );
  }
};
const deleteManyReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reservationsIds: string[] = req.body;
  try {
    const deletedReservations = await reservationService.deleteMany(
      reservationsIds
    );

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
  } catch (error: any) {
    return next(
      new ErrorHandler(
        400,
        `une erreur s'est produite lors de la supression des reservation ${reservationsIds}`,
        {
          errorMessage: error.message,
          stack: error.stack,
        }
      )
    );
  }
};

export const reservationController = {
  getAllReservation,
  getReservationById,
  updateReservation,
  deleteManyReservation,
  deleteOneReservation,
  createReservation,
};
