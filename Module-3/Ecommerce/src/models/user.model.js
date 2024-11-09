import mongoose from "mongoose";
import { USER_ROLES, USER_STATUS } from "../utils/constants.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: false,
    enum: Object.values(USER_ROLES),
    default: USER_ROLES.CUSTOMER,
  },
  createdTimeStamp: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  userStatus: {
    type: String,
    required: false,
    enum: Object.values(USER_STATUS),
    default: USER_STATUS.PENDING,
  },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
