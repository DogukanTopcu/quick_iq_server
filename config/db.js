import mysql from 'mysql';

// Development
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'quickiq'
// });

const db = mysql.createConnection({
    host: 'quick-iq.mysql.database.azure.com',
    user: 'quick_iq',
    password: ')U%bT]zmhJiG-7P',
    database: 'quickiq',
    port: 3306,
    ssl: true
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

export default db;