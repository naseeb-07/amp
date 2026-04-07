"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CTA() {
    return (
        <section className="py-32 bg-gray-50 dark:bg-black relative overflow-hidden flex items-center justify-center transition-colors duration-300">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-linear-to-r from-yellow-600/10 via-gray-50 dark:via-black to-gray-50 dark:to-black z-0" />
            <div className="absolute right-0 top-0 w-1/2 h-full bg-linear-to-l from-primary/5 dark:from-primary/10 to-transparent blur-3xl" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight"
                >
                    Craving <span className="text-primary italic">Premium?</span>
                </motion.h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
                    Experience the fusion of comfort and luxury. Order now or book us for your next event.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <Link
                        href="/order"
                        className="bg-primary hover:bg-yellow-500 text-black px-10 py-5 rounded-full font-bold text-xl transition-transform hover:scale-105 shadow-[0_0_30px_rgba(250,204,21,0.4)] flex items-center gap-2"
                    >
                        <ShoppingBag size={24} />
                        Order Now
                    </Link>
                    <Link href="/contact" className="text-gray-900 dark:text-white border border-gray-300 dark:border-white/20 hover:border-primary dark:hover:border-white px-10 py-5 rounded-full font-bold text-xl transition-colors flex items-center gap-3">
                        Catering Inquiry <ArrowRight size={24} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
