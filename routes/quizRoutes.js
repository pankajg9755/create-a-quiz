import express from "express";
import quizController from "../controller/quizController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

import dotenv from "dotenv";

dotenv.config();

const quizRoutes = express.Router();
quizRoutes.post("/create", quizController.create);
quizRoutes.get("/list", quizController.list);
quizRoutes.get("/detail", quizController.detail);
quizRoutes.post(
  "/answers",
  authMiddleware.userVerifyToken,
  quizController.answers
);
quizRoutes.get(
  "/result",
  authMiddleware.userVerifyToken,
  quizController.result
);

export default quizRoutes;
