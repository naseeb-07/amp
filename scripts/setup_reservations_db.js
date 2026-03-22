const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function setupDB() {
    const pool = mysql.createPool({
        host: process.env.DB_HOST || '127.0.0.1',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'naseeb_db',
        port: Number(process.env.DB_PORT) || 3307,
    });

    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS reservations (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                persons INT NOT NULL,
                date VARCHAR(50) NOT NULL,
                time VARCHAR(50) NOT NULL,
                occasion VARCHAR(100),
                specialRequirement VARCHAR(255),
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(50) NOT NULL,
                status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log("Reservations table verified/created.");
    } catch (error) {
        console.error("Database error:", error);
    } finally {
        await pool.end();
    }
}

setupDB();
