import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
    try {
        const { rows } = await pool.query('SELECT setting_key, setting_value FROM restaurant_settings');
        const settings = rows.reduce((acc: any, row: any) => {
            acc[row.setting_key] = row.setting_value;
            return acc;
        }, {});
        return NextResponse.json(settings);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const settings = await request.json();
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            for (const [key, value] of Object.entries(settings)) {
                await client.query(
                    'INSERT INTO restaurant_settings (setting_key, setting_value) VALUES ($1, $2) ON CONFLICT (setting_key) DO UPDATE SET setting_value = $2',
                    [key, value]
                );
            }
            await client.query('COMMIT');
            return NextResponse.json({ message: 'Settings updated successfully' });
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }
}
