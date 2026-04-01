import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { name, description, currency, price, image, limited } = await req.json();
        await pool.query(
            "UPDATE chefs_collection SET name = $1, description = $2, currency = $3, price = $4, image = $5, limited = $6 WHERE id = $7",
            [name, description, currency || 'INR', price, image, limited ? true : false, id]
        );
        return NextResponse.json({ message: "Special updated" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to update special" }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await pool.query("DELETE FROM chefs_collection WHERE id = $1", [id]);
        return NextResponse.json({ message: "Special deleted" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to delete special" }, { status: 500 });
    }
}
