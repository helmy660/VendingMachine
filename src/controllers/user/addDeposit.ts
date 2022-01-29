import { Response, NextFunction, Request } from "express";
import { User } from "../../database";

export const addDeposit = async (req: Request & { payload: any }, res: Response, next: NextFunction) => {
  try {
    const user = new User();
    const { userId } = req.payload;
    const { deposit } = req.body;
    await user.addDeposit(userId, deposit);
    return res.status(200).json({
      success: true,
      message: `Sucessfully add deposit ${deposit} cent coins into your vending machine account`,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
