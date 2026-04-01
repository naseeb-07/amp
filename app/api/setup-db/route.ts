import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
    try {
        await pool.query('SELECT 1');

        await pool.query(`CREATE TABLE IF NOT EXISTS menu_categories (
            id VARCHAR(100) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            sort_order INT DEFAULT 0
        )`);

        await pool.query(`CREATE TABLE IF NOT EXISTS menu_items (
            id VARCHAR(200) PRIMARY KEY,
            category_id VARCHAR(100) REFERENCES menu_categories(id) ON DELETE CASCADE,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            currency VARCHAR(10) DEFAULT 'INR',
            price VARCHAR(50),
            image TEXT,
            popular BOOLEAN DEFAULT FALSE
        )`);

        await pool.query(`CREATE TABLE IF NOT EXISTS signature_dishes (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            currency VARCHAR(10) DEFAULT 'INR',
            price VARCHAR(50),
            rating VARCHAR(10),
            image TEXT,
            "isBestSeller" BOOLEAN DEFAULT FALSE
        )`);

        await pool.query(`CREATE TABLE IF NOT EXISTS chefs_collection (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            currency VARCHAR(10) DEFAULT 'INR',
            price VARCHAR(50),
            image TEXT,
            limited BOOLEAN DEFAULT FALSE
        )`);

        await pool.query(`CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            date VARCHAR(100),
            time VARCHAR(100),
            description TEXT,
            image TEXT
        )`);

        await pool.query(`CREATE TABLE IF NOT EXISTS blog_posts (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            snippet TEXT,
            content TEXT,
            date VARCHAR(100),
            "readTime" VARCHAR(50),
            image TEXT
        )`);

        await pool.query(`CREATE TABLE IF NOT EXISTS enquiries (
            id SERIAL PRIMARY KEY,
            full_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(50),
            subject VARCHAR(255),
            message TEXT NOT NULL,
            status VARCHAR(50) DEFAULT 'new',
            created_at TIMESTAMP DEFAULT NOW()
        )`);

        await pool.query(`CREATE TABLE IF NOT EXISTS reservations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            persons VARCHAR(20),
            date VARCHAR(100),
            time VARCHAR(100),
            occasion VARCHAR(100),
            "specialRequirement" TEXT,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(50) NOT NULL,
            status VARCHAR(50) DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT NOW()
        )`);

        await pool.query(`CREATE TABLE IF NOT EXISTS opening_hours (
            id SERIAL PRIMARY KEY,
            day_range VARCHAR(100),
            time_range VARCHAR(100),
            display_order INT DEFAULT 0
        )`);

        await pool.query(`CREATE TABLE IF NOT EXISTS restaurant_settings (
            setting_key VARCHAR(100) PRIMARY KEY,
            setting_value TEXT
        )`);

        // Seed default opening hours if empty
        const { rows: ohRows } = await pool.query('SELECT COUNT(*) as count FROM opening_hours');
        if (parseInt(ohRows[0].count) === 0) {
            await pool.query(`INSERT INTO opening_hours (day_range, time_range, display_order) VALUES
                ('Monday - Friday', '10:40 AM - 11:15 PM', 0),
                ('Saturday - Sunday', '10:40 AM - 11:15 PM', 1)`);
        }

        // Seed default settings if empty
        const { rows: settingsRows } = await pool.query('SELECT COUNT(*) as count FROM restaurant_settings');
        if (parseInt(settingsRows[0].count) === 0) {
            await pool.query(`INSERT INTO restaurant_settings (setting_key, setting_value) VALUES
                ('restaurant_name', 'Village Restaurant'),
                ('tagline', 'Authentic Flavors, Unforgettable Experience'),
                ('phone', '+91 70903 00311'),
                ('email', 'villagerestaurantecity@gmail.com'),
                ('address', 'Ground Floor, Villa-18, Concorde Cupertino, Neeladri Main Road, Electronic City, Bangalore - 560100'),
                ('instagram', '@VillageRestaurantECity')`);
        }

        return NextResponse.json({ message: 'All tables created and defaults seeded successfully!' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
