export type MenuItem = {
    id: string;
    name: string;
    description: string;
    price: string;
    image?: string;
    popular?: boolean;
};

export type MenuCategory = {
    id: string;
    name: string;
    description: string;
    items: MenuItem[];
};

export const menuCategories: MenuCategory[] = [
    {
        id: "chicken",
        name: "Chicken",
        description: "Juicy, tender, and seasoned to perfection.",
        items: [
            {
                id: "fried-chicken",
                name: "Fried Chicken served with Fries",
                description: "Crispy fried chicken served with our golden fries.",
                price: "$9.99",
                image: "/chicken-over-rice.jpg",
            },
            {
                id: "grilled-bbq-chicken",
                name: "Grilled BBQ Chicken",
                description: "With Gravy & Country Mashed Potatoes.",
                price: "$12.99",
                image: "/chicken-over-rice.jpg",
                popular: true,
            },
            {
                id: "grilled-chicken-wrap",
                name: "Grilled Chicken Wrap",
                description: "With Lettuce, Tomato, Cucumber, Garlic Sauce loaded with Fries.",
                price: "$12.99",
                image: "/chicken-over-rice.jpg",
            },
            {
                id: "grilled-chicken-sub",
                name: "Grilled Chicken Sub",
                description: "With Lettuce, Tomato, Cucumber, Garlic Sauce served with Fries.",
                price: "$12.99",
                image: "/chicken-over-rice.jpg",
            },
            {
                id: "pasta-alfredo-chicken",
                name: "Pasta Alfredo with Grilled Chicken",
                description: "Served with Garlic-basil bread.",
                price: "$14.99",
                image: "/chicken-over-rice.jpg",
            },
        ],
    },
    {
        id: "beef",
        name: "Beef",
        description: "Hearty beef dishes rich in flavor.",
        items: [
            {
                id: "brisket",
                name: "Brisket (1/2 lbs)",
                description: "With Gravy & Country Mashed Potatoes.",
                price: "$19.99",
                image: "/steak.jpg",
                popular: true,
            },
            {
                id: "brisket-wrap",
                name: "Brisket Wrap",
                description: "With Lettuce, Tomato, Cucumber, Garlic Sauce with Fries.",
                price: "$14.99",
                image: "/steak.jpg",
            },
            {
                id: "brisket-sub",
                name: "Brisket Sub",
                description: "With Lettuce, Tomato, Cucumber, Garlic Sauce with Fries.",
                price: "$14.99",
                image: "/steak.jpg",
            },
        ],
    },
    {
        id: "fish",
        name: "Fish",
        description: "Fresh catch prepared daily.",
        items: [
            {
                id: "fish-n-chip",
                name: "Classic Fish 'n Chip",
                description: "With Homemade Tartar Sauce & Fries.",
                price: "$14.99",
                image: "/grilled-salmon.jpg",
            },
            {
                id: "fish-sub",
                name: "Fish Sub",
                description: "With Homemade Tartar Sauce served with Fries.",
                price: "$14.99",
                image: "/grilled-salmon.jpg",
            },
            {
                id: "surf-n-turf",
                name: "Surf 'n Turf Pasta Alfredo",
                description: "With Grilled Chicken & Shrimp. Served with Garlic-Basil Bread.",
                price: "$19.99",
                image: "/grilled-salmon.jpg",
                popular: true,
            },
        ],
    },
    {
        id: "salad",
        name: "Salad",
        description: "Fresh greens and grilled goodness.",
        items: [
            {
                id: "pasta-salad",
                name: "Pasta Salad with Grilled Chicken",
                description: "Fresh pasta tossed with grilled chicken.",
                price: "$12.99",
            },
            {
                id: "caesar-salad-chicken",
                name: "Caesar Salad with Grilled Chicken",
                description: "Classic Caesar with tender grilled chicken.",
                price: "$12.99",
            },
        ],
    },
    {
        id: "specials",
        name: "Chefs Specials (Fri - Sat)",
        description: "Exclusive dishes available on weekends.",
        items: [
            {
                id: "nasi-goreng",
                name: "Nasi Goreng",
                description: "Indonesian fried rice. Add Chicken +$3, Beef +$4, Shrimp +$4.",
                price: "$12.99",
                image: "/chicken-over-rice.jpg",
            },
            {
                id: "lamb-racks",
                name: "Dejon Crusted Lamb Racks",
                description: "Succulent lamb racks with a Dijon crust.",
                price: "$26.99",
                image: "/lamb-shank.jpg",
                popular: true,
            },
            {
                id: "ribs-sub",
                name: "Ribs Sub",
                description: "With Toppings, Garlic Sauce served with Fries.",
                price: "$26.99",
                image: "/steak.jpg",
            },
            {
                id: "beef-ribs",
                name: "Braised Beef Ribs",
                description: "With Gravy Served with Country Mashed Potatoes.",
                price: "$26.99",
                image: "/steak.jpg",
            },
        ],
    },
    {
        id: "sides",
        name: "Sides",
        description: "Perfect additions to your meal.",
        items: [
            { id: "fries", name: "Fries with homemade Spices", description: "", price: "$4.99" },
            { id: "mashed-potatoes", name: "Country Mashed Potatoes", description: "", price: "$4.99" },
            { id: "mac-cheese", name: "Mac & Cheese", description: "", price: "$6.99" },
            { id: "coleslaw", name: "Coleslaw", description: "", price: "$5.99" },
            { id: "baked-beans", name: "Baked Beans", description: "", price: "$5.99" },
            { id: "rice-pilaf", name: "Rice Pilaf", description: "", price: "$5.99" },
            { id: "choice-salad", name: "Choice of Dressings", description: "Balsamic Vinaigrette, Thousand Island, Ranch", price: "" },
        ],
    },
    {
        id: "drinks",
        name: "Drinks",
        description: "Refresh yourself.",
        items: [
            { id: "water", name: "Bottled Water", description: "", price: "$1.99" },
            { id: "soda", name: "Bottled Soda", description: "", price: "$2.79" },
        ],
    },
];
