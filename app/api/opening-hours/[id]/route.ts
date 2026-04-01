import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { day_range, time_range, display_order } = await request.json();
        await pool.query(
            'UPDATE opening_hours SET day_range = $1, time_range = $2, display_order = $3 WHERE id = $4',
            [day_range, time_range, display_order, id]
        );
        return NextResponse.json({ message: 'Opening hour updated' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update opening hour' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await pool.query('DELETE FROM opening_hours WHERE id = $1', [id]);
        return NextResponse.json({ message: 'Opening hour deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete opening hour' }, { status: 500 });
    }
}
