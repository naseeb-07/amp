import mysql from 'mysql2/promise';

const isProduction = process.env.NODE_ENV === 'production';

const pool = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'naseeb_db',
    port: Number(process.env.DB_PORT) || 3307,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    // SSL is required for cloud databases (Aiven). Disabled for local XAMPP.
    ...(isProduction && {
        ssl: { rejectUnauthorized: false }
    }),
});

export default pool;
