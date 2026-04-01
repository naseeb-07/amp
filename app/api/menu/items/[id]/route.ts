import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { name, description, currency, price, image, popular, category_id } = await req.json();
        await pool.query(
            "UPDATE menu_items SET name = $1, description = $2, currency = $3, price = $4, image = $5, popular = $6, category_id = $7 WHERE id = $8",
            [name, description, currency || 'INR', price, image, popular ? true : false, category_id, id]
        );
        return NextResponse.json({ message: "Item updated" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to update item" }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await pool.query("DELETE FROM menu_items WHERE id = $1", [id]);
        return NextResponse.json({ message: "Item deleted" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to delete item" }, { status: 500 });
    }
}
