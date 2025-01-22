import express from "express";
import authentication from "../router/authentication";
import projects from "../router/projects";

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  projects(router);
  return router;
};
