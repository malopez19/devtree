import { Router } from "express";
import {body} from "express-validator";
import { createAccountHandler } from "./handlers";

const router = Router();

// Validation middleware
const validateRegisterInput = [
  body('handle').notEmpty().withMessage('Handle is required'),
  body('name').notEmpty().withMessage('Name is required'),
  body('email').notEmpty().isEmail().withMessage('Email format is not valid'),
  body('password').notEmpty().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

router.get('/', (req, res) => {
  res.send('Hello World!');
});

//auth and register routes
router.post('/auth/register', validateRegisterInput, createAccountHandler);

export default router;