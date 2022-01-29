import { Response, NextFunction } from "express";
import { User } from "../../database";
import { IUserRequest } from "../../interfaces";

export const signup = async (req: IUserRequest, res: Response, next: NextFunction) => {
  try {
    const user = new User();
    await user.add(req.body);
    return res
      .status(200)
      .json({ success: true, message: `Sucessfully Creating a new user account with role: ${req.body.role}` });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
