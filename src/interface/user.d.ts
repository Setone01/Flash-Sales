import mongoose from "mongoose";

export interface UserI {
  _id: mongoose.Schema.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  purchasedProducts: {
    productId: mongoose.Schema.Types.ObjectId;
    quantity: number;
    purchasedAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
