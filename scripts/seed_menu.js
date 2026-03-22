const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function seed() {
    const pool = mysql.createPool({
        host: process.env.DB_HOST || '127.0.0.1',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'naseeb_db',
        port: Number(process.env.DB_PORT) || 3307,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

    const categories = [
        { id: 'chicken', name: 'Chicken', description: 'Chicken dishes' },
        { id: 'beef', name: 'Beef', description: 'Beef dishes' },
        { id: 'fish', name: 'Fish', description: 'Seafood dishes' },
        { id: 'salad', name: 'Salad', description: 'Fresh Salads' },
        { id: 'sides', name: 'Sides', description: 'Delicious Sides' },
        { id: 'drinks', name: 'Drinks', description: 'Beverages' }
    ];

    const items = [
        { category_id: 'chicken', name: 'Fried Chicken served with Fries', price: '9.99' },
        { category_id: 'chicken', name: 'Grilled BBQ Chicken with Gravy & Country Mashed Potatoes', price: '12.99' },
        { category_id: 'chicken', name: 'Grilled Chicken Wrap with Lettuce, Tomato, Cucumber, Garlic Sauce loaded with Fries', price: '12.99' },
        { category_id: 'chicken', name: 'Grilled Chicken Sub with Lettuce, Tomato, Cucumber, Garlic Sauce served with Fries', price: '12.99' },
        { category_id: 'chicken', name: 'Pasta Alfredo with Grilled Chicken Served with Garlic-basil bread', price: '14.99' },

        { category_id: 'beef', name: 'Brisket (1/2 lbs) with Gravy & Country Mashed Potatoes', price: '19.99' },
        { category_id: 'beef', name: 'Brisket Wrap with Lettuce, Tomato, Cucumber, Garlic Sauce with Fries', price: '14.99' },
        { category_id: 'beef', name: 'Brisket Sub with Lettuce, Tomato, Cucumber, Garlic Sauce with Fries', price: '14.99' },

        { category_id: 'fish', name: 'Classic Fish \'n Chip with Homemade Tartar Sauce & Fries', price: '14.99' },
        { category_id: 'fish', name: 'Fish Sub with Homemade Tartar Sauce served with Fries', price: '14.99' },
        { category_id: 'fish', name: 'Surf \'n Turf Pasta Alfredo with Grilled Chicken & Shrimp. Served with Garlic-Basil Bread', price: '19.99' },

        { category_id: 'salad', name: 'Pasta Salad with Grilled Chicked', price: '12.99' },
        { category_id: 'salad', name: 'Caesar Salad with Grilled Chicked', price: '12.99' },

        { category_id: 'sides', name: 'Fries with homemade Spices', price: '4.99' },
        { category_id: 'sides', name: 'Country Mashed Potatoes', price: '4.99' },
        { category_id: 'sides', name: 'Mac & Cheese', price: '6.99' },
        { category_id: 'sides', name: 'Coleslaw', price: '5.99' },
        { category_id: 'sides', name: 'Baked Beans', price: '5.99' },
        { category_id: 'sides', name: 'Rice Pilaf', price: '5.99' },
        { category_id: 'sides', name: 'Caesar Salad', price: '6.99' },
        { category_id: 'sides', name: 'House Salad', price: '6.99' },

        { category_id: 'drinks', name: 'Bottled Water', price: '1.99' },
        { category_id: 'drinks', name: 'Bottled Soda', price: '2.79' }
    ];

    const chefsSpecials = [
        { name: 'Nasi Goreng', description: 'Chicken +$3, Beef +$4, Shrimp +$4', price: '12.99', image: '/chicken-over-rice.jpg', limited: 1 },
        { name: 'Dejon Crusted Lamb Racks', description: 'Chef Special', price: '26.99', image: '/lamb-shank.jpg', limited: 1 },
        { name: 'Ribs Sub with Toppings', description: 'Garlic Sauce served with Fries', price: '26.99', image: '/steak.jpg', limited: 1 },
        { name: 'Braised Beef Ribs with Gravy', description: 'Served with Country Mashed Potatoes', price: '26.99', image: '/steak.jpg', limited: 1 }
    ];

    try {
        for (const cat of categories) {
            await pool.query('INSERT IGNORE INTO menu_categories (id, name, description) VALUES (?, ?, ?)', [cat.id, cat.name, cat.description]);
        }

        for (const [i, item] of items.entries()) {
            const id = `item-${i}-${Date.now()}`;
            await pool.query('INSERT INTO menu_items (id, category_id, name, description, currency, price, image, popular) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [id, item.category_id, item.name, '', 'USD', item.price, '/chicken-over-rice.jpg', 0]);
        }

        for (const special of chefsSpecials) {
            await pool.query('INSERT INTO chefs_collection (name, description, currency, price, image, limited) VALUES (?, ?, ?, ?, ?, ?)',
                [special.name, special.description, 'USD', special.price, special.image, special.limited]);
        }

        console.log("Successfully seeded menu items and chef specials.");
    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
}

seed();
