import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET all signature dishes
export async function GET() {
    try {
        const [rows] = await pool.query('SELECT * FROM signature_dishes');
        return NextResponse.json(rows);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST new signature dish
export async function POST(request: Request) {
    try {
        const { name, currency, price, rating, image, isBestSeller } = await request.json();
        await pool.query(
            'INSERT INTO signature_dishes (name, currency, price, rating, image, isBestSeller) VALUES (?, ?, ?, ?, ?, ?)',
            [name, currency || 'INR', price, rating, image, isBestSeller ? 1 : 0]
        );
        return NextResponse.json({ message: 'Signature dish created successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
