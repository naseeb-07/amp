import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { title, snippet, content, date, readTime, image } = await req.json();
        await pool.query(
            'UPDATE blog_posts SET title = $1, snippet = $2, content = $3, date = $4, "readTime" = $5, image = $6 WHERE id = $7',
            [title, snippet, content, date, readTime, image, id]
        );
        return NextResponse.json({ message: "Post updated" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to update post" }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await pool.query("DELETE FROM blog_posts WHERE id = $1", [id]);
        return NextResponse.json({ message: "Post deleted" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to delete post" }, { status: 500 });
    }
}
