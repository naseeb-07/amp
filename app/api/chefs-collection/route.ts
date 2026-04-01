import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET all chef specials
export async function GET() {
    try {
        const { rows } = await pool.query('SELECT * FROM chefs_collection');
        return NextResponse.json(rows);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST new special
export async function POST(request: Request) {
    try {
        const { name, description, currency, price, image, limited } = await request.json();
        await pool.query(
            'INSERT INTO chefs_collection (name, description, currency, price, image, limited) VALUES ($1, $2, $3, $4, $5, $6)',
            [name, description, currency || 'INR', price, image, limited ? true : false]
        );
        return NextResponse.json({ message: 'Chef special created successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
