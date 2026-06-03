import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
      minlength: 2,
      maxlength: 100
    },

    image: {
      type: String,
      required: [true, "Product image is required"]
    },

    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: 0
    },

    description: {
      type: String,
      required: [true, "Product description is required"],
      minlength: 10
    },

    category: {
      type: String,
      required: [true, "Product category is required"],
      trim: true,
      lowercase: true
    }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;