import mongoose, { Document, Schema } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  phone_no: string;
  message: string;
}

const contactSchema = new Schema(
  {
    name: { type: String, maxlength: 46 },
    email: { type: String, required: true, maxlength: 96 },
    phone_no: { type: String, required: true, maxlength: 15 },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

let Dataset =
  mongoose.models.contact || mongoose.model<IContact>("contact", contactSchema);
export default Dataset;
