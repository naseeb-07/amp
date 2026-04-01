import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET all signature dishes
export async function GET() {
    try {
        const { rows } = await pool.query('SELECT * FROM signature_dishes');
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
            'INSERT INTO signature_dishes (name, currency, price, rating, image, "isBestSeller") VALUES ($1, $2, $3, $4, $5, $6)',
            [name, currency || 'INR', price, rating, image, isBestSeller ? true : false]
        );
        return NextResponse.json({ message: 'Signature dish created successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
