import express from "express";
import { createNewUser, getUsers, login } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/newUser", createNewUser);
authRouter.post("/login", login);

authRouter.get("/getUsers", getUsers);


export default authRouter;