"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogPage() {
    const [posts, setPosts] = React.useState<any[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch("/api/blog");
                const data = await res.json();
                setPosts(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching blog posts:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPosts();
    }, []);

    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar />

            <div className="pt-32 pb-12 container mx-auto px-6 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-bold mb-4"
                >
                    Our <span className="text-primary">Stories</span>
                </motion.h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Read the latest from our kitchen, cultural inspirations, and community stories.
                </p>
            </div>

            {isLoading && (
                <div className="container mx-auto px-6 py-20 text-center text-primary">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    Loading Stories...
                </div>
            )}

            {!isLoading && (
                <div className="container mx-auto px-6 pb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post, index) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-white/5 border border-white/5 rounded-3xl overflow-hidden hover:border-primary/30 transition-all duration-300 h-full flex flex-col"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-8 flex flex-col grow">
                                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-6 uppercase tracking-wider">
                                        <span>{post.date}</span>
                                        <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary transition-colors">{post.title}</h3>
                                    <p className="text-gray-400 text-sm mb-8 grow leading-relaxed">{post.snippet}</p>
                                    <Link href="#" className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest hover:underline mt-auto">
                                        Read Full Story <ArrowRight size={18} />
                                    </Link>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            )}

            <Footer />
        </main>
    );
}
