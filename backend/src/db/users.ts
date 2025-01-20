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
