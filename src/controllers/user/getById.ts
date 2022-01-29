import { Response, NextFunction, Request } from "express";
import { User } from "../../database";

export const getById = async (req: Request & { payload: any }, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.payload;
    const user = new User();
    const userData = await user.getById(userId);
    return res.status(200).json({ success: true, userData });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
