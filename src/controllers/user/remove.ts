import { Request, Response, NextFunction } from "express";
import { Product, User } from "../../database";

export const remove = async (req: Request & { payload: any }, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.payload;
    const user = new User();
    const prodcut = new Product();
    await user.getById(userId);
    await user.remove(userId);
    await prodcut.removeBySeller(userId);
    return res.status(200).json({ success: true, message: `Successfully remove the user ${userId}` });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
