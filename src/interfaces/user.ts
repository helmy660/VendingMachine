import { Document } from "mongoose";
import { Enums } from "../util";

export interface IUser extends Document {
  username: string;
  password: string;
  deposit: number;
  role: Enums.UserRoles;
  generateHash?(password: string): Promise<string>;
  validPassword?(givenPassword: string, userPassword: string): Promise<boolean>;
}
