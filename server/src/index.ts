import dotenv from "dotenv";
dotenv.config();

import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import router from "./router";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your Next.js frontend URL
    credentials: true, // Allow credentials (cookies)
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());

const server = http.createServer(app);
server.listen(8080, () => {
  console.log("Server running on http://localhost:8080/");
});

app.use("/", router());
