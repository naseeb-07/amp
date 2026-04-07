"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, UtensilsCrossed, Coffee, Pizza, Soup, Beef, Fish, Drumstick } from "lucide-react";
import { menuCategories } from "./MenuData";
import Link from "next/link";
import Image from "next/image";

const iconMap: Record<string, any> = {
    arabian: UtensilsCrossed,
    indian: Drumstick,
    chinese: Soup,
    drinks: Coffee,
    defaults: UtensilsCrossed
};

interface PreviewCategory {
    id: string;
    name: string;
    description: string;
    icon: any;
    color: string;
    displayItems: string[];
    image: string;
}

const colorMap: Record<string, string> = {
    arabian: "from-amber-400 to-orange-600",
    indian: "from-red-400 to-rose-600",
    chinese: "from-emerald-400 to-green-600",
    drinks: "from-blue-400 to-indigo-600",
    defaults: "from-gray-400 to-gray-600"
};

const imageMap: Record<string, string> = {
    arabian: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800",
    indian: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800",
    chinese: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800",
    drinks: "https://images.pexels.com/photos/1893548/pexels-photo-1893548.jpeg?auto=compress&cs=tinysrgb&w=800",
    defaults: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800"
};

export default function MenuPreview() {
    const categories: PreviewCategory[] = menuCategories.slice(0, 4).map((cat) => ({
        ...cat,
        icon: iconMap[cat.id] || iconMap.defaults,
        color: colorMap[cat.id] || colorMap.defaults,
        displayItems: cat.items.slice(0, 3).map((i) => i.name),
        image: imageMap[cat.id] || imageMap.defaults
    }));
    if (categories.length === 0) return null;
    return (
        <section className="py-20 bg-background relative transition-colors duration-300">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h3 className="text-primary font-medium tracking-widest uppercase mb-3">
                            Discover Our Menu
                        </h3>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                            Curated <span className="text-gray-500">Collections</span>
                        </h2>
                    </div>
                    <Link
                        href="/menu"
                        className="flex items-center gap-2 text-gray-900 dark:text-white hover:text-primary transition-colors group"
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
                            className="group relative overflow-hidden rounded-3xl bg-card border border-gray-200 dark:border-white/5 cursor-pointer shadow-md dark:shadow-none h-80 flex flex-col transition-all duration-300 hover:border-primary/30"
                        >
                            {/* Category Image with Overlay */}
                            <div className="absolute inset-0 z-0">
                                <Image 
                                    src={category.image} 
                                    alt={category.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/20 z-10" />
                            </div>

                            <div className="relative z-20 p-8 h-full flex flex-col">
                                <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${category.color} flex items-center justify-center mb-4 shadow-lg`}>
                                    <category.icon size={24} className="text-white" />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-2">
                                    {category.name}
                                </h3>
                                
                                <p className="text-gray-300 text-xs mb-4 line-clamp-1">
                                    {category.description}
                                </p>

                                <ul className="space-y-2 mb-6 grow">
                                    {category.displayItems.map((item: any) => (
                                        <li key={item} className="text-gray-300 text-sm flex items-center gap-2">
                                            <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                                            <span className="line-clamp-1">{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href={`/menu#${category.id}`}
                                    className="flex items-center justify-center gap-2 text-white font-bold text-sm mt-auto py-2 px-4 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 hover:bg-primary hover:text-black hover:border-primary transition-all group/btn"
                                >
                                    Explore <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section >
    );
}
