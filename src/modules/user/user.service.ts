import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { CreateUserPayload } from "../../types";
import jwt from "jsonwebtoken";

const registerUser = async (payload: CreateUserPayload) => {
  try {
    const hashPassword = await bcrypt.hash(payload.password, 10);

    const result = await prisma.user.create({
      data: {
        ...payload,
        password: hashPassword,
      },
    });

    return result;
  } catch (error: any) {
    // Prisma known errors
    if (error.code === "P2002") {
      throw {
        statusCode: 409,
        message: "Email already exists",
      };
    }

    if (error.code === "P2003") {
      throw {
        statusCode: 400,
        message: "Invalid foreign key",
      };
    }

    // Unknown Prisma error
    throw {
      statusCode: 500,
      message: "Database error",
    };
  }
};

const loginUser = async (user: { email: string; password: string }) => {
  const foundUser = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if (!foundUser) {
    throw {
      statusCode: 401,
      message: "User not found",
    };
  }

  const isPasswordValid = await bcrypt.compare(
    user.password,
    foundUser.password,
  );

  if (!isPasswordValid) {
    throw {
      statusCode: 401,
      message: "Invalid password",
    };
  }

  if (!foundUser.isActive) {
    throw {
      statusCode: 401,
      message: "User is inactive",
    };
  }

  const token = jwt.sign(
    {
      id: foundUser.id,
      email: foundUser.email,
    },
    process.env.JWT_SECRET || "defaultsecret",
    {
      expiresIn: "7d",
    },
  );



  return { ...foundUser, token };
};

const getUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      include: {
        usageLogs: true,
      },
    });
    return users;
  } catch (error: any) {
    throw {
      statusCode: 500,
      message: "Database error",
    };
  }
};

const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        usageLogs: true,
      },
    });

    return user;
  } catch (error: any) {
    throw {
      statusCode: 500,
      message: "Database error",
    };
  }
};

export const userService = {
  registerUser,
  getUsers,
  getUserById,
  loginUser,
};
