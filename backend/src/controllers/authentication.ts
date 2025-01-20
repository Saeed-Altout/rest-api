import express from "express";
import { getUserByEmail } from "../db/users";
import { authentication, random } from "../helpers";
import { db } from "../libs/db";

export const register = async (req: express.Request, res: any) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.sendStatus(400);
    }

    const salt = random();

    const user = await db.user.create({
      data: {
        email,
        name,
        password: authentication(salt, password),
      },
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};
