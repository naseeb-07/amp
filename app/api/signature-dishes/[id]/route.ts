import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { name, currency, price, rating, image, isBestSeller } = await request.json();
        await pool.query(
            'UPDATE signature_dishes SET name = $1, currency = $2, price = $3, rating = $4, image = $5, "isBestSeller" = $6 WHERE id = $7',
            [name, currency || 'INR', price, rating, image, isBestSeller ? true : false, id]
        );
        return NextResponse.json({ message: 'Dish updated successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await pool.query('DELETE FROM signature_dishes WHERE id = $1', [id]);
        return NextResponse.json({ message: 'Dish deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
