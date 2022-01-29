import bcrypt from "bcrypt";
import mongoose, { Schema } from "mongoose";
import { Enums } from "../util";
import { IUser } from "../interfaces";

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    deposit: { type: Number, default: 0 },
    role: { type: String, enum: Enums.UserRoles, required: true },
  },
  {
    timestamps: true,
  },
);

UserSchema.methods.generateHash = async (password: string) => {
  return await bcrypt.hash(password, bcrypt.genSaltSync(8));
};

UserSchema.methods.validPassword = async (givenPassword: string, userPassword: string) => {
  return await bcrypt.compare(givenPassword, userPassword);
};

export const UserModel = mongoose.model<IUser>("User", UserSchema);
