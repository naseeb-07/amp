import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = "force-dynamic";

const dataFilePath = path.join(process.cwd(), 'data', 'feedback.json');

async function ensureDataFile() {
    try {
        await fs.mkdir(path.dirname(dataFilePath), { recursive: true });
        try {
            await fs.access(dataFilePath);
        } catch {
            await fs.writeFile(dataFilePath, JSON.stringify([]));
        }
    } catch (error) {
        console.error("Error writing data source:", error);
    }
}

export async function GET(request: Request) {
    try {
        await ensureDataFile();
        const url = new URL(request.url);
        const approvedOnly = url.searchParams.get('approved') === 'true';

        const data = await fs.readFile(dataFilePath, 'utf8');
        let feedbacks = JSON.parse(data);

        if (approvedOnly) {
            feedbacks = feedbacks.filter((f: any) => f.approved);
        }

        return NextResponse.json(feedbacks);
    } catch (error) {
        console.error('Error reading feedback:', error);
        return NextResponse.json({ error: 'Failed to read feedback' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await ensureDataFile();
        const body = await request.json();

        const newFeedback = {
            id: Date.now().toString(),
            name: body.name,
            role: body.role || "Customer",
            quote: body.quote,
            rating: Number(body.rating) || 5,
            image: body.image || "/default-avatar.png",
            approved: false, // Default to unapproved
            createdAt: new Date().toISOString()
        };

        const data = await fs.readFile(dataFilePath, 'utf8');
        const feedbacks = JSON.parse(data);
        feedbacks.unshift(newFeedback); // Add to beginning

        await fs.writeFile(dataFilePath, JSON.stringify(feedbacks, null, 2));

        return NextResponse.json(newFeedback, { status: 201 });
    } catch (error) {
        console.error('Error saving feedback:', error);
        return NextResponse.json({ error: 'Failed to save feedback' }, { status: 500 });
    }
}
