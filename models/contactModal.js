import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
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
  mongoose.models.contact || mongoose.model("contact", contactSchema);
export default Dataset;
