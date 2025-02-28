import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../models/userModel";
import jwt from "jsonwebtoken";

const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    const exists = await userModel.findOne({ email });
    if (exists) {
      res.status(409).json({ success: false, message: "User already exists" });
      return;
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create new user in mongoDB
    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
    });

    //wait for saving new user data
    await newUser.save();

    res.status(201).json({ success: true, message: "Account created!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { registerUser };
