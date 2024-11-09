import express from "express";
import { signIn, register, signUp } from "../controllers/user.controller.js"; // Adjust the path as needed

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello User");
});
router.post("/signin", express.json(), signIn);
router.post("/register", express.json(), register);
router.post("/signup", express.json(), signUp);

export default router;
