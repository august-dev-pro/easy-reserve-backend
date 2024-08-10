// commentModel

import mongoose, { Schema, Document } from "mongoose";

export interface IComment extends Document {
  user: mongoose.Types.ObjectId;
  serviceId: mongoose.Types.ObjectId;
  text: string;
  date: Date;
  visible?: boolean;
  likes?: number;
}

const CommentSchema: Schema<IComment> = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
  visible: { type: Boolean, default: true },
  likes: { type: Number, default: 0 },
});

const CommentModel = mongoose.model<IComment>("Comment", CommentSchema);

export default CommentModel;
