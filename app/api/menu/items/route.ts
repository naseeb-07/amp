import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET all menu items
export async function GET() {
    try {
        const { rows } = await pool.query('SELECT * FROM menu_items');
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
            'INSERT INTO menu_items (id, category_id, name, description, currency, price, image, popular) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            [id, category_id, name, description, currency || 'INR', price, image, popular ? true : false]
        );
        return NextResponse.json({ message: 'Menu item created successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
