import mysql from 'mysql';

// Development
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'quickiq'
// });

// Production
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    port: process.env.DB_PORT,
    ssl: true
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

export default db;
