import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
