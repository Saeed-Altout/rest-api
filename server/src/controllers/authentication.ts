import express from "express";
import { getUserByEmail } from "../db/users";
import { authentication, random } from "../helpers";
import { db } from "../libs/db";

export const register = async (req: express.Request, res: any) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        status: "error",
        code: "400",
        message: "All fields are required: email, password, name",
      });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        status: "error",
        code: "400",
        message: "Email is already registered",
      });
    }

    const salt = random();
    const hashedPassword = authentication(salt, password);

    const user = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      status: "success",
      code: "201",
      message: "User registered successfully",
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
    });
  } catch (error) {
    console.error("Error during registration:", error);

    return res.status(500).json({
      status: "error",
      code: "500",
      message: "Internal server error",
    });
  }
};
