import { Request } from "express";
import { Enums } from "../util";

export interface IUserRequest extends Request {
  body: {
    username: string;
    password: string;
    role: Enums.UserRoles;
  };
}

export interface IUserUpdateRequest extends Request {
  query: {
    username: string;
    password: string;
  };
}

export interface IProductRequest extends Request {
  body: {
    productName: string;
    amountAvailable: number;
    cost: number;
  };
}
