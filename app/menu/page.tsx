"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCurrencySymbol } from "@/lib/currency";
import { menuCategories, MenuItem } from "@/components/MenuData";
import { Eye, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function MenuPage() {
    const categories = menuCategories;

    return (
        <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <Navbar />

            {/* Header */}
            <div className="pt-32 pb-12 container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-6 mb-8">
                    <div className="text-center lg:text-left">
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-5xl font-bold mb-4"
                        >
                            Our <span className="text-primary">Menu</span>
                        </motion.h1>
                        <p className="text-text-secondary max-w-2xl">
                            Explore our delicious range of authentic Halal dishes, prepared fresh daily.
                        </p>
                    </div>
                    
                    <div className="flex flex-wrap items-center justify-center lg:justify-end gap-4">
                        <Link 
                            href="/menu/view"
                            className="flex items-center gap-2 bg-primary hover:bg-yellow-500 text-black px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:scale-105"
                        >
                            <Eye size={20} />
                            View Full Menu
                        </Link>
                    </div>
                </div>
            </div>

            {/* Menu Sections */}
            <div className="container mx-auto px-6 pb-20">
                {categories.map((category, index) => (
                    <div
                        key={category.id}
                        id={category.id}
                        className="mb-16 scroll-mt-32"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="mb-8 border-b border-primary/20 pb-4">
                                <h2 className="text-3xl font-bold text-primary mb-2">{category.name}</h2>
                                <p className="text-gray-400">{category.description}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {category.items.map((item: MenuItem) => (
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
                                                <span className="text-primary font-bold">{getCurrencySymbol(item.currency)} {item.price}</span>
                                            </div>
                                            <p className="text-gray-400 text-sm mb-4">{item.description}</p>
                                            {!!item.popular && (
                                                <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded uppercase tracking-wider font-bold">
                                                    Popular
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>

            {/* Order CTA */}
            <section className="py-20 bg-primary/5 border-t border-primary/10">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold mb-6">Ready to <span className="text-primary">Order?</span></h2>
                        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                            Whether you want it delivered or prefer a quick takeaway, we've got you covered.
                        </p>
                        <Link 
                            href="/order"
                            className="inline-flex items-center gap-2 bg-primary hover:bg-yellow-500 text-black px-10 py-4 rounded-full font-bold transition-all hover:scale-105 shadow-xl text-lg"
                        >
                            Go to Order Page
                            <ArrowRight size={20} />
                        </Link>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
