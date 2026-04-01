import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
    try {
        const [rows] = await pool.query('SELECT * FROM enquiries ORDER BY created_at DESC');
        return NextResponse.json(rows);
    } catch (error) {
        console.error('Error fetching enquiries:', error);
        return NextResponse.json({ error: 'Failed to fetch enquiries' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { full_name, email, phone, subject, message } = body;

        if (!full_name || !email || !message) {
            return NextResponse.json({ error: 'Full name, email, and message are required' }, { status: 400 });
        }

        const [result] = await pool.query(
            'INSERT INTO enquiries (full_name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)',
            [full_name, email, phone, subject, message]
        );

        return NextResponse.json({ message: 'Enquiry submitted successfully', id: (result as any).insertId }, { status: 201 });
    } catch (error) {
        console.error('Error creating enquiry:', error);
        return NextResponse.json({ error: 'Failed to submit enquiry' }, { status: 500 });
    }
}
