import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
    try {
        const dishes = [
            { name: "Tandoori Chicken", price: "490", rating: "4.9", isBestSeller: true, image: "https://images.unsplash.com/photo-1599487405620-8e658e411c5d?auto=format&fit=crop&q=80&w=800" },
            { name: "Blue Mojito", price: "145", rating: "4.7", isBestSeller: false, image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800" },
            { name: "Barbeque Chicken", price: "530", rating: "4.8", isBestSeller: true, image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800" },
            { name: "Veg Biryani", price: "190", rating: "4.6", isBestSeller: false, image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80&w=800" },
            { name: "Hyderabadi Chicken Dum Biryani", price: "245", rating: "4.8", isBestSeller: false, image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&q=80&w=800" },
            { name: "Honey Chilli Potato", price: "230", rating: "4.7", isBestSeller: true, image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=800" },
            { name: "Prawns Biryani", price: "430", rating: "4.8", isBestSeller: false, image: "https://images.unsplash.com/photo-1569058242253-92a9c2ca222e?auto=format&fit=crop&q=80&w=800" },
            { name: "Chicken Biryani Rice", price: "240", rating: "4.7", isBestSeller: false, image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=800" },
            { name: "Gobi Manchurian", price: "210", rating: "4.6", isBestSeller: false, image: "https://images.unsplash.com/photo-1606471191009-63994c53898b?auto=format&fit=crop&q=80&w=800" },
            { name: "Mutton Biryani", price: "365", rating: "4.9", isBestSeller: true, image: "https://images.unsplash.com/photo-1645696301019-35adcc18fc21?auto=format&fit=crop&q=80&w=800" },
            { name: "Butter Naan", price: "50", rating: "4.8", isBestSeller: false, image: "https://images.unsplash.com/photo-1626082895617-2c6f16f5bf1c?auto=format&fit=crop&q=80&w=800" },
            { name: "Charcoal Mixed Platter 20 Pieces", price: "1140", rating: "4.9", isBestSeller: false, image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800" },
            { name: "Veg Manchow Soup", price: "135", rating: "4.5", isBestSeller: false, image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&q=80&w=800" },
            { name: "Grilled Chicken Biryani", price: "495", rating: "4.8", isBestSeller: false, image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80&w=800" },
            { name: "Drums of Heaven", price: "375", rating: "4.7", isBestSeller: false, image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800" }
        ];

        try {
            await pool.query('SELECT 1');
        } catch (e) {
            return NextResponse.json({ error: "DB connection failed" }, { status: 500 });
        }

        await pool.query('DELETE FROM signature_dishes');

        for (const dish of dishes) {
            await pool.query(
                'INSERT INTO signature_dishes (name, currency, price, rating, image, isBestSeller) VALUES (?, ?, ?, ?, ?, ?)',
                [dish.name, 'INR', dish.price, dish.rating, dish.image, dish.isBestSeller ? 1 : 0]
            );
        }

        return NextResponse.json({ message: 'Signature dishes seeded successfully! Added ' + dishes.length + ' dishes with dynamic images.' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
