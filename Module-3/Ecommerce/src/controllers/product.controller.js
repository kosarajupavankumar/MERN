import productsModel from "../models/product.model.js"; // Adjust the path as needed
import mongoose from "mongoose";

export const getAllProducts = async (req, res) => {
  try {
    const products = await productsModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {

  const product = new productsModel(req.body);
  try {
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  // Validate the id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid product ID");
  }

  try {
    const product = await productsModel.findById(id);
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(404).send("Product Not Found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateProductById = async (req, res) => {
  const { id } = req.params;

  // Validate the id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid product ID");
  }

  try {
    const product = await productsModel.findById(id);
    if (!product) {
      return res.status(404).send("Product Not Found");
    }

    // Update the product
    const updatedProduct = await productsModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).send(updatedProduct);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteProductById = async (req, res) => {
  const { id } = req.params;

  // Validate the id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid product ID");
  }

  try {
    const product = await productsModel.findById(id);
    if (!product) {
      return res.status(404).send("Product Not Found");
    }

    // Delete the product
    await productsModel.findByIdAndDelete(id);
    res.status(200).send("Product Deleted");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
