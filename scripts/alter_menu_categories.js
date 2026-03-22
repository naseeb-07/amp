const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function alterDb() {
    const pool = mysql.createPool({
        host: process.env.DB_HOST || '127.0.0.1',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'naseeb_db',
        port: Number(process.env.DB_PORT) || 3307,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

    try {
        // Add sort_order column if it doesn't exist
        await pool.query('ALTER TABLE menu_categories ADD COLUMN sort_order INT DEFAULT 0');
        console.log("Added sort_order column to menu_categories.");

        // Automatically assign an initial sort_order based on current order
        const [rows] = await pool.query('SELECT id FROM menu_categories');
        for (let i = 0; i < rows.length; i++) {
            await pool.query('UPDATE menu_categories SET sort_order = ? WHERE id = ?', [i, rows[i].id]);
        }
        console.log("Initialized sort_order for existing categories.");
    } catch (err) {
        // If column already exists it will throw an error, we can ignore it
        if (err.code === 'ER_DUP_FIELDNAME') {
            console.log("sort_order column already exists.");
        } else {
            console.error("Error altering table:", err);
        }
    } finally {
        pool.end();
    }
}

alterDb();
