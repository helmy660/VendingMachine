import { Response, NextFunction, Request } from "express";
import { CustomError, ErrorTypes } from "../../services";
import { Product } from "../../database";

export const updateCost = async (req: Request & { payload: any }, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.payload;
    const { productId, cost } = req.body;
    const product = new Product();

    const productData = await product.getById(productId);
    if (productData.sellerId !== userId) throw new CustomError(ErrorTypes.USER_NOT_AUTHORIZED);

    await product.updateCost(productId, cost);
    return res
      .status(200)
      .json({ success: true, message: `Sucessfully change the price of product ${productData.productName}` });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
