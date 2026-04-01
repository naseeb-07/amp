import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET all menu items
export async function GET() {
    try {
        const [rows] = await pool.query('SELECT * FROM menu_items');
        return NextResponse.json(rows);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST new menu item
export async function POST(request: Request) {
    try {
        const { id, category_id, name, description, currency, price, image, popular } = await request.json();
        await pool.query(
            'INSERT INTO menu_items (id, category_id, name, description, currency, price, image, popular) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [id, category_id, name, description, currency || 'USD', price, image, popular ? 1 : 0]
        );
        return NextResponse.json({ message: 'Menu item created successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
