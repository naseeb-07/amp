"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogPost {
    id: string;
    title: string;
    image: string;
    date: string;
    readTime: string;
    snippet: string;
}

export default function BlogPreview() {
    const [posts, setPosts] = React.useState<BlogPost[]>([]);
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

    if (isLoading) return null;
    if (posts.length === 0) return null;

    const visiblePosts = posts.slice(0, 3);

    return (
        <section id="blog" className="py-20 bg-background text-foreground transition-colors duration-300">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h3 className="text-primary font-medium tracking-widest uppercase mb-3">Our Stories</h3>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">Latest <span className="text-gray-500">Stories</span></h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {visiblePosts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-card border border-gray-200 dark:border-white/5 rounded-3xl overflow-hidden hover:border-primary/30 transition-all duration-300 h-full flex flex-col shadow-lg dark:shadow-none"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-6 flex flex-col grow">
                                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">
                                    <span>{post.date}</span>
                                    <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-primary transition-colors">{post.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 grow">{post.snippet}</p>
                                <Link href="#" className="flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-widest hover:underline">
                                    Read More <ArrowRight size={16} />
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {posts.length > 3 && (
                    <div className="mt-12 text-center">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 bg-primary text-black font-bold px-8 py-4 rounded-full hover:bg-yellow-500 transition-colors shadow-lg shadow-primary/20"
                        >
                            See More Stories
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
