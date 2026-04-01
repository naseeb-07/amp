import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { orderedIds } = await request.json();

        if (!Array.isArray(orderedIds)) {
            return NextResponse.json({ error: 'orderedIds must be an array' }, { status: 400 });
        }

        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            for (let i = 0; i < orderedIds.length; i++) {
                await client.query(
                    'UPDATE menu_categories SET sort_order = $1 WHERE id = $2',
                    [i, orderedIds[i]]
                );
            }
            await client.query('COMMIT');
            return NextResponse.json({ message: 'Categories reordered successfully' });
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
