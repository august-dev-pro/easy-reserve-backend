//reservationModel

import mongoose, { Schema, Document } from "mongoose";

export interface IReservation extends Document {
  userId: mongoose.Types.ObjectId;
  taskerId: mongoose.Types.ObjectId;
  serviceId: mongoose.Types.ObjectId;
  options: mongoose.Types.ObjectId[];
  adress: string;
  date: Date;
  wever: string;
  status: "pending" | "confirmed" | "completed" | "canceled";
  taskDescription: string;
  registrationDate: Date;
}

const ReservationSchema: Schema<IReservation> = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  taskerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  options: [{ type: mongoose.Schema.Types.ObjectId, ref: "ServiceOption" }],
  adress: { type: String, required: true },
  date: { type: Date, required: true },
  wever: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "canceled"],
    default: "pending",
  },
  taskDescription: { type: String },
  registrationDate: { type: Date, default: Date.now },
});

const ReservationModel = mongoose.model<IReservation>(
  "Reservation",
  ReservationSchema
);

export default ReservationModel;
