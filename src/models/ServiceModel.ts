//serviceModel
import mongoose, { Schema, Document } from "mongoose";

export interface IService extends Document {
  title: string;
  description: string;
  img: string;
  icon: string;
  points: string[];
  options: mongoose.Types.ObjectId[];
  comments: mongoose.Types.ObjectId[];
}

const ServiceSchema: Schema<IService> = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  img: { type: String, required: true },
  icon: { type: String, required: true },
  points: [{ type: String }],
  options: [{ type: mongoose.Schema.Types.ObjectId, ref: "ServiceOption" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

const ServiceModel = mongoose.model<IService>("Service", ServiceSchema);

export default ServiceModel;
