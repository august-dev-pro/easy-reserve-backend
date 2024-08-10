//taskerSpecificsModel

import mongoose, { Schema, Document } from "mongoose";

export interface ITaskerSpecifics extends Document {
  user: mongoose.Types.ObjectId;
  servicesOffered: mongoose.Types.ObjectId;
  servicesOfferedOptions: mongoose.Types.ObjectId[];
  experienceYears: number;
  bio: string;
  location: string;
  availability: string[];
}

const TaskerSpecificsSchema: Schema<ITaskerSpecifics> = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  servicesOffered: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  servicesOfferedOptions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "ServiceOption" },
  ],
  experienceYears: { type: Number, required: true },
  bio: { type: String, required: true },
  location: { type: String, required: true },
  availability: [{ type: String }],
});

const TaskerSpecificsModel = mongoose.model<ITaskerSpecifics>(
  "TaskerSpecifics",
  TaskerSpecificsSchema
);

export default TaskerSpecificsModel;
