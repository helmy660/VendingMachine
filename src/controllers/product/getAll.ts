import { Response, NextFunction, Request } from "express";
import { Product } from "../../database";

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = new Product();
    const available_products = await product.getAll();
    return res.status(200).json({ success: true, available_products });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
