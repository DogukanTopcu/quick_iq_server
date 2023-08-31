import express from "express";
import { increaseScore, level1_addData, level2_addData } from "../controllers/gameController.js";


const gameRouter = express.Router();

gameRouter.post("/score/increase", increaseScore);
gameRouter.post("/level1/addData", level1_addData);
gameRouter.post("/level2/addData", level2_addData);


export default gameRouter;