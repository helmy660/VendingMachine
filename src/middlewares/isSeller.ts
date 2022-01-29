import { Request, Response, NextFunction } from "express";
import { User } from "../database";
import { CustomError, ErrorTypes } from "../services";
import { Enums } from "../util";

export async function isSeller(req: Request & { payload: any }, res: Response, next: NextFunction) {
  try {
    const { userId } = req.payload;
    if (!userId) {
      throw new CustomError(ErrorTypes.INVALID_USER_ID);
    }
    const user = new User();
    const userData = await user.getById(userId);
    if (userData.role !== Enums.UserRoles.SELLER) {
      throw new CustomError(ErrorTypes.USER_NOT_AUTHORIZED);
    }
    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
}
