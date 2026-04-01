import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { name, currency, price, rating, image, isBestSeller } = await request.json();
        console.log("Updating signature dish:", id, { name });
        const [result] = await pool.query(
            'UPDATE signature_dishes SET name = ?, currency = ?, price = ?, rating = ?, image = ?, isBestSeller = ? WHERE id = ?',
            [name, currency || 'USD', price, rating, image, isBestSeller ? 1 : 0, id]
        );
        console.log("Update result:", result);
        return NextResponse.json({ message: 'Dish updated successfully' });
    } catch (error: any) {
        console.error("Error updating signature dish:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        console.log("Deleting signature dish:", id);
        const [result] = await pool.query('DELETE FROM signature_dishes WHERE id = ?', [id]);
        console.log("Delete result:", result);
        return NextResponse.json({ message: 'Dish deleted successfully' });
    } catch (error: any) {
        console.error("Error deleting signature dish:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
