import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "user" | "tasker" | "admin" | "admin & tasker" | "super-admin";
  profileImage: string;
  phone: string;
  address?: string;
  favorites?: number[];
  registrationDate?: Date;
}

const UserSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "tasker", "admin", "admin & tasker"],
    default: "user",
  },
  profileImage: { type: String },
  phone: { type: String, required: true },
  address: { type: String },
  registrationDate: { type: Date, default: Date.now },
});

const userModel = mongoose.model<IUser>("users", UserSchema);

export default userModel;
