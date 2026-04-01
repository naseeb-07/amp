"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";
import Link from "next/link";

export default function Events() {
    const [events, setEvents] = React.useState<any[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch("/api/events");
                const data = await res.json();
                setEvents(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchEvents();
    }, []);

    if (isLoading) return null;

    return (
        <section className="py-20 bg-background text-foreground relative overflow-hidden transition-colors duration-300">
            {/* Neon Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-16 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                        Upcoming <span className="text-primary drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]">Events</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Join us for exclusive dining experiences and live entertainment.
                    </p>
                </div>

                {events.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20 bg-gray-50 dark:bg-neutral-900/50 rounded-3xl border border-dashed border-gray-200 dark:border-white/5"
                    >
                        <Calendar size={48} className="mx-auto text-gray-300 dark:text-gray-700 mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Events Scheduled</h3>
                        <p className="text-gray-500 dark:text-gray-400">We don&apos;t have any upcoming events at the moment. Please check back soon!</p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {events.map((event, index) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="flex flex-col md:flex-row bg-card border border-gray-200 dark:border-white/10 rounded-3xl overflow-hidden hover:border-primary/50 transition-all group shadow-lg dark:shadow-none"
                            >
                                <div className="relative h-64 md:h-auto md:w-1/2 overflow-hidden">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
                                </div>
                                <div className="p-8 md:w-1/2 flex flex-col justify-center">
                                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-primary transition-colors">{event.title}</h3>
                                    <div className="space-y-3 mb-6 text-gray-600 dark:text-gray-300 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={16} className="text-primary" />
                                            {event.date}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock size={16} className="text-primary" />
                                            {event.time}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin size={16} className="text-primary" />
                                            Main Lounge
                                        </div>
                                    </div>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">{event.description}</p>
                                    <Link
                                        href={`/reservation?event=${encodeURIComponent(event.title)}`}
                                        className="text-primary font-bold uppercase tracking-widest text-sm hover:underline text-left inline-block"
                                    >
                                        Reserve a Table
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
