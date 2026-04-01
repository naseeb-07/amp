import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { title, description, date, time, image } = await req.json();
        await pool.query(
            "UPDATE events SET title = $1, description = $2, date = $3, time = $4, image = $5 WHERE id = $6",
            [title, description, date, time, image, id]
        );
        return NextResponse.json({ message: "Event updated" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to update event" }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await pool.query("DELETE FROM events WHERE id = $1", [id]);
        return NextResponse.json({ message: "Event deleted" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to delete event" }, { status: 500 });
    }
}
