"use client";

import { motion } from "framer-motion";
import { Timer, ArrowRight, ChefHat } from "lucide-react";
import Image from "next/image";

const items = [
    {
        id: 1,
        name: "Saffron Risotto & Scallops",
        description: "Creamy saffron infused arborio rice topped with pan-seared jumbo scallops.",
        image: "https://images.unsplash.com/photo-1633504354502-0e86b72d2449?q=80&w=1974&auto=format&fit=crop",
        price: "$32.00",
        limited: true
    },
    {
        id: 2,
        name: "Slow-Braised Lamb Shank",
        description: "Tender lamb shank cooked for 12 hours in a rich herb and red wine reduction (halal).",
        image: "https://images.unsplash.com/photo-1544025162-d76690b60944?q=80&w=2060&auto=format&fit=crop",
        price: "$28.50",
        limited: false
    }
];

export default function ChefsCollection() {
    return (
        <section className="py-20 bg-black text-white relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <div className="flex items-center gap-2 text-primary mb-2">
                            <ChefHat size={20} />
                            <span className="uppercase tracking-widest text-sm font-bold">Limited Edition</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold">Chef's <span className="text-gray-600">Collection</span></h2>
                    </div>
                    <div className="flex gap-4">
                        {/* Navigation buttons could go here */}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="group relative h-[400px] rounded-3xl overflow-hidden border border-white/10"
                        >
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                <div className="flex justify-between items-start mb-2">
                                    {item.limited && (
                                        <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 mb-2">
                                            <Timer size={12} />
                                            Limited Time
                                        </div>
                                    )}
                                    <span className="text-2xl font-bold text-primary">{item.price}</span>
                                </div>

                                <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
                                <p className="text-gray-300 text-sm mb-6 max-w-md">{item.description}</p>

                                <button className="flex items-center gap-2 text-white font-medium hover:text-primary transition-colors group-hover:translate-x-2 duration-300">
                                    Order This Special <ArrowRight size={18} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
