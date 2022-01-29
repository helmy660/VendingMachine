import { Enums } from "../util";

export interface IUser {
  username: string;
  password: string;
  role: Enums.UserRoles;
  deposit?: number;
  generateHash?(password: string): Promise<string>;
  validPassword?(givenPassword: string, userPassword: string): Promise<boolean>;
}
