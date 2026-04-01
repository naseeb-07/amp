import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET all categories
export async function GET() {
    try {
        const { rows } = await pool.query('SELECT * FROM menu_categories ORDER BY sort_order ASC');
        return NextResponse.json(rows);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST new category
export async function POST(request: Request) {
    try {
        const { id, name, description } = await request.json();
        await pool.query(
            'INSERT INTO menu_categories (id, name, description) VALUES ($1, $2, $3)',
            [id, name, description]
        );
        return NextResponse.json({ message: 'Category created successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
