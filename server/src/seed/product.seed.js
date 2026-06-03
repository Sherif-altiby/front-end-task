import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/product.model.js";

dotenv.config({ path: ".env" });

const categories = [
  "electronics",
  "fashion",
  "home",
  "sports",
  "books"
];

const connectDB = async () => {
  if (!process.env.MONGO_DB) {
    throw new Error("MONGO_DB is missing");
  }
  await mongoose.connect(process.env.MONGO_DB);
  console.log("MongoDB connected");
};

const generateProducts = () => {
  const products = [];
  let imageId = 1;

  categories.forEach((category) => {
    for (let i = 1; i <= 20; i++) {
      products.push({
        title: `${category} product ${i}`,
        description: `High quality ${category} product number ${i}`,
        price: Math.floor(Math.random() * 500) + 50,
        category,
        image: `https://picsum.photos/id/${imageId}/600/600`
      });

      imageId++; // ensures unique image
    }
  });

  return products;
};

const seedProducts = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    console.log("Old products deleted");

    const products = generateProducts();
    await Product.insertMany(products);

    console.log("✅ 100 products seeded successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedProducts();