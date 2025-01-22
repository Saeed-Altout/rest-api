import express from "express";
import { getProjects } from "../controllers/projects";
export default (router: express.Router) => {
  router.get("/projects", getProjects);
};
