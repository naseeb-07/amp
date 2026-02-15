"use client";

import { motion } from "framer-motion";
import { Star, Plus } from "lucide-react";
import Image from "next/image";

const dishes = [
    {
        id: 1,
        name: "Truffle Wagyu Bowl",
        price: "$24.99",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1559058789-672da06263d8?q=80&w=2067&auto=format&fit=crop",
        isBestSeller: true,
    },
    {
        id: 2,
        name: "Spicy Lamb Gyro",
        price: "$18.50",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2070&auto=format&fit=crop",
        isBestSeller: true,
    },
    {
        id: 3,
        name: "Mediterranean Platter",
        price: "$22.00",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1563245372-f21727e5a3ea?q=80&w=2070&auto=format&fit=crop",
        isBestSeller: false,
    },
    {
        id: 4,
        name: "Chicken Over Rice",
        price: "$16.99",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1971&auto=format&fit=crop",
        isBestSeller: true,
    },
];

export default function SignatureDishes() {
    return (
        <section className="py-20 bg-neutral-900 relative overflow-hidden">
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
                        className="text-4xl md:text-5xl font-bold text-white"
                    >
                        Signature <span className="text-primary">Dishes</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {dishes.map((dish, index) => (
                        <motion.div
                            key={dish.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-card border border-white/5 rounded-3xl overflow-hidden hover:border-primary/50 transition-colors duration-300"
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
                                        <span className="text-white font-bold text-sm">{dish.rating}</span>
                                    </div>
                                    <span className="text-primary font-bold text-xl">{dish.price}</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                    {dish.name}
                                </h3>
                                <p className="text-gray-400 text-sm line-clamp-2">
                                    Premium ingredients tailored for the perfect bowl.
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
