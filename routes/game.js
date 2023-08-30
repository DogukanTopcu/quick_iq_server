import express from "express";
import { increaseScore } from "../controllers/gameController.js";


const gameRouter = express.Router();

gameRouter.post("/score/increase", increaseScore);
// gameRouter.post("/login", login);


export default gameRouter;