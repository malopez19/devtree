import { validationResult } from "express-validator";
import { body } from "express-validator";
import type { NextFunction, Request, Response } from "express";

export const validateRegisterInput = [
  body('handle').notEmpty().withMessage('Handle is required'),
  body('name').notEmpty().withMessage('Name is required'),
  body('email').notEmpty().isEmail().withMessage('Email format is not valid'),
  body('password').notEmpty().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

export const validateLoginInput = [
  body('email').notEmpty().isEmail().withMessage('Email format is not valid'),
  body('password').notEmpty().withMessage('Password is required'),
];

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}