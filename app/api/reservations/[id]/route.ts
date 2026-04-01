import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    // Use an ethereal account or valid SMTP details here.
    // For local dev/testing without real SMTP, we can use a free service like Ethereal or standard Gmail (if app password is set).
    // Let's use standard Gmail settings, but fallback if not configured correctly.
    // In production, these should be environment variables.
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER || 'contact@villagerestaurant.com', // Replace with real email
        pass: process.env.SMTP_PASS || 'password123'              // Replace with real app password
    }
});

// Avoid crashing if transporter isn't configured by mocking sendMail in dev if needed
// However, the prompt asked to integrate it. We'll attempt the send.
export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        // First await params in Next.js 15
        const params = await context.params;
        const id = params.id;

        const data = await request.json();
        const { status } = data; // 'approved' or 'rejected'

        if (!status || !['approved', 'rejected'].includes(status)) {
            return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
        }

        // Update DB
        await pool.query('UPDATE reservations SET status = ? WHERE id = ?', [status, id]);

        // Fetch back the updated reservation to get the user's email
        const [rows]: any = await pool.query('SELECT * FROM reservations WHERE id = ?', [id]);
        if (rows.length === 0) {
            return NextResponse.json({ error: 'Reservation not found' }, { status: 404 });
        }

        const reservation = rows[0];

        // Send Email using Nodemailer
        try {
            const mailOptions = {
                from: process.env.SMTP_USER || 'reservations@villagerestaurant.com',
                to: reservation.email,
                subject: `Reservation ${status === 'approved' ? 'Confirmed' : 'Declined'} - Village Restaurant`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333 text-align: center;">
                        <h2 style="color: ${status === 'approved' ? '#4CAF50' : '#f44336'};">Reservation ${status === 'approved' ? 'Approved' : 'Declined'}</h2>
                        <p>Dear ${reservation.name},</p>
                        <p>Your reservation request for <strong>${reservation.date}</strong> at <strong>${reservation.time}</strong> for <strong>${reservation.persons} person(s)</strong> has been ${status}.</p>
                        ${status === 'approved' ? `<p>We are looking forward to serving you!</p>` : `<p>Unfortunately, we cannot accommodate your request at this time. Please contact us for alternative arrangements.</p>`}
                        <br/>
                        <p>Best regards,</p>
                        <p><strong>Village Restaurant Team</strong></p>
                    </div>
                `
            };

            // In local development without valid SMTP, this might throw. We wrap in try-catch to not fail the API response
            await transporter.sendMail(mailOptions);
            console.log("Email sent successfully to", reservation.email);
        } catch (emailError) {
            console.error("Failed to send email (check SMTP config):", emailError);
            // We don't fail the whole request just because email failed, but we log it.
        }

        return NextResponse.json({ success: true, reservation });
    } catch (error: any) {
        console.error("PATCH /api/reservations/[id] error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
