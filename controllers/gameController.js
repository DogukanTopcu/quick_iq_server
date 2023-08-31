import db from "../config/db.js";

export const increaseScore = async (req, res) => {
    const { score, userId } = req.body;
    await db.query(`UPDATE users SET totalscore = ? WHERE id = ?`, [score, userId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send("Error while inserting data");
        }
        console.log("Score increased");
        console.log(userId);
        console.log(score);
        res.json(result);
    });
};


export const level1_addData = async (req, res) => {
    console.log(req.body);
    const { userId, questionImage, optionImages, userResponse, isCorrect, time } = req.body;
    await db.query(`INSERT INTO level1 (user_id, question, options, user_response, isCorrect, time) VALUES ('${parseInt(userId)}', '${questionImage}', '${optionImages}', '${userResponse}', '${isCorrect == "false" ? 0 : 1}', '${parseInt(time)}')`, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send("Error while inserting data");
        }
        console.log("Data inserted to Level 1 Table");
        res.status(200).send("Data inserted");
    });
}


export const level2_addData = async (req, res) => {
    console.log(req.body);
    const { userId, allImages, firstOption, secondOption, isCorrect, time } = req.body;
    await db.query(`INSERT INTO level2 (user_id, all_images, first_option, second_option, isCorrect, time) VALUES ('${parseInt(userId)}', '${allImages}', '${firstOption}', '${secondOption}', '${isCorrect == "false" ? 0 : 1}', '${parseInt(time)}')`, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send("Error while inserting data");
        }
        console.log("Data inserted to Level 2 Table");
        res.status(200).send("Data inserted");
    });
}