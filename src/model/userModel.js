import mongoose, { Schema, model, models } from "mongoose";
import { type } from "os";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["farmer", "distributor", "retailer"] },
  number: { type: String, required: true },
  cropId: { type: String, required: true }, 
  address: { type: String, required: true },
}, { timestamps: true });

// Avoid model overwrite
const User = models.User || model("User", userSchema);
export default User;
