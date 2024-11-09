// Auntheitcation and Authorization Middleware
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const verifyToken = async (req, res, next) => {
  console.log(`inside verifyToken`);
  const authHeader = req.headers["x-access-token"];

  if (!authHeader) {
    return res.status(403).json({ message: "Token is missing" });
  }

  const tokenString = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(tokenString, "myRandomSecretKey");
    req.userId = payload.userId;

    const user = await userModel.findOne({ userId: payload.userId });
    req.user = user;

    next();
    console.log(`token verified successfully for user: ${payload.userId}`);
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

export const VerifyAdminOrSeller = (req, res, next) => {
  if (req.user.role === "admin" || req.user.role === "seller") {
    next();
  } else {
    res
      .status(403)
      .json({ message: "you are not authorized to access this Route" });
  }
};

export const VerifyAdmin = (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
};
