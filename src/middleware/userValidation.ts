import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { failureResponse } from "../utils/response";

export const validateUser = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  // Middleware to handle validation errors
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json(failureResponse("Validation error", errors.array()));
    }
    next();
  },
];
