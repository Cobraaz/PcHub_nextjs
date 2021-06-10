import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "models/userModel";
export interface IProduct extends Document {
  title: string;
  price: number;
  description: string;
  content: string;
  images: [];
  category: string;
  checked?: boolean;
  inStock?: number;
  sold?: number;
  brand: string;
  likes: [
    {
      user: IUser["_id"];
    }
  ];
  comments: [
    {
      user: IUser["_id"];
      text: string;
      name: string;
      avatar?: string;
      date?: Date;
      likes: [
        {
          user: IUser["_id"];
        }
      ];
    }
  ];
}

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    inStock: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    brand: {
      type: String,
      required: true,
    },
    likes: [
      {
        user: {
          type: mongoose.Types.ObjectId,
          ref: "user",
        },
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Types.ObjectId,
          ref: "user",
        },
        text: {
          type: String,
          required: true,
        },
        name: {
          type: String,
        },
        avatar: {
          type: String,
          default:
            "https://res.cloudinary.com/cobraaz/image/upload/v1595762337/gez4i626tlesoe3plwn7.jpg",
        },
        date: {
          type: Date,
          default: Date.now,
        },
        likes: [
          {
            user: {
              type: mongoose.Types.ObjectId,
              ref: "user",
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

let Dataset =
  mongoose.models.product || mongoose.model<IProduct>("product", productSchema);
module.exports = Dataset;
