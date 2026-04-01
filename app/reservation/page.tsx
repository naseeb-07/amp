"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Mail, Phone, MessageSquare, ChevronDown, Plus, Minus } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function ReservationPage() {
    const searchParams = useSearchParams();
    const eventParam = searchParams.get("event");

    const [events, setEvents] = useState<any[]>([]);
    const [isLoadingEvents, setIsLoadingEvents] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        persons: 2,
        date: "",
        time: "19:00",
        occasion: eventParam || "Just Table",
        specialRequirement: "None",
        email: "",
        phone: ""
    });

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch("/api/events");
                const data = await res.json();
                setEvents(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setIsLoadingEvents(false);
            }
        };
        fetchEvents();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch("/api/reservations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setSuccess(true);
                setFormData({
                    name: "",
                    persons: 2,
                    date: "",
                    time: "19:00",
                    occasion: "Just Table",
                    specialRequirement: "None",
                    email: "",
                    phone: ""
                });
                setTimeout(() => setSuccess(false), 5000);
            } else {
                console.error("Failed to submit reservation.");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const requirementOptions = [
        "None",
        "Wheelchair Access",
        "Birthday Surprise",
        "Anniversary Celebration"
    ];

    return (
        <main className="min-h-screen bg-black text-[#FFFFFF] font-poppins pt-28 pb-20">
            <Navbar />

            {/* Background Elements */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
            </div>

            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                <div className="text-center mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
                    >
                        Reserve A <span className="text-primary">Table</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 max-w-2xl mx-auto"
                    >
                        Secure your spot for an unforgettable premium dining experience. Join us for lunch, dinner, or special events.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-[#111827]/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
                >
                    {/* Watermark styling */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl -translate-y-1/2 translate-x-1/2 rounded-full pointer-events-none" />

                    {success && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-green-500/10 border border-green-500/20 text-green-400 p-6 rounded-2xl text-center mb-8 font-medium shadow-[0_0_20px_rgba(34,197,94,0.1)]"
                        >
                            Your reservation request has been received! Our team will contact you shortly to confirm your table.
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        {/* Name */}
                        <div className="relative group">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Your Full Name"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary transition-all text-white placeholder:text-gray-500 hover:bg-white/10"
                            />
                        </div>

                        {/* Persons */}
                        <div className="relative group">
                            <div className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 flex items-center justify-between transition-all text-white hover:bg-white/10">
                                <span>{formData.persons} Person{formData.persons !== 1 ? 's' : ''}</span>
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, persons: Math.max(1, prev.persons - 1) }))}
                                        className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-colors text-white"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, persons: Math.min(20, prev.persons + 1) }))}
                                        className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-colors text-white"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Date and Time Group */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative group">
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary transition-all text-white hover:bg-white/10 cursor-pointer scheme-dark"
                                />
                            </div>
                            <div className="relative group">
                                <input
                                    type="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary transition-all text-white hover:bg-white/10 cursor-pointer scheme-dark"
                                />
                            </div>
                        </div>

                        {/* Occasion */}
                        <div className="relative group">
                            <select
                                name="occasion"
                                value={formData.occasion}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary transition-all text-white appearance-none hover:bg-white/10 cursor-pointer"
                                disabled={isLoadingEvents}
                            >
                                <option value="Just Table" className="bg-[#111827] text-white">Table</option>
                                {!isLoadingEvents && events.map((event) => (
                                    <option key={event.id} value={event.title} className="bg-[#111827] text-white">{event.title}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-white transition-colors" size={20} />
                        </div>

                        {/* Special Requirement */}
                        <div className="relative group">
                            <select
                                name="specialRequirement"
                                value={formData.specialRequirement}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary transition-all text-white appearance-none hover:bg-white/10 cursor-pointer"
                            >
                                {requirementOptions.map(opt => (
                                    <option key={opt} value={opt} className="bg-[#111827] text-white">{opt}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-white transition-colors" size={20} />
                        </div>

                        {/* Email */}
                        <div className="relative group">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Your Email Address"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary transition-all text-white placeholder:text-gray-500 hover:bg-white/10"
                            />
                        </div>

                        {/* Phone */}
                        <div className="relative group">
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                placeholder="Enter Phone Number"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary transition-all text-white placeholder:text-gray-500 hover:bg-white/10"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#CAA055] hover:bg-[#D4A373] text-white font-bold tracking-widest uppercase py-5 rounded-2xl transition-all shadow-[0_4px_14px_0_rgba(202,160,85,0.39)] hover:shadow-[0_6px_20px_rgba(202,160,85,0.23)] hover:-translate-y-1 active:scale-95 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center gap-2 mt-4"
                            style={{ backgroundColor: '#c19a5b' }} // Matching the specific button color from design
                        >
                            {isSubmitting ? (
                                <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>RESERVE YOUR TABLE NOW <span className="text-xl">→</span></>
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>

            <Footer />
        </main>
    );
}
