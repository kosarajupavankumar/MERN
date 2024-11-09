import express from "express";
import {
  getAllProducts,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
} from "../controllers/product.controller.js";
import {
  verifyToken,
  VerifyAdminOrSeller,
  VerifyAdmin,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello Page");
});

router.get("/getAllProducts", getAllProducts); // No Authentication required and Authorization required
router.get(
  "/getProductById/:id",
  [verifyToken, VerifyAdminOrSeller],
  getProductById
); // Authentication required and Authorization required
router.post(
  "/createProduct",
  [verifyToken, VerifyAdminOrSeller, express.json()],
  createProduct
); // Authentication required and Authorization required
router.patch(
  "/updateProductById/:id",
  [verifyToken, VerifyAdminOrSeller, express.json()],
  updateProductById
); // Authentication required and Authorization required
router.delete(
  "/deleteProductById/:id",
  [verifyToken, VerifyAdmin],
  deleteProductById
); // Authentication required and Authorization required

export default router;
