// reviewModel

import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  user: mongoose.Types.ObjectId;
  tasker: mongoose.Types.ObjectId;
  rating: number;
  text: string;
  date: Date;
}

const ReviewSchema: Schema<IReview> = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tasker: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const ReviewModel = mongoose.model<IReview>("Review", ReviewSchema);

export default ReviewModel;
