import express from "express";
import { login, register, verifyEmail } from "../controllers/authentication";
export default (router: express.Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
  router.post("/auth/verify-email", verifyEmail);
};
