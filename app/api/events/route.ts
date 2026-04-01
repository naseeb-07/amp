import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET all events
export async function GET() {
    try {
        const [rows] = await pool.query('SELECT * FROM events');
        return NextResponse.json(rows);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST new event
export async function POST(request: Request) {
    try {
        const { title, date, time, description, image } = await request.json();
        await pool.query(
            'INSERT INTO events (title, date, time, description, image) VALUES (?, ?, ?, ?, ?)',
            [title, date, time, description, image]
        );
        return NextResponse.json({ message: 'Event created successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
