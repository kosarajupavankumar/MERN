import mongoose from "mongoose";
// create a schema
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    set: (value) => Math.round(value * 100) / 100,
  },
  description: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ["Electronics", "Apparel", "Accessories"],
  },
  image: { type: String, required: true },
  rating: {
    rate: {
      type: Number,
      min: 0,
      max: 5,
    },
    count: {
      type: Number,
      min: 0,
    },
  },
});

// create a model for schema
const productsModel = mongoose.model("Product", productSchema);

// export the model

export default productsModel;
