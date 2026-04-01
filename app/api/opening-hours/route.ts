import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
    try {
        const [rows] = await pool.query('SELECT * FROM opening_hours ORDER BY display_order ASC');
        return NextResponse.json(rows);
    } catch (error) {
        console.error('Error fetching opening hours:', error);
        return NextResponse.json({ error: 'Failed to fetch opening hours' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { day_range, time_range, display_order } = await request.json();
        const [result] = await pool.query(
            'INSERT INTO opening_hours (day_range, time_range, display_order) VALUES (?, ?, ?)',
            [day_range, time_range, display_order || 0]
        );
        return NextResponse.json({ id: (result as any).insertId, message: 'Opening hour added' });
    } catch (error) {
        console.error('Error adding opening hour:', error);
        return NextResponse.json({ error: 'Failed to add opening hour' }, { status: 500 });
    }
}
