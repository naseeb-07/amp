import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// POST update category order
export async function POST(request: Request) {
    try {
        const { orderedIds } = await request.json(); // Expected: an array of category IDs in the desired order

        if (!Array.isArray(orderedIds)) {
            return NextResponse.json({ error: 'orderedIds must be an array' }, { status: 400 });
        }

        // Get a database connection to run a transaction
        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            for (let i = 0; i < orderedIds.length; i++) {
                await connection.query(
                    'UPDATE menu_categories SET sort_order = ? WHERE id = ?',
                    [i, orderedIds[i]]
                );
            }

            await connection.commit();
            return NextResponse.json({ message: 'Categories reordered successfully' });
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    } catch (error: any) {
        console.error('Error reordering categories:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
