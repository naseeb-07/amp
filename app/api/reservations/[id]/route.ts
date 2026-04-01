import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER || 'contact@villagerestaurant.com',
        pass: process.env.SMTP_PASS || 'password123'
    }
});

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const params = await context.params;
        const id = params.id;

        const data = await request.json();
        const { status } = data;

        if (!status || !['approved', 'rejected'].includes(status)) {
            return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
        }

        await pool.query('UPDATE reservations SET status = $1 WHERE id = $2', [status, id]);

        const { rows } = await pool.query('SELECT * FROM reservations WHERE id = $1', [id]);
        if (rows.length === 0) {
            return NextResponse.json({ error: 'Reservation not found' }, { status: 404 });
        }

        const reservation = rows[0];

        try {
            await transporter.sendMail({
                from: process.env.SMTP_USER || 'reservations@villagerestaurant.com',
                to: reservation.email,
                subject: `Reservation ${status === 'approved' ? 'Confirmed' : 'Declined'} - Village Restaurant`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; text-align: center;">
                        <h2 style="color: ${status === 'approved' ? '#4CAF50' : '#f44336'};">Reservation ${status === 'approved' ? 'Approved' : 'Declined'}</h2>
                        <p>Dear ${reservation.name},</p>
                        <p>Your reservation for <strong>${reservation.date}</strong> at <strong>${reservation.time}</strong> for <strong>${reservation.persons} person(s)</strong> has been ${status}.</p>
                        ${status === 'approved' ? `<p>We look forward to serving you!</p>` : `<p>Please contact us for alternative arrangements.</p>`}
                        <p>Best regards,<br/><strong>Village Restaurant Team</strong></p>
                    </div>
                `
            });
        } catch (emailError) {
            console.error("Failed to send email:", emailError);
        }

        return NextResponse.json({ success: true, reservation });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
