import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { title, description, date, time, image } = await req.json();
        console.log("Updating event:", id, { title });
        const [result] = await pool.query(
            "UPDATE events SET title = ?, description = ?, date = ?, time = ?, image = ? WHERE id = ?",
            [title, description, date, time, image, id]
        );
        console.log("Update result:", result);
        return NextResponse.json({ message: "Event updated" });
    } catch (error: any) {
        console.error("Error updating event:", error);
        return NextResponse.json({ error: error.message || "Failed to update event" }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        console.log("Deleting event:", id);
        const [result] = await pool.query("DELETE FROM events WHERE id = ?", [id]);
        console.log("Delete result:", result);
        return NextResponse.json({ message: "Event deleted" });
    } catch (error: any) {
        console.error("Error deleting event:", error);
        return NextResponse.json({ error: error.message || "Failed to delete event" }, { status: 500 });
    }
}
