
import bcrypt from 'bcrypt';
import db from '../config/db.js';



export const createNewUser = async (req, res) => {
    let user = {
        id : "",
        name: "",
        surname: "",
        username: "",
        password: "",
        totalscore: 0,
        gender: "",
        birthday: "",
        botId: "",
    }

    const { name, surname, gender, birthday, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(`SELECT * FROM users WHERE username = '${username}'`, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send("Error while selecting data");
        }
        else if (result.length > 0) {
            res.status(400).send("Username already exists");
        } else {
            db.query(
                `INSERT INTO users (name, surname, username, password, gender, birthday) VALUES ('${name}', '${surname}', '${username}', '${hashedPassword}', '${gender}', '${birthday}')`, (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(400).send("Error while inserting data");
                    }
                    const userId = result.insertId;
                    console.log("User created but bot not created and not assigned");
                    db.query(`INSERT INTO ai_bots (user_id) VALUES ('${userId}')`, (err, result) => {
                        if (err) {
                            console.log(err);
                            console.log("Bot could not be created");
                        }
                        db.query(`UPDATE users SET botId = ? WHERE id = ?`, [result.insertId, userId], (err, result) => {
                            if (err) {
                                console.log(err);
                                console.log("User could not be completed. Bot could not be assigned but created");
                            }
                            console.log("User completed successfully");
                        });
                        user.id = userId;
                        user.name = name;
                        user.surname = surname;
                        user.username = username;
                        user.password = password;
                        user.totalScore = 0;
                        user.gender = gender;
                        user.birthday = birthday;
                        user.botId = result.insertId;

                        res.json(user);
                    });
                }
                );
        }
    });
}

export const login = async (req, res) => {
    await db.query(`SELECT * FROM users WHERE username = '${req.body.username}'`, async (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send("Error while selecting data");
        }
        else if (result.length > 0) {
            const user = result[0];
            const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
            if (isPasswordCorrect) {
                res.json(user);
                console.log("User logged in successfully");
            } else {
                console.log("Password is incorrect");
                res.status(400).send("Password is incorrect");
            }
        } else {
            console.log("Username doesn't exist");
            res.status(404).send("Username does not exist");
        }
    });
}


export const getUsers = async (req, res) => {
    await db.query("SELECT * FROM users", (err, result) => {
        res.json(result);
    });
}