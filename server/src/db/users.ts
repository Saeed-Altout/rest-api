import { db } from "../libs/db";

export const getUsers = () => {
  return db.user.findMany();
};

export const getUserByEmail = (email: string) => {
  return db.user.findUnique({
    where: {
      email,
    },
  });
};

export const getUserById = (id: string) => {
  return db.user.findUnique({
    where: {
      id,
    },
  });
};

export const generateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
};

export const verifyUser = (email: string, token: string) => {
  return db.user.update({
    where: {
      email,
    },
    data: {
      emailVerified: new Date(),
      token,
      otp: null,
    },
  });
};
