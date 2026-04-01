"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, UtensilsCrossed, Coffee, Pizza, Soup, Beef, Fish, Drumstick } from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, any> = {
    beef: Beef,
    chicken: Drumstick,
    fish: Fish,
    bowls: Soup,
    grills: UtensilsCrossed,
    sides: Pizza,
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
}

const colorMap: Record<string, string> = {
    bowls: "from-yellow-400 to-amber-600",
    grills: "from-red-400 to-rose-600",
    sides: "from-green-400 to-emerald-600",
    drinks: "from-blue-400 to-indigo-600",
    defaults: "from-gray-400 to-gray-600"
};

export default function MenuPreview() {
    const [categories, setCategories] = React.useState<PreviewCategory[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchMenuPreview = async () => {
            try {
                const [catRes, itemRes] = await Promise.all([
                    fetch("/api/menu/categories"),
                    fetch("/api/menu/items")
                ]);
                const cats = await catRes.json();
                const items = await itemRes.json();

                const previewData: PreviewCategory[] = Array.isArray(cats) ? (cats as any[]).slice(0, 4).map((cat: any) => ({
                    ...cat,
                    icon: iconMap[cat.id] || iconMap.defaults,
                    color: colorMap[cat.id] || colorMap.defaults,
                    displayItems: Array.isArray(items)
                        ? (items as any[]).filter((i: any) => i.category_id === cat.id).slice(0, 3).map((i: any) => i.name)
                        : []
                })) : [];

                setCategories(previewData);
            } catch (error) {
                console.error("Error fetching menu preview:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMenuPreview();
    }, []);

    if (isLoading) return null;
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
                            className="bg-card border border-gray-200 dark:border-white/5 rounded-3xl p-8 hover:border-primary/30 transition-all duration-300 group cursor-pointer shadow-md dark:shadow-none flex flex-col h-full"
                        >
                            <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${category.color} flex items-center justify-center mb-6 shadow-lg`}>
                                <category.icon size={28} className="text-white" />
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors">
                                {category.name}
                            </h3>

                            <ul className="space-y-3 mb-8 grow">
                                {category.displayItems.map((item: any) => (
                                    <li key={item} className="text-gray-600 dark:text-gray-400 text-sm flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-white/20 mt-1.5 shrink-0" />
                                        <span className="line-clamp-2">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href={`/menu#${category.id}`}
                                className="flex items-center justify-center gap-2 text-primary font-bold text-sm mt-auto py-3 px-6 rounded-xl border border-primary/20 hover:bg-primary hover:text-black transition-all group/btn"
                            >
                                Explore Category <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section >
    );
}
