import mongoose from "mongoose";
import ReservationModel, { IReservation } from "../models/reservationModel";

import { ErrorHandler } from "../utils/errorHandle";

const getAll = async (): Promise<IReservation[]> => {
  try {
    const allReservations = await ReservationModel.find();
    return allReservations;
  } catch (error: any) {
    throw new ErrorHandler(
      400,
      `erreur lors de la recuperation des reservations `,
      {
        errorMessage: error.message,
        stack: error.stack,
      }
    );
  }
};
const getById = async (reservationId: string): Promise<IReservation | null> => {
  try {
    const reservation = await ReservationModel.findById(reservationId);
    return reservation;
  } catch (error: any) {
    throw new ErrorHandler(400, `erreur lors de `, {
      errorMessage: error.message,
      stack: error.stack,
    });
  }
};
const update = async (
  reservationId: string,
  newReservationData: IReservation
): Promise<IReservation | null> => {
  try {
    const newReservation = await ReservationModel.findByIdAndUpdate(
      reservationId,
      newReservationData
    );
    return newReservation;
  } catch (error: any) {
    throw new ErrorHandler(
      400,
      `erreur lors de la mise a jour de la reservation `,
      {
        errorMessage: error.message,
        stack: error.stack,
      }
    );
  }
};
const deleteOne = async (
  reservationId: string
): Promise<IReservation | null> => {
  try {
    const deletedReservation = await ReservationModel.findByIdAndDelete(
      reservationId
    );
    return deletedReservation;
  } catch (error: any) {
    throw new ErrorHandler(400, `erreur lors de `, {
      errorMessage: error.message,
      stack: error.stack,
    });
  }
};
const deleteMany = async (
  reservationsIds: string[]
): Promise<IReservation[] | null> => {
  try {
    const result = await ReservationModel.deleteMany({
      _id: {
        $in: reservationsIds.map((id) => new mongoose.Types.ObjectId(id)),
      },
    });
    if (result.deletedCount === 0) {
      throw new ErrorHandler(500, "No reservation were deleted");
    }

    return result.deletedCount > 0
      ? await ReservationModel.find({
          _id: {
            $in: reservationsIds.map((id) => new mongoose.Types.ObjectId(id)),
          },
        })
      : null;
  } catch (error: any) {
    throw new ErrorHandler(400, `erreur lors de `, {
      errorMessage: error.message,
      stack: error.stack,
    });
  }
};

const create = async (reservationData: IReservation) => {
  try {
    const reservation = await ReservationModel.create(reservationData);
    return reservation;
  } catch (error: any) {
    throw new ErrorHandler(
      400,
      `erreur lors de la creation de la reservation `,
      {
        errorMessage: error.message,
        stack: error.stack,
      }
    );
  }
};

export const reservationService = {
  getAll,
  getById,
  update,
  deleteOne,
  deleteMany,
  create,
};
