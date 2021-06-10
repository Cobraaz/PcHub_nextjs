import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "models/userModel";

export interface IOrder extends Document {
  user: IUser["_id"];
  address: string;
  mobile: string;
  cart: [];
  total: number;
  paymentId: string;
  method: string;
  delivered?: boolean;
  paid?: boolean;
  dateOfPayment?: Date;
}

const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    address: String,
    mobile: String,
    cart: Array,
    total: Number,
    paymentId: String,
    method: String,
    delivered: {
      type: Boolean,
      default: false,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    dateOfPayment: Date,
  },
  {
    timestamps: true,
  }
);

let Dataset =
  mongoose.models.order || mongoose.model<IOrder>("order", orderSchema);
export default Dataset;
