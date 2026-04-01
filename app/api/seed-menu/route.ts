import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
    try {
        const menuData = [
            {
                name: "Combos & Meals",
                description: "Perfect combinations for a wholesome meal",
                items: [
                    { name: "Veg Wrap Combo", description: "Veg Wrap + Coke 250ml + French Fries", price: "225", popular: true },
                    { name: "Chicken Wrap Combo", description: "Chicken Wrap + Coke 250ml + French Fries", price: "250", popular: true },
                    { name: "Couple Combo", description: "2 Veg Burger + Coke 600ml + French Fries + 2 Perk Chocolate", price: "340" },
                    { name: "Crunchy Combo", description: "Chicken Crunch Burger + Coke 250ml + 1pc Fried Chicken + French Fries", price: "290", popular: true },
                    { name: "Hot Meal", description: "2pc Fried Chicken + 2 Crunch Burger + French Fries + 600ml Coke + 2 Perk Chocolate + Garlic Mayo", price: "520" },
                    { name: "Family Treat", description: "6pc Fried Chicken + 3 Bun + French Fries + 1Ltr Coke + Garlic Mayo", price: "620", popular: true },
                    { name: "Jumbo Combo", description: "12pc Fried Chicken + 6 Bun + Popcorn Chicken + French Fries + Coke 2ltr + Garlic Mayo", price: "1190" }
                ]
            },
            {
                name: "Indian Bread",
                description: "Freshly baked traditional tandoori breads",
                items: [
                    { name: "Roti Ki Tokri", price: "360" },
                    { name: "Tandoori Roti", price: "35" },
                    { name: "Butter Roti", price: "40" },
                    { name: "Plain Naan", price: "40" },
                    { name: "Butter Naan", price: "50", popular: true },
                    { name: "Plain Kulcha", price: "50" },
                    { name: "Butter Kulcha", price: "55" },
                    { name: "Veg Kulcha", price: "70" },
                    { name: "Aloo Kulcha", price: "70" },
                    { name: "Pudina Kulcha", price: "70" },
                    { name: "Amritsari Kulcha", price: "85" },
                    { name: "Garlic Naan", price: "60", popular: true },
                    { name: "Butter Garlic Naan", price: "70" },
                    { name: "Butter Cheese Naan", price: "110" },
                    { name: "Garlic Cheese Naan", price: "120" },
                    { name: "Laccha Paratha", price: "70" },
                    { name: "Aloo Paratha", price: "70" },
                    { name: "Pudina Paratha", price: "70" },
                    { name: "Rumali Roti", price: "50" }
                ]
            },
            {
                name: "South Indian Bread",
                description: "Authentic parottas and chapatis",
                items: [
                    { name: "Kerala Parotta", price: "30", popular: true },
                    { name: "Chapati", price: "25" },
                    { name: "Square Chapati", price: "45" },
                    { name: "Butter Chapati", price: "35" },
                    { name: "Coin Parotta", price: "25" },
                    { name: "Wheat Parotta", price: "35" },
                    { name: "Ceylon Parotta", price: "60" },
                    { name: "Wheat Ceylon Parotta", price: "60" }
                ]
            },
            {
                name: "Chawal Se",
                description: "Flavorsome biryanis and rice dishes",
                items: [
                    { name: "Malabar Chicken Biryani Family Pack", price: "685" },
                    { name: "Malabar Mutton Biryani Family Pack", price: "980" },
                    { name: "Malabar Veg Biryani Family Pack", price: "580" },
                    { name: "Malabar Chicken Dum Biryani", price: "240", popular: true },
                    { name: "Malabar Mutton Biryani", price: "360" },
                    { name: "Hyd Chicken Dum Biryani", price: "245" },
                    { name: "Hyd Mutton Biryani", price: "365", popular: true },
                    { name: "Chicken Madka Dum Biryani", price: "380" },
                    { name: "Mutton Madka Dum Biryani", price: "510" },
                    { name: "Grill Chicken Biryani", description: "Half / Full", price: "495" },
                    { name: "Tandoori Chicken Biryani", description: "Half / Full", price: "495" },
                    { name: "BBQ Chicken Biryani", description: "Half / Full", price: "540" },
                    { name: "Chicken Tikka Biryani", price: "355" },
                    { name: "Tawa Fish Biryani", description: "Seasonal", price: "0" },
                    { name: "Fish Tikka Biryani", description: "Seasonal", price: "0" },
                    { name: "Hyd Chicken Dum Biryani Family", price: "720" },
                    { name: "Hyd Mutton Biryani Family", price: "995" },
                    { name: "Matka Chicken Dum Biryani Family", price: "750" },
                    { name: "Matka Mutton Biryani Family", price: "1060" },
                    { name: "Bucket Chicken Biryani (MLBR)", price: "999" },
                    { name: "Bucket Mutton Biryani (MLBR)", price: "1340" },
                    { name: "Bucket Chicken Biryani (HYD)", price: "1099" },
                    { name: "Bucket Mutton Biryani (HYD)", price: "1450" },
                    { name: "Hyderabadi Biryani Rice", price: "120" },
                    { name: "Malabar Biryani Rice", price: "110" },
                    { name: "Panner Tikka Biryani", price: "230" },
                    { name: "Veg Biryani", price: "190" },
                    { name: "Jeera Rice", price: "120" },
                    { name: "Veg Pulao", price: "155" },
                    { name: "Ghee Rice", price: "110" },
                    { name: "Steam Rice", price: "90" },
                    { name: "Curd Rice", price: "110" },
                    { name: "Egg Biryani", price: "180" },
                    { name: "Prawns Biryani", price: "430" },
                    { name: "Mutton Yakhni Pulao", price: "395" },
                    { name: "Mushroom Biryani", price: "210" },
                    { name: "Mushroom Pulao", price: "200" },
                    { name: "Green Peas Pulao", price: "200" },
                    { name: "Paneer Pulao", price: "200" }
                ]
            },
            {
                name: "Thai Curry & Chop Suey",
                description: "Exotic orient choices",
                items: [
                    { name: "Thai Curry Red With Rice Veg", price: "340" },
                    { name: "Thai Curry Red With Rice Chicken", price: "410", popular: true },
                    { name: "Thai Curry Red With Rice Prawns", price: "540" },
                    { name: "Thai Curry Green With Rice Veg", price: "340" },
                    { name: "Thai Curry Green With Rice Chicken", price: "410" },
                    { name: "Thai Curry Green With Rice Prawns", price: "540" },
                    { name: "American Chop Suey Veg", price: "240" },
                    { name: "American Chop Suey Chicken", price: "270" },
                    { name: "Chinese Chop Suey Veg", price: "240" },
                    { name: "Chinese Chop Suey Chicken", price: "270" }
                ]
            },
            {
                name: "Rice & Noodles",
                description: "Wok-tossed perfection",
                items: [
                    { name: "Fried Rice Veg", price: "175" },
                    { name: "Fried Rice Chicken", price: "235", popular: true },
                    { name: "Fried Rice Prawns", price: "275" },
                    { name: "Noodles Veg", price: "190" },
                    { name: "Noodles Chicken", price: "245" },
                    { name: "Noodles Prawns", price: "285" },
                    { name: "Leefu Fried Rice Veg", price: "200" },
                    { name: "Leefu Fried Rice Chicken", price: "255" },
                    { name: "Schezwan Fried Rice Veg", price: "200" },
                    { name: "Schezwan Fried Rice Chicken", price: "255" },
                    { name: "Chilli Garlic Fried Rice Veg", price: "200" },
                    { name: "Chilli Garlic Fried Rice Chicken", price: "255" },
                    { name: "Singapore Noodles Chicken", price: "255" },
                    { name: "Paneer Fried Rice", price: "235" }
                ]
            },
            {
                name: "Arabic Grill & Barbeque",
                description: "Spiced and charcoal grilled signatures",
                items: [
                    { name: "BBQ Chicken Full", price: "530" },
                    { name: "BBQ Chicken Half", price: "260" },
                    { name: "Pepper Barbeque Full", price: "530" },
                    { name: "Pepper Barbeque Half", price: "260" },
                    { name: "Dejaj Al Faham Full", price: "530", popular: true },
                    { name: "Dejaj Al Faham Half", price: "260" },
                    { name: "Kandari Al Faham Full", price: "590" },
                    { name: "Kandari Al Faham Half", price: "310" },
                    { name: "Grill Chicken Full", price: "470" },
                    { name: "Grill Chicken Half", price: "245" },
                    { name: "Red Hot BBQ Chicken Full", price: "590" },
                    { name: "Red Hot BBQ Chicken Half", price: "310" },
                    { name: "Afghani BBQ Full", price: "590" },
                    { name: "Afghani BBQ Half", price: "310" },
                    { name: "Egyptian BBQ Full", price: "590" },
                    { name: "Touk Alfaham", price: "360" },
                    { name: "Iffa Dojaj", price: "460" }
                ]
            },
            {
                name: "Village Fried Chicken",
                description: "Crispy and juicy Fried Chicken selections",
                items: [
                    { name: "Fried Chicken 1 Piece", price: "90" },
                    { name: "Fried Chicken 2 Pieces", price: "170" },
                    { name: "Fried Chicken 4 Pieces", price: "310" },
                    { name: "Fried Chicken 6 Pieces", price: "450" },
                    { name: "Fried Chicken 12 Pieces", price: "830", popular: true },
                    { name: "Fried Chicken Lollipop (6pc)", price: "360" },
                    { name: "Chicken Grilled Sandwich", price: "120" },
                    { name: "Chicken Cheese Sandwich", price: "140" },
                    { name: "Chicken Crunch Burger", price: "160", popular: true },
                    { name: "Chicken Crunch Burger With Cheese", price: "170" },
                    { name: "Chicken Burger", price: "140" },
                    { name: "Chicken Burger With Cheese", price: "150" },
                    { name: "Chicken Zinger Burger", price: "170" },
                    { name: "Popcorn Chicken", price: "150" },
                    { name: "Chicken Strips (6pc)", price: "240" },
                    { name: "Chicken Wrap", price: "165" },
                    { name: "Chicken Nuggets", price: "140" },
                    { name: "Veg Wrap", price: "130" },
                    { name: "Veg Burger", price: "130" },
                    { name: "Double Cheese Veg Burger", price: "150" },
                    { name: "Veg Nuggets", price: "120" },
                    { name: "Veg Grilled Sandwich", price: "100" },
                    { name: "Veg Cheese Sandwich", price: "120" },
                    { name: "French Fries", price: "140" },
                    { name: "Peri-Peri French Fries", price: "175", popular: true },
                    { name: "Haryali French Fries", price: "175" }
                ]
            },
            {
                name: "Kabab Ki Gali Non Veg",
                description: "Tandoori treats and succulent kebabs",
                items: [
                    { name: "Village Special Tandoori Chicken Full", price: "530", popular: true },
                    { name: "Village Special Tandoori Chicken Half", price: "280" },
                    { name: "Tandoori Chicken Full", price: "490" },
                    { name: "Tandoori Chicken Half", price: "250" },
                    { name: "Kalmi Kabab Full", price: "375" },
                    { name: "Murg Afghani Full", price: "590" },
                    { name: "Reshmi Kabab", price: "360" },
                    { name: "Murg Tikka", price: "315" },
                    { name: "Aachari Murg Tikka", price: "325" },
                    { name: "Murg Malai Tikka", price: "325", popular: true },
                    { name: "Murg Hariyali Tikka", price: "325" },
                    { name: "Murg Peshwari Tikka", price: "325" },
                    { name: "Murg Sheek Kabab", price: "360" },
                    { name: "Murg Banjara Tikka", price: "325" },
                    { name: "Lassoni Murg Tikka", price: "325" },
                    { name: "Chicken Kabab (Oil Fry)", price: "325" },
                    { name: "Shahi Murg Tikka", price: "325" },
                    { name: "Mutton Sheek Kabab", price: "510" },
                    { name: "Charcoal Chicken Platters", price: "750" },
                    { name: "Charcoal Mix Platters", price: "1140" },
                    { name: "Mutton Galauti Kabab", price: "550" },
                    { name: "Murg Rashida Kabab", price: "350" },
                    { name: "Tandoori Wings", price: "340" },
                    { name: "Chicken Fry (Full Chicken)", price: "540" },
                    { name: "Chicken Fry (1 Pc)", price: "200" },
                    { name: "Chicken 65 (Oil Fry)", price: "330" }
                ]
            },
            {
                name: "Kabab Ki Galli Veg",
                description: "Vegetarian flame-grilled delights",
                items: [
                    { name: "Paneer Tikka", price: "270", popular: true },
                    { name: "Paneer Achari Tikka", price: "285" },
                    { name: "Paneer Malai Tikka", price: "285" },
                    { name: "Paneer Peshawari Tikka", price: "280" },
                    { name: "Zaffrani Paneer Tikka", price: "280" },
                    { name: "Hariyali Paneer Tikka", price: "280" },
                    { name: "Hara Bhara Kabab", price: "240" },
                    { name: "Tandoori Bharwan Aloo", price: "310" },
                    { name: "Veg Sheek Kabab", price: "250" },
                    { name: "Tandoori Pineapple", price: "240" },
                    { name: "Tandoori Baby Corn", price: "225" },
                    { name: "Tandoori Gobi", price: "225" },
                    { name: "Mushroom Tikka", price: "240" },
                    { name: "Stuff Mushroom", price: "290" },
                    { name: "Dahi Ki Sholay", price: "260" },
                    { name: "Veg Platter", price: "640" }
                ]
            },
            {
                name: "Shawarma Roll & Salads",
                description: "Quick bites and fresh accompaniments",
                items: [
                    { name: "Mexican Shawarma Roll", price: "110" },
                    { name: "Shawarma Roll", price: "95", popular: true },
                    { name: "Shawarma Plate", price: "180" },
                    { name: "Garlic Shawarma", price: "130" },
                    { name: "Shawarma (kp)", price: "130" },
                    { name: "Hummus Shawarma", price: "130" },
                    { name: "Mexican Shawarma Plate", price: "200" },
                    { name: "Shawarma Roll Only chicken", price: "160" },
                    { name: "Shawarma Plate Only Chicken", price: "230" },
                    { name: "Green Salad", price: "110" },
                    { name: "Russian Salad", price: "159" },
                    { name: "Fattoush Salad", price: "159" },
                    { name: "Sweet Corn Salad Veg", price: "145" },
                    { name: "Veg Hawaiian Salad", price: "145" },
                    { name: "Cheese Cherry Pineapple", price: "190" },
                    { name: "Spicy Chicken Tikka Salad", price: "210" },
                    { name: "Ceasar Salad Chicken", price: "230" },
                    { name: "Mix Veg Raitha", price: "90" },
                    { name: "Boondi Raita", price: "100" },
                    { name: "Pineapple Raitha", price: "100" }
                ]
            },
            {
                name: "Indian Veg Gravy",
                description: "Rich vegetarian curries",
                items: [
                    { name: "Paneer Butter Masala", price: "230", popular: true },
                    { name: "Paneer Tikka Masala", price: "230" },
                    { name: "Mutter Paneer", price: "230" },
                    { name: "Paneer Bhurji", price: "280" },
                    { name: "Paneer Do Pyaza", price: "230" },
                    { name: "Kadai Paneer", price: "230" },
                    { name: "Paneer Lababdar", price: "250" },
                    { name: "Kaju Masala", price: "280" },
                    { name: "Palak Paneer", price: "230" },
                    { name: "Mushroom Masala", price: "230" },
                    { name: "Veg Jaipuri", price: "230" },
                    { name: "Veg Kadai", price: "230" },
                    { name: "Veg Kolapuri", price: "230" },
                    { name: "Veg Kofta", price: "230" },
                    { name: "Malai Kofta", price: "250", popular: true },
                    { name: "Nargise Kofta", price: "250" },
                    { name: "Veg Hydrabadi", price: "230" },
                    { name: "Veg Kurma", price: "250" },
                    { name: "Shahi Paneer", price: "240" },
                    { name: "Aloo Jeera", price: "180" },
                    { name: "Aloo Gobi", price: "200" },
                    { name: "Mix Veg Curry", price: "220" },
                    { name: "Mushroom Mutter", price: "230" },
                    { name: "Mushroom Kaju", price: "250" },
                    { name: "Green Peas Masala", price: "200" },
                    { name: "Gobi Mutter", price: "200" },
                    { name: "Kaju Paneer", price: "260" },
                    { name: "Bhindi Dry Fry", price: "200" },
                    { name: "Veg Tawa", price: "210" },
                    { name: "Chole Masala", price: "210" }
                ]
            },
            {
                name: "Indian Non-Veg Gravy",
                description: "Authentic non-veg curries",
                items: [
                    { name: "Murg Musallam Full", price: "850" },
                    { name: "Shimla Murg Full", price: "780" },
                    { name: "Murg Adraki", price: "270" },
                    { name: "Signature Butter Chicken", price: "310", popular: true },
                    { name: "Chicken Methi", price: "250" },
                    { name: "Chicken Patiala", price: "380" },
                    { name: "Chicken Tikka Masala", price: "280" },
                    { name: "Chicken Hyderabadi", price: "260" },
                    { name: "Chicken Rara", price: "280" },
                    { name: "Chicken Lababdar", price: "270" },
                    { name: "Chicken Lajawab", price: "260" },
                    { name: "Chicken Bharta", price: "290" },
                    { name: "Chicken Do Pyaza", price: "270" },
                    { name: "Chicken Laziz", price: "370" },
                    { name: "Lassuni Tawa Chicken", price: "370" },
                    { name: "Chicken Kadai", price: "270" },
                    { name: "Chicken Kolapuri", price: "270" },
                    { name: "Chicken Kali Mirchi", price: "270" },
                    { name: "Chicken Chattinadu", price: "270" },
                    { name: "Prawns Masala", price: "450" },
                    { name: "Prawns Kali Mirchi", price: "450" },
                    { name: "Chicken Kurma", price: "320" },
                    { name: "Chicken Pakiza", price: "370" },
                    { name: "Chicken Mughlai", price: "370" },
                    { name: "Chicken Pepper Dry", price: "400" },
                    { name: "Prawns Kolapuri", price: "450" }
                ]
            },
            {
                name: "Indian Mutton Gravy",
                description: "Rich mutton delicacies",
                items: [
                    { name: "Mutton Masala", price: "430" },
                    { name: "Mutton Dopyaza", price: "430" },
                    { name: "Mutton Rogan Josh", price: "460", popular: true },
                    { name: "Mutton Pepper Dry", price: "430" },
                    { name: "Mutton Kaali Mirchi", price: "430" },
                    { name: "Mutton Kadai", price: "430" },
                    { name: "Mutton Kurma", price: "430" },
                    { name: "Mutton Hyderabadi", price: "410" },
                    { name: "Mutton Rara", price: "460" },
                    { name: "Mutton Bhuna", price: "460" },
                    { name: "Mutton Saagwala", price: "430" },
                    { name: "Mutton Keema Mutter", price: "460" },
                    { name: "Mutton Laziz", price: "490" },
                    { name: "Nihari Gosh", price: "480" },
                    { name: "Mutton Mughlai", price: "540" },
                    { name: "Mutton Maharaja", price: "490" },
                    { name: "Mutton Keema Masala", price: "430" },
                    { name: "Mutton Allo Keema", price: "400" },
                    { name: "Mutton Keema Dal", price: "400" }
                ]
            },
            {
                name: "Beverages & Desserts",
                description: "Sweets, Spl Faloodas, and refreshing drinks",
                items: [
                    { name: "Hot Gulab Jamun", price: "95" },
                    { name: "Gulab Jamun Rabdi", price: "145", popular: true },
                    { name: "Shahi Tukda", price: "145" },
                    { name: "Gajar Ka Halwa", price: "145" },
                    { name: "Village Spl Falooda", price: "270", popular: true },
                    { name: "Royal Falooda", price: "190" },
                    { name: "Mix Fruit Falooda", price: "175" },
                    { name: "Dry Nut Falooda", price: "200" },
                    { name: "Triple Sunday", price: "180" },
                    { name: "Gud Bud", price: "210" },
                    { name: "Classic Cold Coffee", price: "130" },
                    { name: "Hazelnut Cold Coffee", price: "140" },
                    { name: "Irish Cold Coffee", price: "140" },
                    { name: "Choco Oreo Shake", price: "150" },
                    { name: "Classic Mojito", price: "145" },
                    { name: "Blue Mojito", price: "145" },
                    { name: "Mango Mojito", price: "145" },
                    { name: "Watermelon Mojito", price: "145" },
                    { name: "Green Apple Mojito", price: "145" },
                    { name: "Lemon Ice Tea", price: "120" },
                    { name: "Peach Ice Tea", price: "120" },
                    { name: "Strawberry Lassi", price: "100" },
                    { name: "Mango Lassi", price: "100" },
                    { name: "Sweet Lassi", price: "90" }
                ]
            }
        ];

        // Debug the error
        try {
            await pool.query('SELECT 1');
        } catch (e: any) {
            return NextResponse.json({ error: "DB connection failed: " + e.message }, { status: 500 });
        }

        // Clean existing menu to prevent enormous duplication runs (idempotent)
        await pool.query('DELETE FROM menu_items');
        await pool.query('DELETE FROM menu_categories');

        let catSort = 0;
        for (const cat of menuData) {
            const catId = cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            await pool.query(
                'INSERT IGNORE INTO menu_categories (id, name, description, sort_order) VALUES (?, ?, ?, ?)',
                [catId, cat.name, cat.description, catSort++]
            );

            for (const item of cat.items) {
                const itemId = catId + '-' + item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                await pool.query(
                    'INSERT IGNORE INTO menu_items (id, category_id, name, description, currency, price, image, popular) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                    [
                        itemId,
                        catId,
                        item.name,
                        (item as any).description || '',
                        'INR',
                        item.price,
                        '/chicken-over-rice.jpg', // Placeholder image standard
                        (item as any).popular ? 1 : 0
                    ]
                );
            }
        }

        return NextResponse.json({ message: 'Menu bulk import completed successfully! Populated ' + menuData.length + ' categories.' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
