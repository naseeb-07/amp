import { NextResponse } from "next/server";
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'feedback.json');

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();

        const data = await fs.readFile(dataFilePath, 'utf8');
        const feedbacks = JSON.parse(data);

        const index = feedbacks.findIndex((f: any) => f.id === id);
        if (index === -1) {
            return NextResponse.json({ error: "Feedback not found" }, { status: 404 });
        }

        // Update the feedback, preventing ID changes
        feedbacks[index] = { ...feedbacks[index], ...body, id: feedbacks[index].id };
        await fs.writeFile(dataFilePath, JSON.stringify(feedbacks, null, 2));

        return NextResponse.json(feedbacks[index]);
    } catch (error: any) {
        console.error("Error updating feedback:", error);
        return NextResponse.json({ error: error.message || "Failed to update feedback" }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const data = await fs.readFile(dataFilePath, 'utf8');
        let feedbacks = JSON.parse(data);

        const initialLength = feedbacks.length;
        feedbacks = feedbacks.filter((f: any) => f.id !== id);

        if (feedbacks.length === initialLength) {
            return NextResponse.json({ error: "Feedback not found" }, { status: 404 });
        }

        await fs.writeFile(dataFilePath, JSON.stringify(feedbacks, null, 2));
        return NextResponse.json({ message: "Feedback deleted" });
    } catch (error: any) {
        console.error("Error deleting feedback:", error);
        return NextResponse.json({ error: error.message || "Failed to delete feedback" }, { status: 500 });
    }
}
