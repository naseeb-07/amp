"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
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
    return (
        <section className="py-20 bg-background overflow-hidden relative transition-colors duration-300">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            viewport={{ once: true }}
                            className="bg-card border border-gray-200 dark:border-white/5 p-8 rounded-3xl relative shadow-lg dark:shadow-none"
                        >
                            <Quote className="absolute top-8 right-8 text-primary/20" size={48} />
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        className={`${i < Math.floor(t.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-400 dark:text-gray-600"}`}
                                    />
                                ))}
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 italic mb-8 relative z-10 leading-relaxed">"{t.quote}"</p>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/50">
                                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="text-gray-900 dark:text-white font-bold">{t.name}</h4>
                                    <p className="text-primary text-xs uppercase tracking-wider">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
