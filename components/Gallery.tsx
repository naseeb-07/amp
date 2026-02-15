"use client";

import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import Image from "next/image";

const images = [
    { src: "https://images.unsplash.com/photo-1512485800893-cad379850846?q=80&w=2070&auto=format&fit=crop", span: "col-span-1 row-span-1" },
    { src: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?q=80&w=2070&auto=format&fit=crop", span: "col-span-1 row-span-2" },
    { src: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=2020&auto=format&fit=crop", span: "col-span-1 row-span-1" },
    { src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1974&auto=format&fit=crop", span: "col-span-2 row-span-1" },
    { src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1980&auto=format&fit=crop", span: "col-span-1 row-span-1" },
];

export default function Gallery() {
    return (
        <section className="py-20 bg-black text-white">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-2">Follow the <span className="text-primary">Vibe</span></h2>
                        <p className="text-gray-400">@HalalBowlHouse</p>
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
