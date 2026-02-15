"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";

const events = [
    {
        id: 1,
        title: "Friday Night Live",
        date: "Every Friday",
        time: "8:00 PM - 1:00 AM",
        description: "Live acoustic music and special late-night menu.",
        image: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=1974&auto=format&fit=crop",
    },
    {
        id: 2,
        title: "Weekend Brunch",
        date: "Sat & Sun",
        time: "11:00 AM - 3:00 PM",
        description: "Unlimited mimosas (non-alcoholic) and gourmet breakfast platters.",
        image: "https://images.unsplash.com/photo-1551987840-f62d9c74ae78?q=80&w=2012&auto=format&fit=crop",
    }
];

export default function Events() {
    return (
        <section className="py-20 bg-neutral-900 text-white relative overflow-hidden">
            {/* Neon Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-16 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Upcoming <span className="text-primary drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]">Events</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Join us for exclusive dining experiences and live entertainment.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {events.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="flex flex-col md:flex-row bg-card border border-white/10 rounded-3xl overflow-hidden hover:border-primary/50 transition-colors group"
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
                                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{event.title}</h3>
                                <div className="space-y-3 mb-6 text-gray-300 text-sm">
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
                                <p className="text-gray-400 text-sm mb-6">{event.description}</p>
                                <button className="text-primary font-bold uppercase tracking-widest text-sm hover:underline text-left">
                                    Reserve a Table
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
