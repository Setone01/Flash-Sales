import mongoose, { Schema } from "mongoose";
import { Product } from "../../interface";

const productSchema = new Schema<Product>(
  {
    name: { type: String, required: [true, "Product name is required"] },
    description: {
      type: String,
      required: true,
    },
    price: { type: Number, required: [true, "Product prce is required"] },
    stock: { type: Number, required: [true, "Stock is required"] },
    initialStock: {
      type: Number,
      required: [true, "Initial stock is required"],
    },
    salesActive: { type: Boolean, required: true },
    salesStartTime: { type: Date, required: true },
    salesEndTime: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

productSchema.index({ salesActive: 1, salesStartTime: 1 });

export const ProductModel = mongoose.model<Product>("Product", productSchema);
