import mongoose, { Schema } from "mongoose";
import { UserI } from "../../interface";

const userSchema = new Schema<UserI>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      auto: true, 
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    purchasedProducts: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        purchasedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.index({ email: 1 });

export const UserModel = mongoose.model<UserI>("User", userSchema);
