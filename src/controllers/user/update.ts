import { Request, Response, NextFunction } from "express";
import { User } from "../../database";

export const update = async (req: Request & { payload: any }, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.payload;
    const { newPassword } = req.body;
    const user = new User();
    await user.update(userId, newPassword);
    return res.status(200).json({ success: true, message: `Successfully update the user ${userId}` });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
