import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { title, snippet, content, date, readTime, image } = await req.json();
        console.log("Updating post:", id, { title, snippet });
        const [result] = await pool.query(
            "UPDATE blog_posts SET title = ?, snippet = ?, content = ?, date = ?, readTime = ?, image = ? WHERE id = ?",
            [title, snippet, content, date, readTime, image, id]
        );
        console.log("Update result:", result);
        return NextResponse.json({ message: "Post updated" });
    } catch (error: any) {
        console.error("Error updating post:", error);
        return NextResponse.json({ error: error.message || "Failed to update post" }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        console.log("Deleting post:", id);
        const [result] = await pool.query("DELETE FROM blog_posts WHERE id = ?", [id]);
        console.log("Delete result:", result);
        return NextResponse.json({ message: "Post deleted" });
    } catch (error: any) {
        console.error("Error deleting post:", error);
        return NextResponse.json({ error: error.message || "Failed to delete post" }, { status: 500 });
    }
}
