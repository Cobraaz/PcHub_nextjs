import mongoose, { Document, Schema } from "mongoose";

export enum Role {
  user = "user",
  admin = "admin",
  root = "root",
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role?: Role;
  avatar?: string;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "root"],
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/cobraaz/image/upload/v1595762337/gez4i626tlesoe3plwn7.jpg",
    },
  },
  {
    timestamps: true,
  }
);

let Dataset = mongoose.models.user || mongoose.model<IUser>("user", userSchema);
export default Dataset;
