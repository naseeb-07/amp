"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const posts = [
    {
        id: 1,
        title: "The Secret Behind Our Wagyu",
        snippet: "Discover how we source the finest Halal Wagyu beef for our signature bowls.",
        date: "Oct 12, 2023",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1546241072-48010ad2862c?q=80&w=1974&auto=format&fit=crop",
    },
    {
        id: 2,
        title: "Late Night Dining Etiquette",
        snippet: "Why dark dining is the new trend sweeping through the food scene.",
        date: "Oct 08, 2023",
        readTime: "3 min read",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "Understanding Halal Certification",
        snippet: "A deep dive into our rigorous standards and sourcing partners.",
        date: "Sep 25, 2023",
        readTime: "7 min read",
        image: "https://images.unsplash.com/photo-1626804475297-411db743828c?q=80&w=2070&auto=format&fit=crop",
    },
];

export default function BlogPreview() {
    return (
        <section className="py-20 bg-neutral-900 text-white">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-end mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold">Latest <span className="text-gray-500">Stories</span></h2>
                    <Link href="/blog" className="flex items-center gap-2 hover:text-primary transition-colors">
                        Read All <ArrowRight size={20} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-card border border-white/5 rounded-3xl overflow-hidden hover:border-primary/30 transition-all duration-300 h-full flex flex-col"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 uppercase tracking-wider">
                                    <span>{post.date}</span>
                                    <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                                <p className="text-gray-400 text-sm mb-6 flex-grow">{post.snippet}</p>
                                <Link href="#" className="flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-widest hover:underline">
                                    Read More <ArrowRight size={16} />
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
