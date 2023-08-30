import express from 'express';
import bodyParser from 'body-parser';
import db from './config/db.js';
import cors from 'cors';
import authRouter from './routes/auth.js';
import gameRouter from './routes/game.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to the QuickIQ Server');
});

app.use('/api/auth', authRouter);
app.use('/api/game', gameRouter);

app.listen(2000, () => console.log('Server running on port 2000'));
