import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
    try {
        const [menuCount, signatureCount, eventCount, blogCount] = await Promise.all([
            pool.query("SELECT COUNT(*) as count FROM menu_items"),
            pool.query("SELECT COUNT(*) as count FROM signature_dishes"),
            pool.query("SELECT COUNT(*) as count FROM events"),
            pool.query("SELECT COUNT(*) as count FROM blog_posts"),
        ]);

        return NextResponse.json({
            menuItems: parseInt(menuCount.rows[0].count),
            signatures: parseInt(signatureCount.rows[0].count),
            events: parseInt(eventCount.rows[0].count),
            blogPosts: parseInt(blogCount.rows[0].count),
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
