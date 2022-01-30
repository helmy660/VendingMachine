import { Response, NextFunction } from "express";
import { CustomError, ErrorTypes } from "../../services";
import { Product } from "../../database";
import { IProductRequest } from "../../interfaces";

export const create = async (
  req: IProductRequest & { payload: { userId: string } },
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productName, amountAvailable, cost } = req.body;
    const { userId } = req.payload;
    const product = new Product();
    const existing_product_name = await product.getByProductName(productName.toUpperCase());

    if (existing_product_name) throw new CustomError(ErrorTypes.PRODUCT_EXISTING);

    await product.add({ productName: productName.toUpperCase(), amountAvailable, cost, sellerId: userId });
    return res
      .status(200)
      .json({ success: true, message: `Sucessfully Creating a new product with name: ${productName.toUpperCase()}` });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
