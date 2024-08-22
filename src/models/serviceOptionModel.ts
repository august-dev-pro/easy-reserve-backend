// src/models/serviceOptionModel.ts

import mongoose, { Document, Schema } from "mongoose";

export interface IServiceOption extends Document {
  name: string;
  description: string;
  image: string;
}

const serviceOptionSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
});

const ServiceOptionModel = mongoose.model<IServiceOption>(
  "ServiceOption",
  serviceOptionSchema
);

export default ServiceOptionModel;
