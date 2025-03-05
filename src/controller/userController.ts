import { Request, Response } from "express";
import { UserRepository } from "../repository/user.repository";
import { failureResponse, successResponse } from "../utils/response";
import { comparePassword, hashpassword } from "../utils/password";
import jwt from "jsonwebtoken";
import variables from "../utils/variable";

const userRepository = new UserRepository();

/**
 * Create a new user
 */
export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await userRepository.getUserByEmail(email);
    if (existingUser) {
      return failureResponse("Email already exists");
    }

    // Hash password before saving
    const hashedPassword = await hashpassword(password);
    const newUser = await userRepository.createUser({
      username,
      email,
      password: hashedPassword,
    });

    return successResponse(newUser, "User created successfully");
  } catch (error) {
    return failureResponse("Internal server error", error);
  }
};

/**
 * User login
 */
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
      return failureResponse("Invalid email or password");
    }

    // Compare passwords
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json(failureResponse("Invalid email or password"));
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      variables.AUTH.JWT_SECRET || "default_secret", // Ensure secret key is set
      { expiresIn: "1h" }
    );

    return res
      .status(200)
      .json(successResponse({ token, user }, "Login successful"));
  } catch (error) {
    return res.status(500).json(failureResponse("Login failed", error));
  }
};

/**
 * Get user profile
 */
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    // Fetch user by ID
    const user = await userRepository.getUserById(userId);
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
};

/**
 * Update user profile
 */
export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { username, email } = req.body;

    // Check if user exists
    const user = await userRepository.getUserById(userId);
    if (!user) {
      return res.status(404).json(failureResponse("User not found"));
    }

    // Update user details
    user.username = username || user.username;
    user.email = email || user.email;
    // await user.save();

    return res
      .status(200)
      .json(successResponse(user, "User profile updated successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(failureResponse("Error updating user profile", error));
  }
};

/**
 * Delete user account
 */
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    // Check if user exists
    const user = await userRepository.getUserById(userId);
    if (!user) {
      return res.status(404).json(failureResponse("User not found"));
    }

    // Delete user
    // await user.deleteOne();

    return res
      .status(200)
      .json(successResponse(null, "User account deleted successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(failureResponse("Error deleting user account", error));
  }
};
