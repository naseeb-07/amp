import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
    try {
        const { rows } = await pool.query('SELECT * FROM opening_hours ORDER BY display_order ASC');
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch opening hours' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { day_range, time_range, display_order } = await request.json();
        const { rows } = await pool.query(
            'INSERT INTO opening_hours (day_range, time_range, display_order) VALUES ($1, $2, $3) RETURNING id',
            [day_range, time_range, display_order || 0]
        );
        return NextResponse.json({ id: rows[0].id, message: 'Opening hour added' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to add opening hour' }, { status: 500 });
    }
}
