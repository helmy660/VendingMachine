import { Request, Response, NextFunction } from "express";
import { CustomError, ErrorTypes } from "../../services";
import { User, Product } from "../../database";

export const buy = async (req: Request & { payload: any }, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.payload;
    const { productId, amount } = req.body;
    const user = new User();
    const product = new Product();

    const userData = await user.getById(userId);
    const productData = await product.getById(productId);
    const total_cost = productData.cost * amount;

    if (productData.amountAvailable === 0) {
      throw new CustomError(ErrorTypes.PRODUCT_OUT_OF_STOCK);
    }

    if (productData.amountAvailable < amount) {
      throw new CustomError(ErrorTypes.PRODUCT_AVAILABLE_AMOUNT);
    }

    if (userData.deposit < total_cost) {
      throw new CustomError(ErrorTypes.USER_EMPTY_DEPOSIT);
    }

    await Promise.all([user.updateDeposit(userId, -total_cost), product.updateAmount(productId, -amount)]);

    return res.status(200).json({
      success: true,
      message: `You buy ${amount} piece of ${productData.productName}. You now have ${
        userData.deposit - total_cost
      } as your deposit`,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
