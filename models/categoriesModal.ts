import mongoose, { Document, Schema } from "mongoose";

export interface ICategories extends Document {
  name: string;
}

const CategoriesSchema = new Schema(
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
  mongoose.models.categories ||
  mongoose.model<ICategories>("categories", CategoriesSchema);
export default Dataset;
