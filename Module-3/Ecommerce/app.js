import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import productRoutes from "./src/views/product.routes.js"; // Adjust the path as needed
import authRoutes from "./src/views/auth.routes.js"; // Adjust the path as needed
import cors from "cors";

const app = express();

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.w0f47va.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.log("Error connecting to the database", error.message);
  });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use the API versioning for product routes
app.use("/ecommerce/api/v1/products", productRoutes);
app.use("/ecommerce/api/v1/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
