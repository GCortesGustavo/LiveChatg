import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    database: 'Livechatg',
});

pool.on('connect', () => {
    console.log('Conexión a la base de datos establecida');
});

pool.query(
    `
    CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        content TEXT,
        username TEXT
    )
    `,
    (err, results) => {
        if (err) throw err;
        console.log('Tabla "messages" creada o ya existente');
});


export default pool;
