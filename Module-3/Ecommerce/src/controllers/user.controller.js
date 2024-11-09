import userModel from "../models/user.model.js";
import { USER_ROLES, USER_STATUS } from "../utils/constants.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email, password);

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email or password is cannot be null" });
    }

    // check the hashed password in the database
    const user = await userModel.findOne({ email });

    // check the hashed password in the database and compare it with the password provided

    if (!user || !(await bcrypt.compareSync(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = await jwt.sign({ userId: user.userId }, "myRandomSecretKey", {
      expiresIn: "1h",
    });

    res.status(200).json({
      name: user.name,
      userId: user.userId,
      role: user.role,
      email: user.email,
      userStatus: user.userStatus,
      accessToken: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.create({ name, email, password });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signUp = async (req, res) => {
  try {
    const { name, email, password, role, userId } = req.body;

    if (!name || !email || !password || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!Object.values(USER_ROLES).includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // check if the user already exists in the database
    const existingUser = await userModel.findOne({
      $or: [{ email }, { userId }],
    });

    if (existingUser) {
      const message =
        existingUser.email === email
          ? "User already exists"
          : "User ID already exists";
      return res.status(400).json({ message });
    }

    // password hashing and salting
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userStatus =
      role === USER_ROLES.CUSTOMER ? USER_STATUS.APPROVED : USER_STATUS.PENDING;

    const user = await userModel.create({
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
      userId: userId,
      userStatus: userStatus,
    });

    // save the user

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
