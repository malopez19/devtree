import {Response, Request} from "express";
import slug from "slug";
import User from "../models/User";
import { comparePasswords, hashPassword } from "../utils/auth";

export const createAccountHandler = async (req: Request, res: Response) => {
  try {
      
    // Validate input
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    const handle = slug(req.body.handle, '');  
    const existingHandle = await User.findOne({ handle });
    if (existingHandle) {
      return res.status(409).json({ message: 'Handle is already taken' });
    }

    const user = new User({ ...req.body, handle });

    //hash password 
    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;

    // Create new user
    await user.save();

    res.status(201).json({ message: 'User created successfully', userId: user._id });
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const loginHandler = async (req: Request, res: Response) => {

  const { email, password } = req.body;

  // Check if user already exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Check password
  const isPasswordValid = await comparePasswords(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  res.status(200).json({ message: 'Login successful' });
}