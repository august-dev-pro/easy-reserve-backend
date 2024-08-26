//taskerSpecificsModel

import mongoose, { Schema, Document } from "mongoose";

export interface ITaskerSpecifics extends Document {
  user: mongoose.Types.ObjectId;
  domaine: mongoose.Types.ObjectId;
  serviceOfferedOptions: mongoose.Types.ObjectId[];
  experienceYears: number;
  bio: string;
  rate: number;
  location: string;
  availability: string[];
  status: "new" | "medium" | "expert";
}

const TaskerSpecificsSchema: Schema<ITaskerSpecifics> = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  domaine: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  serviceOfferedOptions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "ServiceOption" },
  ],
  experienceYears: { type: Number, required: true },
  bio: { type: String, required: true },
  rate: { type: Number },
  location: { type: String, required: true },
  availability: [{ type: String }],
  status: {
    type: String,
    enum: ["new", "medium", "expert"],
    default: "new",
  },
});

const TaskerSpecificsModel = mongoose.model<ITaskerSpecifics>(
  "TaskerSpecifics",
  TaskerSpecificsSchema
);

export default TaskerSpecificsModel;
