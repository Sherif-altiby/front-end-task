import express from "express";
import cors from "cors";

import { globalErrorHandler } from "./middlewares/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import { notFoundHandler } from "./middlewares/notfound.middleware.js";

const app = express();

app.use(
  cors({
    origin: "https://front-end-task-azure.vercel.app/",
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// 404 (SAFE FOR EXPRESS 5)
app.use(notFoundHandler);


// Global Error Handler (MUST BE LAST)
app.use(globalErrorHandler);

export default app;