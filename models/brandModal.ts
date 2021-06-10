import mongoose, { Document, Schema } from "mongoose";

export interface IBrand extends Document {
  name: string;
}

const BrandSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

let Dataset =
  mongoose.models.brand || mongoose.model<IBrand>("brand", BrandSchema);
export default Dataset;
