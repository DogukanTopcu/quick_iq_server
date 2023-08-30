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