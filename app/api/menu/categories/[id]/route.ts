import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { name, description } = await req.json();
        console.log("Updating category:", id, { name, description });
        const [result] = await pool.query(
            "UPDATE menu_categories SET name = ?, description = ? WHERE id = ?",
            [name, description, id]
        );
        console.log("Update result:", result);
        return NextResponse.json({ message: "Category updated" });
    } catch (error: any) {
        console.error("Error updating category:", error);
        return NextResponse.json({ error: error.message || "Failed to update category" }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        console.log("Deleting category:", id);
        const [result] = await pool.query("DELETE FROM menu_categories WHERE id = ?", [id]);
        console.log("Delete result:", result);
        return NextResponse.json({ message: "Category deleted" });
    } catch (error: any) {
        console.error("Error deleting category:", error);
        return NextResponse.json({ error: error.message || "Failed to delete category" }, { status: 500 });
    }
}
