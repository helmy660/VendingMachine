import { Response, NextFunction, Request } from "express";
import { validationResult } from "express-validator";
import { CustomError, ErrorTypes } from "../services";

export function validator(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const InvalidData = errors.array().map((item: any) => item.msg);
    throw new CustomError({
      code: ErrorTypes.VALIDATION_ERROR.code,
      message: `${ErrorTypes.VALIDATION_ERROR.message}. ${InvalidData[0]}`,
    });
  }
  next();
}
