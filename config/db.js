import mysql from 'mysql';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'quickiq'
});


// host name: quick-iq (Germany West Central)
// db name: quick_iq
// user: quick_iq
// password: )U%bT]zmhJiG-7P

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

export default db;