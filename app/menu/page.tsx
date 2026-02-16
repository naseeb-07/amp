"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { menuCategories, MenuItem } from "@/components/MenuData";

export default function MenuPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar />

            {/* Header */}
            <div className="pt-32 pb-12 container mx-auto px-6 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-bold mb-4"
                >
                    Our <span className="text-primary">Menu</span>
                </motion.h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Explore our delicious range of authentic Halal dishes, prepared fresh daily.
                </p>
            </div>

            {/* Menu Sections */}
            <div className="container mx-auto px-6 pb-20">
                {menuCategories.map((category, index) => (
                    <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="mb-16"
                        id={category.id}
                    >
                        <div className="mb-8 border-b border-primary/20 pb-4">
                            <h2 className="text-3xl font-bold text-primary mb-2">{category.name}</h2>
                            <p className="text-gray-400">{category.description}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {category.items.map((item) => (
                                <div key={item.id} className="bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-colors group">
                                    {item.image && (
                                        <div className="relative h-48 w-full overflow-hidden">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    )}
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-bold">{item.name}</h3>
                                            <span className="text-primary font-bold">{item.price}</span>
                                        </div>
                                        <p className="text-gray-400 text-sm mb-4">{item.description}</p>
                                        {item.popular && (
                                            <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded uppercase tracking-wider font-bold">
                                                Popular
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            <Footer />
        </main>
    );
}
