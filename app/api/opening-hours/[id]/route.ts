import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { day_range, time_range, display_order } = await request.json();
        await pool.query(
            'UPDATE opening_hours SET day_range = ?, time_range = ?, display_order = ? WHERE id = ?',
            [day_range, time_range, display_order, id]
        );
        return NextResponse.json({ message: 'Opening hour updated' });
    } catch (error) {
        console.error('Error updating opening hour:', error);
        return NextResponse.json({ error: 'Failed to update opening hour' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await pool.query('DELETE FROM opening_hours WHERE id = ?', [id]);
        return NextResponse.json({ message: 'Opening hour deleted' });
    } catch (error) {
        console.error('Error deleting opening hour:', error);
        return NextResponse.json({ error: 'Failed to delete opening hour' }, { status: 500 });
    }
}
