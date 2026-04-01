"use client";

import { motion } from "framer-motion";
import React from "react";
import { Star, Plus, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getCurrencySymbol } from "@/lib/currency";

export default function SignatureDishes() {
    const [dishes, setDishes] = React.useState<any[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchDishes = async () => {
            try {
                const res = await fetch("/api/signature-dishes");
                const data = await res.json();
                setDishes(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching dishes:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDishes();
    }, []);

    if (isLoading) return <div className="py-20 text-center">Loading Our Best...</div>;
    if (dishes.length === 0) return null;

    return (
        <section className="py-20 bg-gray-50 dark:bg-neutral-900 relative overflow-hidden transition-colors duration-300">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-medium tracking-widest uppercase mb-3"
                    >
                        Taste the Exceptional
                    </motion.h3>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white"
                    >
                        Signature <span className="text-primary">Dishes</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {dishes.slice(0, 4).map((dish, index) => (
                        <motion.div
                            key={dish.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-card border border-gray-200 dark:border-white/5 rounded-3xl overflow-hidden hover:border-primary/50 transition-colors duration-300 shadow-lg dark:shadow-none"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={dish.image}
                                    alt={dish.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                {dish.isBestSeller && (
                                    <div className="absolute top-4 left-4 bg-primary text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                                        <Star size={12} fill="currentColor" />
                                        Best Seller
                                    </div>
                                )}
                                <button className="absolute bottom-4 right-4 bg-white text-black p-3 rounded-full shadow-lg translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary">
                                    <Plus size={20} />
                                </button>
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center gap-1 text-primary">
                                        <Star size={16} fill="currentColor" />
                                        <span className="text-gray-900 dark:text-white font-bold text-sm">{dish.rating}</span>
                                    </div>
                                    <span className="text-primary font-bold text-xl">{getCurrencySymbol(dish.currency)} {dish.price}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                                    {dish.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                                    Premium ingredients tailored for the perfect bowl.
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {dishes.length > 4 && (
                    <div className="flex justify-center mt-12">
                        <Link
                            href="/menu"
                            className="group flex items-center gap-3 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-white/5 hover:border-primary/50 text-gray-900 dark:text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-primary/10"
                        >
                            View Full Menu
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform text-primary" />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
