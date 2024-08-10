//reservationModel

import mongoose, { Schema, Document } from "mongoose";

export interface IReservation extends Document {
  user: mongoose.Types.ObjectId;
  tasker: mongoose.Types.ObjectId;
  service: mongoose.Types.ObjectId;
  options: mongoose.Types.ObjectId[];
  reservaterAdress: string;
  date: Date;
  wever: string;
  status: "pending" | "confirmed" | "completed" | "canceled";
  taskDescription: string;
}

const ReservationSchema: Schema<IReservation> = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tasker: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  options: [{ type: mongoose.Schema.Types.ObjectId, ref: "ServiceOption" }],
  reservaterAdress: { type: String, required: true },
  date: { type: Date, required: true },
  wever: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "canceled"],
    default: "pending",
  },
  taskDescription: { type: String },
});

const ReservationModel = mongoose.model<IReservation>(
  "Reservation",
  ReservationSchema
);

export default ReservationModel;
