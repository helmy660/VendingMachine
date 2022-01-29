import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../../database";
import { CustomError, ErrorTypes } from "../../services";
import { JWT_SECRET, JWT_EXPIRY } from "../../util/secrets";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = new User();
    const { username, password } = req.body;
    const userData = await user.getByUserName(username, password);
    console.log(JWT_SECRET);
    if (userData) {
      return res
        .status(200)
        .json({ success: true, token: jwt.sign({ userId: userData._id }, JWT_SECRET, { expiresIn: JWT_EXPIRY }) });
    } else {
      throw new CustomError(ErrorTypes.INVALID_CREDENTIALS);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
