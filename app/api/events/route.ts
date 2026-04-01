import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
    try {
        const { rows } = await pool.query('SELECT * FROM events ORDER BY id DESC');
        return NextResponse.json(rows);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { title, date, time, description, image } = await request.json();
        await pool.query(
            'INSERT INTO events (title, date, time, description, image) VALUES ($1, $2, $3, $4, $5)',
            [title, date, time, description, image]
        );
        return NextResponse.json({ message: 'Event created successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
