"use client";

import { motion } from "framer-motion";
import { ArrowRight, UtensilsCrossed, Coffee, Pizza, Soup } from "lucide-react";
import Link from "next/link";

const categories = [
    {
        id: "bowls",
        name: "Premium Bowls",
        icon: Soup,
        items: ["Truffle Wagyu", "Spicy Lamb", "Chicken Teriyaki"],
        color: "from-yellow-400 to-amber-600",
    },
    {
        id: "grills",
        name: "Flame Grills",
        icon: UtensilsCrossed,
        items: ["Mixed Platter", "Lamb Chops", "Grilled Salmon"],
        color: "from-red-400 to-rose-600",
    },
    {
        id: "sides",
        name: "Sides & Starters",
        icon: Pizza, // Using Pizza as generic 'side' icon alternative
        items: ["Hummus & Pita", "Falafel", "Spicy Fries"],
        color: "from-green-400 to-emerald-600",
    },
    {
        id: "drinks",
        name: "Drinks & Desserts",
        icon: Coffee,
        items: ["Mango Lassi", "Baklava", "Mint Lemonade"],
        color: "from-blue-400 to-indigo-600",
    },
];

export default function MenuPreview() {
    return (
        <section className="py-20 bg-black relative">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h3 className="text-primary font-medium tracking-widest uppercase mb-3">
                            Discover Our Menu
                        </h3>
                        <h2 className="text-4xl md:text-5xl font-bold text-white">
                            Curated <span className="text-gray-500">Collections</span>
                        </h2>
                    </div>
                    <Link
                        href="/menu"
                        className="flex items-center gap-2 text-white hover:text-primary transition-colors group"
                    >
                        View Full Menu
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-card border border-white/5 rounded-3xl p-8 hover:border-primary/30 transition-all duration-300 group cursor-pointer"
                        >
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-6 shadow-lg`}>
                                <category.icon size={28} className="text-white" />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                                {category.name}
                            </h3>

                            <ul className="space-y-3 mb-8">
                                {category.items.map((item) => (
                                    <li key={item} className="text-gray-400 text-sm flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <div className="flex items-center text-primary font-medium text-sm">
                                Explore Category <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
