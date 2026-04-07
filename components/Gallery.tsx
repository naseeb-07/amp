"use client";

import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import Image from "next/image";

const images = [
    { src: "/zomato-award.png", span: "col-span-2 row-span-2" }, // Zomato Restaurant Awards 2025
    { src: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", span: "col-span-1 row-span-1" }, // Samosas / Appetizers
    { src: "https://images.pexels.com/photos/6363501/pexels-photo-6363501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", span: "col-span-1 row-span-2" }, // Vertical Curry/Naan
    { src: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", span: "col-span-1 row-span-1" }, // Indian Thali
    { src: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", span: "col-span-1 row-span-1" }, // Spicy Chicken
    { src: "https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", span: "col-span-1 row-span-1" }, // Close up meat
    { src: "https://images.pexels.com/photos/12737657/pexels-photo-12737657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", span: "col-span-1 row-span-1" }, // Table details
    { src: "https://images.pexels.com/photos/12737658/pexels-photo-12737658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", span: "col-span-1 row-span-1" }, // Traditional Dining
];

export default function Gallery() {
    return (
        <section className="py-20 bg-background text-foreground transition-colors duration-300">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-2 text-gray-900 dark:text-white">Follow the <span className="text-primary">Vibe</span></h2>
                        <p className="text-gray-600 dark:text-gray-400">@village_restaurant_e_city</p>
                    </div>

                    <a
                        href="https://www.instagram.com/village_restaurant_e_city/"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-full font-bold transition-all hover:scale-105 shadow-lg"
                    >
                        <Instagram size={20} />
                        Follow Us
                    </a>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
                    {images.map((img, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className={`relative rounded-2xl overflow-hidden group ${img.span}`}
                        >
                            <Image
                                src={img.src}
                                alt="Gallery Image"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <Instagram size={32} className="text-white drop-shadow-lg" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
