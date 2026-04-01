import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { name, description, currency, price, image, limited } = await req.json();
        console.log("Updating special:", id, { name });
        const [result] = await pool.query(
            "UPDATE chefs_collection SET name = ?, description = ?, currency = ?, price = ?, image = ?, limited = ? WHERE id = ?",
            [name, description, currency || 'USD', price, image, limited ? 1 : 0, id]
        );
        console.log("Update result:", result);
        return NextResponse.json({ message: "Special updated" });
    } catch (error: any) {
        console.error("Error updating special:", error);
        return NextResponse.json({ error: error.message || "Failed to update special" }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        console.log("Deleting special:", id);
        const [result] = await pool.query("DELETE FROM chefs_collection WHERE id = ?", [id]);
        console.log("Delete result:", result);
        return NextResponse.json({ message: "Special deleted" });
    } catch (error: any) {
        console.error("Error deleting special:", error);
        return NextResponse.json({ error: error.message || "Failed to delete special" }, { status: 500 });
    }
}
