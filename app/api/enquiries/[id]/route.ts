import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { status } = await request.json();

        if (!status) {
            return NextResponse.json({ error: 'Status is required' }, { status: 400 });
        }

        await pool.query('UPDATE enquiries SET status = $1 WHERE id = $2', [status, id]);
        return NextResponse.json({ message: 'Enquiry updated successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update enquiry' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await pool.query('DELETE FROM enquiries WHERE id = $1', [id]);
        return NextResponse.json({ message: 'Enquiry deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete enquiry' }, { status: 500 });
    }
}
