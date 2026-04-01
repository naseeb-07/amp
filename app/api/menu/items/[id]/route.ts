import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { name, description, currency, price, image, popular, category_id } = await req.json();
        console.log("Updating item:", id, { name, category_id });
        const [result] = await pool.query(
            "UPDATE menu_items SET name = ?, description = ?, currency = ?, price = ?, image = ?, popular = ?, category_id = ? WHERE id = ?",
            [name, description, currency || 'USD', price, image, popular ? 1 : 0, category_id, id]
        );
        console.log("Update result:", result);
        return NextResponse.json({ message: "Item updated" });
    } catch (error: any) {
        console.error("Error updating item:", error);
        return NextResponse.json({ error: error.message || "Failed to update item" }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        console.log("Deleting item:", id);
        const [result] = await pool.query("DELETE FROM menu_items WHERE id = ?", [id]);
        console.log("Delete result:", result);
        return NextResponse.json({ message: "Item deleted" });
    } catch (error: any) {
        console.error("Error deleting item:", error);
        return NextResponse.json({ error: error.message || "Failed to delete item" }, { status: 500 });
    }
}
