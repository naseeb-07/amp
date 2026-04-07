export type MenuItem = {
    id: string;
    name: string;
    description: string;
    price: string;
    currency?: string;
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
        id: "arabian",
        name: "Arabian Specials",
        description: "Experience the authentic taste of the Middle East.",
        items: [
            {
                id: "chicken-mandi",
                name: "Village Special Chicken Mandi",
                description: "Succulent chicken served over fragrant Mandi rice, garnished with eggs and nuts.",
                price: "490",
                currency: "INR",
                image: "https://images.unsplash.com/photo-1563379091339-0efb17a3a991?auto=format&fit=crop&q=80&w=2070",
                popular: true,
            },
            {
                id: "shawarma-platter",
                name: "Grand Shawarma Platter",
                description: "Juicy shawarma meat served with pita bread, hummus, garlic dip, and salad.",
                price: "320",
                currency: "INR",
                image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=1974",
            },
            {
                id: "tandoori-platter",
                name: "Mixed Tandoori Platter",
                description: "An assortment of chicken tikka, malai kebab, and fish tikka grilled to perfection.",
                price: "580",
                currency: "INR",
                image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=1974",
                popular: true,
            },
        ],
    },
    {
        id: "indian",
        name: "North Indian Classics",
        description: "Rich, aromatic, and deeply satisfying traditional flavors.",
        items: [
            {
                id: "chicken-biryani",
                name: "Hyderabadi Chicken Biryani",
                description: "Fragrant basmati rice layered with spiced chicken and our house secret spices.",
                price: "340",
                currency: "INR",
                image: "https://images.unsplash.com/photo-1589302168068-1c4592e83ef3?auto=format&fit=crop&q=80&w=1974",
                popular: true,
            },
            {
                id: "butter-chicken",
                name: "Creamy Butter Chicken",
                description: "Tandoori chicken chunks simmered in a velvety tomato and butter gravy.",
                price: "420",
                currency: "INR",
                image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=1970",
            },
            {
                id: "paneer-tikka-masala",
                name: "Paneer Tikka Masala",
                description: "Grilled cottage cheese cubes in a spicy, thick onion-tomato gravy.",
                price: "380",
                currency: "INR",
                image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&q=80&w=2070",
            },
        ],
    },
    {
        id: "chinese",
        name: "Chinese Favorites",
        description: "Classic Indo-Chinese fusion dishes made from the freshest ingredients.",
        items: [
            {
                id: "hakka-noodles",
                name: "Vegetable Hakka Noodles",
                description: "Stir-fried noodles with crisp seasonal vegetables and authentic spices.",
                price: "240",
                currency: "INR",
                image: "https://images.unsplash.com/photo-1512058560550-42749359fa01?auto=format&fit=crop&q=80&w=1974",
            },
            {
                id: "chilli-chicken-dry",
                name: "Szechuan Chilli Chicken",
                description: "Diced chicken tossed with bell peppers, onions, and spicy green chillies.",
                price: "360",
                currency: "INR",
                image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&q=80&w=1974",
                popular: true,
            },
            {
                id: "gobi-manchurian",
                name: "Crispy Gobi Manchurian",
                description: "Deep-fried cauliflower florets tossed in a tangy soy-based sauce.",
                price: "280",
                currency: "INR",
                image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=2070",
            },
        ],
    },
    {
        id: "drinks",
        name: "Mocktails & Beverages",
        description: "Refreshing drinks to perfectly complement your meal.",
        items: [
            {
                id: "mint-mojito",
                name: "Classic Mint Mojito",
                description: "A refreshing blend of fresh mint, lime, and sparkling soda.",
                price: "160",
                currency: "INR",
                image: "https://images.unsplash.com/photo-1513558161293-cdaf7659a992?auto=format&fit=crop&q=80&w=1974",
                popular: true,
            },
            {
                id: "sunset-sparkler",
                name: "Sunset Sparkler",
                description: "Layered citrus mocktail with a hint of grenadine and fresh orange.",
                price: "180",
                currency: "INR",
                image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=1972",
            },
            {
                id: "bottled-water",
                name: "Mineral Water (1L)",
                description: "Fresh and clean bottled mineral water.",
                price: "30",
                currency: "INR",
                image: "https://images.unsplash.com/photo-1523362628242-f513a5e82797?auto=format&fit=crop&q=80&w=2070",
            },
        ],
    },
];

