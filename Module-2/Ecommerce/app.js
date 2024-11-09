import express from "express";
import products from "./productDB.js";
import bodyParser from "body-parser";
let productsData = products || [];

const app = express();

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello Page");
});

app.get("/products", (req, res) => {
  try {
    res.status(200).send(productsData);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const product = productsData.find((product) => product.id === parseInt(id));
  if (product) {
    res.status(200).send(product);
  } else {
    res.status(404).send("Product Not Found");
  }
});

app.delete("/products", (req, res) => {
  try {
    // delete all the products
    productsData = [];
    res.status(200).send("All Products deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  try {
    productsData = productsData.filter(
      (product) => product.id !== parseInt(id)
    );
    res.status(200).send(`Product with id ${id} deleted successfully`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/products", express.json(), (req, res) => {
  try {
    const product = req.body;
    const { title, price, description, category, image, rating } = product;

    if (!title || !price || !description || !category || !image || !rating) {
      return res.status(400).send("Product data is required");
    }

    const id = productsData.length + 1;
    productsData.push({ ...product, id });
    res.status(201).send(productsData[productsData.length - 1]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.put("/products/:id", express.json(), (req, res) => {
  const { id } = req.params;
  const product = req.body;

  const { title, price, description, category, image, rating } = product;

  if (!title || !price || !description || !category || !image || !rating) {
    return res.status(400).send("Product data is required");
  }

  try {
    const index = productsData.findIndex(
      (product) => product.id === parseInt(id)
    );
    if (index !== -1) {
      productsData[index] = { ...product, id: parseInt(id) };
      res.status(200).send(productsData[index]);
    } else {
      res.status(404).send("Product Not Found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.patch("/products/:id", express.json(), (req, res) => {
  const { id } = req.params;
  const product = req.body;

  try {
    const index = productsData.findIndex(
      (product) => product.id === parseInt(id)
    );
    if (index !== -1) {
      productsData[index] = { ...productsData[index], ...product };
      res.status(200).send(productsData[index]);
    } else {
      res.status(404).send("Product Not Found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// control is reaching here
// because the above routes are not matching
app.use((req, res) => {
  res.status(404).send("Sorry!, Invalid Path");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
