import express from "express";
import { generateOtp, getUserByEmail, verifyUser } from "../db/users";
import { authentication, generateToken, random } from "../helpers";
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
    const otp = generateOtp();
    const hashedPassword = authentication(salt, password);

    await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        salt,
        otp,
      },
    });

    return res.status(201).json({
      status: "success",
      code: "201",
      message: `Enter your OTP to verify your account ${otp}`,
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

export const verifyEmail = async (req: express.Request, res: any) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        status: "error",
        code: "400",
        message: "All fields are required: email, otp",
      });
    }

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).json({
        status: "error",
        code: "404",
        message: "User not found",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        status: "error",
        code: "400",
        message: "Invalid OTP",
      });
    }

    const token = generateToken(user.id);

    await verifyUser(email, token);

    res.cookie("NEXT_CWS_AT", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      status: "success",
      code: "200",
      message: "Email verified successfully",
      data: {
        name: user.name,
        email: user.email,
        image: user.image,
        token,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      code: "500",
      message: "Internal server error",
    });
  }
};

export const login = async (req: express.Request, res: any) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        code: "400",
        message: "All fields are required: email, password",
      });
    }
    console.log(email, password);
  } catch (error) {
    console.error("Error during registration:", error);

    return res.status(500).json({
      status: "error",
      code: "500",
      message: "Internal server error",
    });
  }
};
