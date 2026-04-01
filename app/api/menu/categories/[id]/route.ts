import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { name, description } = await req.json();
        await pool.query(
            "UPDATE menu_categories SET name = $1, description = $2 WHERE id = $3",
            [name, description, id]
        );
        return NextResponse.json({ message: "Category updated" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to update category" }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await pool.query("DELETE FROM menu_items WHERE category_id = $1", [id]);
        await pool.query("DELETE FROM menu_categories WHERE id = $1", [id]);
        return NextResponse.json({ message: "Category deleted" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to delete category" }, { status: 500 });
    }
}
