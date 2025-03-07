import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserRepository from "@src/repository/user.repository";
import variables from "@src/utils/variable";
import { hashpassword, comparePassword } from "@src/utils/password";
import { failureResponse, successResponse } from "@src/utils/response";

export const UserController = {
  /**
   * Create a new user
   */
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, password } = req.body;

      // Check if user already exists
      const existingUser = await UserRepository.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json(failureResponse("Email already exists"));
      }

      // Hash password before saving
      const hashedPassword = await hashpassword(password);
      const newUser = await UserRepository.createUser({
        username,
        email,
        password: hashedPassword,
      });

      return res
        .status(201)
        .json(successResponse(newUser, "User created successfully"));
    } catch (error) {
      next(error); 
    }
  },

  /**
   * User login
   */
  async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Check if user exists
      const user = await UserRepository.getUserByEmail(email);
      if (!user) {
        return res
          .status(400)
          .json(failureResponse("Invalid email or password"));
      }

      // Compare passwords
      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        return res
          .status(400)
          .json(failureResponse("Invalid email or password"));
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        variables.AUTH.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res
        .status(200)
        .json(successResponse({ token, user }, "Login successful"));
    } catch (error) {
      return res.status(500).json(failureResponse("Login failed", error));
    }
  },

  /**
   * Get user profile
   */
  async getUserProfile(req: Request, res: Response) {
    try {
      const userId = req.params.id;

      // Fetch user by ID
      const user = await UserRepository.getUserById(userId);
      if (!user) {
        return res.status(404).json(failureResponse("User not found"));
      }

      return res
        .status(200)
        .json(successResponse(user, "User profile retrieved successfully"));
    } catch (error) {
      return res
        .status(500)
        .json(failureResponse("Error retrieving user profile", error));
    }
  },
};
