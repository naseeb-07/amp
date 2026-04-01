"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const staticTestimonials = [
    {
        id: 1,
        name: "Sarah Jenkins",
        role: "Food Blogger",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
        quote: "The truffle wagyu bowl is an absolute masterpiece. The flavors are balanced perfectly, and the ambiance is stunning.",
        rating: 5,
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Regular Customer",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
        quote: "Finally a place that serves premium Halal food late at night without compromising on quality. 10/10 recommended!",
        rating: 5,
    },
    {
        id: 3,
        name: "Amara Khan",
        role: "Event Planner",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
        quote: "Booked them for a corporate catering event. The presentation was impeccable and the guests loved every bite.",
        rating: 4.8,
    },
];

export default function Testimonials() {
    const [fetchedFeedback, setFetchedFeedback] = useState<any[]>([]);

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const res = await fetch("/api/feedback?approved=true", {
                    cache: "no-store",
                    next: { revalidate: 0 }
                });
                if (res.ok) {
                    const data = await res.json();
                    setFetchedFeedback(data);
                }
            } catch (error) {
                console.error("Failed to fetch feedback:", error);
            }
        };
        fetchFeedback();
    }, []);

    // Combine static testimonials with fetched ones
    const allTestimonials = [...staticTestimonials, ...fetchedFeedback];

    return (
        <section className="py-20 bg-background overflow-hidden relative transition-colors duration-300">
            <div className="container mx-auto px-6 mb-16">
                <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Star className="text-yellow-400 fill-yellow-400" size={24} />
                        <Star className="text-yellow-400 fill-yellow-400" size={24} />
                        <Star className="text-yellow-400 fill-yellow-400" size={24} />
                        <Star className="text-yellow-400 fill-yellow-400" size={24} />
                        <Star className="text-yellow-400 fill-yellow-400" size={24} />
                        <span className="text-gray-900 dark:text-white font-bold text-lg ml-2">4.9/5 Google Reviews</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Loved by <span className="text-primary">Thousands</span>
                    </h2>
                </div>
            </div>

            {/* Slider Container */}
            <div className="flex relative w-full overflow-hidden">
                <motion.div
                    className="flex gap-8 w-max px-4"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        duration: allTestimonials.length * 5, // speed based on amount of items
                        ease: "linear",
                        repeat: Infinity,
                        repeatType: "loop",
                    }}
                >
                    {/* Duplicate the testimonials array to create a seamless loop */}
                    {[...allTestimonials, ...allTestimonials].map((t, i) => (
                        <div
                            key={`${t.id || i}-${i}`}
                            className="bg-card w-[350px] md:w-[400px] shrink-0 border border-gray-200 dark:border-white/5 p-8 rounded-3xl relative shadow-lg dark:shadow-none flex flex-col justify-between"
                        >
                            <Quote className="absolute top-8 right-8 text-primary/20" size={48} />
                            <div>
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, starIndex) => (
                                        <Star
                                            key={starIndex}
                                            size={16}
                                            className={`${starIndex < Math.floor(t.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-400 dark:text-gray-600"}`}
                                        />
                                    ))}
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 italic mb-8 relative z-10 leading-relaxed">"{t.quote}"</p>
                            </div>

                            <div className="flex items-center gap-4 mt-auto">
                                <div className="w-12 h-12 shrink-0 rounded-full overflow-hidden border-2 border-primary/50 relative bg-gray-100 dark:bg-gray-800">
                                    <img
                                        src={t.image || "/default-avatar.png"}
                                        alt={t.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(t.name) + "&background=random";
                                        }}
                                    />
                                </div>
                                <div>
                                    <h4 className="text-gray-900 dark:text-white font-bold line-clamp-1">{t.name}</h4>
                                    <p className="text-primary text-xs uppercase tracking-wider line-clamp-1">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
