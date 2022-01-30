import { ProductModel } from "../models";
import { IProduct } from "../interfaces";
import { CustomError, ErrorTypes } from "../services";

export class Product {
  async add(data: IProduct) {
    try {
      return await ProductModel.create({
        productName: data.productName,
        amountAvailable: data.amountAvailable,
        cost: data.cost,
        sellerId: data.sellerId,
      });
    } catch (error) {
      console.log(error);
      throw new CustomError(ErrorTypes.PRODUCT_ADDING);
    }
  }

  async updateAmount(id: string, amount: number) {
    try {
      return await ProductModel.updateOne({ _id: id }, { $inc: { amountAvailable: amount } });
    } catch (error) {
      console.log(error);
      throw new CustomError(ErrorTypes.PRODUCT_AMOUNT_UPDATING);
    }
  }

  async updateCost(id: string, cost: number) {
    try {
      return await ProductModel.updateOne({ _id: id }, { cost });
    } catch (error) {
      console.log(error);
      throw new CustomError(ErrorTypes.PRODUCT_COST_UPDATING);
    }
  }

  async getById(id: string) {
    try {
      const product = await ProductModel.findOne({ _id: id }, { __v: 0, _id: 0 });
      if (product) return product;
      else throw new Error();
    } catch (error) {
      console.log(error);
      throw new CustomError(ErrorTypes.INVALID_PRODUCT);
    }
  }

  async getByProductName(name: string) {
    try {
      const product = await ProductModel.findOne({ productName: name });
      if (product) return product.productName;
      else null;
    } catch (error) {
      console.log(error);
      throw new CustomError(ErrorTypes.INVALID_PRODUCT);
    }
  }

  async getAll() {
    try {
      const product = await ProductModel.find({}, { __v: 0, createdAt: 0, updatedAt: 0, sellerId: 0 });
      if (product) return product;
      else throw new Error();
    } catch (error) {
      console.log(error);
      throw new CustomError({
        code: ErrorTypes.INVALID_ACTION.code,
        message: `${ErrorTypes.INVALID_ACTION.message}. Failed to list the available products`,
      });
    }
  }

  async remove(id: string) {
    try {
      return await ProductModel.deleteOne({ _id: id });
    } catch (error) {
      console.log(error);
      throw new CustomError({
        code: ErrorTypes.INVALID_ACTION.code,
        message: `${ErrorTypes.INVALID_ACTION.message}. Failed to remove this product`,
      });
    }
  }

  async removeBySeller(sellerId: string) {
    try {
      return await ProductModel.deleteMany({ sellerId });
    } catch (error) {
      console.log(error);
      throw new CustomError({
        code: ErrorTypes.INVALID_ACTION.code,
        message: `${ErrorTypes.INVALID_ACTION.message}. Failed to remove this product`,
      });
    }
  }
}
