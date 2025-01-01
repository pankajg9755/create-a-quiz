import express from "express";
import userController from "../controller/userController.js";

import dotenv from "dotenv";

dotenv.config();

const userRoutes = express.Router();
userRoutes.post("/signUp", userController.signUp);
userRoutes.post("/login", userController.login);

export default userRoutes;
