import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
    try {
        const [menuCount] = await pool.query("SELECT COUNT(*) as count FROM menu_items");
        const [signatureCount] = await pool.query("SELECT COUNT(*) as count FROM signature_dishes");
        const [eventCount] = await pool.query("SELECT COUNT(*) as count FROM events");
        const [blogCount] = await pool.query("SELECT COUNT(*) as count FROM blog_posts");

        return NextResponse.json({
            menuItems: (menuCount as any)[0].count,
            signatures: (signatureCount as any)[0].count,
            events: (eventCount as any)[0].count,
            blogPosts: (blogCount as any)[0].count,
        });
    } catch (error: any) {
        console.error("Error fetching dashboard stats:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
