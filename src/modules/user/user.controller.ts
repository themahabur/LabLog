import { Request, Response } from "express";
import { userService } from "./user.service";

const registerUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    if (!user.email || !user.password || !user.name) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const userResult = await userService.registerUser(user);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: userResult,
    });
  } catch (error: any) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    // Basic validation
    if (!user.email || !user.password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const loggedInUser = await userService.loginUser(user);

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: loggedInUser,
    });
  } catch (error: any) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();
    return res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error: any) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const result = await userService.getUserById(userId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};

export const userController = {
  registerUser,
  getUsers,
  getUserById,
  loginUser,
};
