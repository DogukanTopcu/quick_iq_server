import axios from "axios";
import db from "../config/db.js";

export const callAssistant = async (req, res) => {
    let bot = {
        id: 0,
        userId: 0,
        image: "",
    }
    const { userId } = req.body;
    console.log(userId);
    db.query("SELECT * FROM ai_bots WHERE user_id = ?", [userId], (err, result) => {
        if (err) {
            res.status(400).json({
                message: "Error",
                error: err,
            });
        } else {
            bot.id = result[0].id;
            bot.userId = result[0].user_id;
            bot.image = result[0].bot_image;
            console.log(bot);
            res.json(bot);
        }
    });
};

export const getConversations = async (req, res) => {
    let conversations = [];
    let conversation = {
        id: 0,
        userId: 0,
        botId: 0,
        botMessage: "",
        userMessage: "",
        date: "",
        type: "",
    };
    const { botId } = req.body;
    db.query("SELECT * FROM conversations WHERE bot_id = ?", [botId], (err, result) => {
        if (err) {
            res.status(400).json({
                message: "Error",
                error: err,
            });
        } else {
            for (let i = 0; i < result.length; i++) {
                conversation.id = result[i].id;
                conversation.userId = result[i].user_id;
                conversation.botId = result[i].bot_id;
                conversation.botMessage = result[i].bot_message;
                conversation.userMessage = result[i].user_message;
                conversation.date = result[i].date;
                conversation.type = result[i].type;
                conversations.push(conversation);
                
                conversation = {
                    id: 0,
                    userId: 0,
                    botId: 0,
                    botMessage: "",
                    userMessage: "",
                    date: "",
                    type: "",
                };
            }
            res.status(200).json({
                message: "Success",
                data: result,
            });
            
        }
    });
};

export const addNewConversation = async (req, res) => {
    const { botId, userId, botMessage, userMessage, type } = req.body;
    const isAnswered = botMessage !== "" && userMessage !== "";
    db.query("INSERT INTO conversations (user_id, bot_id, bot_message, user_message, type, isAnswered) VALUES (?, ?, ?, ?, ?, ?)", [userId, botId, botMessage, userMessage, type, isAnswered], (err, result) => {
        if (err) {
            console.log("error");
            res.status(400).json({
                message: "Error",
                error: err,
            });
        } else {
            res.status(200).json({
                message: "Success",
                data: result,
            });
        }
    });
};

export const generateText = async (req, res) => {
    const { name, elderConversations, mode } = req.body;
    axios.post('http://127.0.0.1:6000/api/generateText', {"name": name, "elderConversations": elderConversations, mode: mode }).then((result) => {
        res.status(200).json({
            message: "Success",
            data: result.data,
        });
    }).catch((err) => {
        console.log(err);
    });
};

export const generateResponse = async (req, res) => {
    const { name, elderConversations } = req.body;
    axios.post();
};