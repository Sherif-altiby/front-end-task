import mongoose from "mongoose";

const connectDB = async () => {
  return mongoose.connect(process.env.MONGO_DB)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
      console.log("DB Error:", err);
      process.exit(1);
    });
};

export default connectDB;