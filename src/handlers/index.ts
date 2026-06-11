import {Response, Request} from "express";
import slug from "slug";
import User from "../models/User";
import { comparePasswords, hashPassword } from "../utils/auth";
import { generateJWT } from "../utils/jwt";

export const createAccountHandler = async (req: Request, res: Response) => {
  try {
      
    // Validate input
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'usuario con este correo ya existe' });
    }

    const handle = slug(req.body.handle, '');  
    const existingHandle = await User.findOne({ handle });
    if (existingHandle) {
      return res.status(409).json({ message: 'handle ya está en uso' });
    }

    const user = new User({ ...req.body, handle });

    //hash password 
    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;

    // Create new user
    await user.save();

    res.status(201).json({ message: 'Usuario creado exitosamente', userId: user._id });
  } catch (error) {
    console.error('Error creando cuenta:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

export const loginHandler = async (req: Request, res: Response) => {

  const { email, password } = req.body;

  // Check if user already exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  // Check password
  const isPasswordValid = await comparePasswords(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Contraseña inválida' });
  }

  const token = generateJWT(user._id.toString());

  res.send(token);
  //res.status(200).json({ message: 'Inicio de sesión exitoso', token });
}