import express from 'express';
import { addNewConversation, callAssistant, generateText, getConversations } from '../controllers/botController.js';

const botRouter = express.Router();

botRouter.post('/callAssistant', callAssistant);
botRouter.post("/getConversations", getConversations);
botRouter.post("/addNewConversation", addNewConversation);
botRouter.post("/generateText", generateText);

export default botRouter;