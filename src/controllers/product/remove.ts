import { Request, Response, NextFunction } from "express";
import { CustomError, ErrorTypes } from "../../services";
import { Product } from "../../database";

export const remove = async (req: Request & { payload: any }, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.payload;
    const { productId } = req.body;
    const product = new Product();
    const productData = await product.getById(productId);

    if (productData.sellerId !== userId) throw new CustomError(ErrorTypes.USER_NOT_AUTHORIZED);

    await product.remove(productId);
    return res
      .status(200)
      .json({ success: true, message: `Successfully remove the product ${productData.productName}` });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
