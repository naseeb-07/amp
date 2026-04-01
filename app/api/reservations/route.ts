import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET all reservations
export async function GET() {
    try {
        const { rows } = await pool.query('SELECT * FROM reservations ORDER BY created_at DESC');
        return NextResponse.json(rows);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST a new reservation
export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { name, persons, date, time, occasion, specialRequirement, email, phone } = data;

        if (!name || !persons || !date || !time || !email || !phone) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const { rows } = await pool.query(
            'INSERT INTO reservations (name, persons, date, time, occasion, "specialRequirement", email, phone, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
            [name, persons, date, time, occasion, specialRequirement, email, phone, 'pending']
        );

        return NextResponse.json({ success: true, id: rows[0].id });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
