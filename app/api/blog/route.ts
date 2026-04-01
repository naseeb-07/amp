import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET all blog posts
export async function GET() {
    try {
        const [rows] = await pool.query('SELECT * FROM blog_posts');
        return NextResponse.json(rows);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST new blog post
export async function POST(request: Request) {
    try {
        const { title, snippet, date, readTime, image } = await request.json();
        await pool.query(
            'INSERT INTO blog_posts (title, snippet, date, readTime, image) VALUES (?, ?, ?, ?, ?)',
            [title, snippet, date, readTime, image]
        );
        return NextResponse.json({ message: 'Blog post created successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
