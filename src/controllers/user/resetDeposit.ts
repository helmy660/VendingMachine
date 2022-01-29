import { Response, NextFunction, Request } from "express";
import { User } from "../../database";

export const resetDeposit = async (req: Request & { payload: any }, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.payload;
    const user = new User();
    const deposit = await user.resetDeposit(userId);
    if (deposit)
      return res.status(200).json({
        success: true,
        message: `Sucessfully reset your deposit. Please get your ${deposit} coins from the machine door`,
      });
    else
      return res.status(200).json({
        success: true,
        message: "You already don't have deposit in your account",
      });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
