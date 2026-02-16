"use client";

import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import Image from "next/image";

const images = [
    { src: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&q=80&w=2070", span: "col-span-1 row-span-1" }, // New reliable steak image
    { src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1974", span: "col-span-1 row-span-2" },
    { src: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=1974", span: "col-span-1 row-span-1" },
    { src: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2070", span: "col-span-1 row-span-1" },
    { src: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=2070", span: "col-span-2 row-span-1" }, // New reliable interior
    { src: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&q=80&w=2070", span: "col-span-1 row-span-1" }, // New reliable steak image
    { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2070", span: "col-span-1 row-span-1" },
    { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2070", span: "col-span-2 row-span-1" },
];

export default function Gallery() {
    return (
        <section className="py-20 bg-background text-foreground transition-colors duration-300">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-2 text-gray-900 dark:text-white">Follow the <span className="text-primary">Vibe</span></h2>
                        <p className="text-gray-600 dark:text-gray-400">@AsifsMeltingPoint</p>
                    </div>

                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-full font-bold transition-all hover:scale-105 shadow-lg"
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
