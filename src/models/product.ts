import mongoose, { Schema } from "mongoose";
import { IProduct } from "../interfaces";

const ProductSchema: Schema = new Schema(
  {
    productName: { type: String, required: true },
    amountAvailable: { type: Number, default: 0 },
    cost: { type: Number, required: true },
    sellerId: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const ProductModel = mongoose.model<IProduct>("Product", ProductSchema);
