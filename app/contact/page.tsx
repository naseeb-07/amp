"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, ChevronDown } from "lucide-react";

const COUNTRY_CODES = [
    { code: "+1", country: "US", flag: "🇺🇸" },
    { code: "+91", country: "IN", flag: "🇮🇳" },
    { code: "+971", country: "AE", flag: "🇦🇪" },
    { code: "+966", country: "SA", flag: "🇸🇦" },
];


export default function Contact() {
    const [settings, setSettings] = useState<any>({
        address: "Ground Floor, Villa-18, CONCORDE CUPERTINO, 84/4, Neeladri Rd, Electronic City Phase I, Bengaluru 560100",
        phone: "+91 97311 55758",
        email: "contact@villagerestaurant.com"
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone: "",
        country_code: "+1",
        subject: "",
        message: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sRes = await fetch("/api/settings");
                if (sRes.ok) {
                    const sData = await sRes.json();
                    if (Object.keys(sData).length > 0) setSettings(sData);
                }
            } catch (error) {
                console.error("Error fetching contact data:", error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const submissionData = {
                ...formData,
                phone: `${formData.country_code} ${formData.phone}`.trim()
            };
            const res = await fetch("/api/enquiries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(submissionData)
            });
            if (res.ok) {
                setIsSubmitted(true);
                setFormData({ full_name: "", email: "", phone: "", country_code: "+1", subject: "", message: "" });
            } else {
                alert("Failed to send message. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting enquiry:", error);
            alert("An error occurred. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const CountryCodeDropdown = ({
        value,
        onChange
    }: {
        value: string,
        onChange: (val: string) => void
    }) => {
        const [isOpen, setIsOpen] = useState(false);
        const selected = COUNTRY_CODES.find(c => c.code === value) || COUNTRY_CODES[0];

        return (
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-3 hover:border-primary transition-colors min-w-[80px]"
                >
                    <span className="text-sm">{selected.flag}</span>
                    <span className="text-xs font-bold text-white">{selected.code}</span>
                    <ChevronDown size={12} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-100"
                            onClick={() => setIsOpen(false)}
                        />
                        <div className="absolute top-full left-0 mt-2 w-40 bg-[#1F2937] border border-white/10 rounded-xl shadow-2xl z-101 overflow-hidden max-h-48 overflow-y-auto">
                            {COUNTRY_CODES.map((c) => (
                                <button
                                    key={`${c.country}-${c.code}`}
                                    type="button"
                                    onClick={() => {
                                        onChange(c.code);
                                        setIsOpen(false);
                                    }}
                                    className="flex items-center gap-3 w-full px-4 py-3 hover:bg-primary/10 transition-colors text-left"
                                >
                                    <span className="text-sm">{c.flag}</span>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-gray-400">{c.country}</span>
                                        <span className="text-xs font-bold text-white">{c.code}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        );
    };


    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary/30">
            <Navbar />

            <section className="relative pt-24 pb-8 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-primary/5 blur-[120px] rounded-full" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-2xl mx-auto text-center space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            <span className="text-xs font-medium tracking-wide uppercase text-gray-400">Get in Touch</span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-bold tracking-tight"
                        >
                            Let&apos;s Start a <br />
                            <span className="text-primary italic">Conversation</span>
                        </motion.h1>
                    </div>
                </div>
            </section>

            <section className="pb-16 relative">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1 space-y-4">
                            <div className="bg-card border border-white/5 p-6 rounded-3xl group hover:border-primary/50 transition-all duration-500">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                                    <MapPin size={20} />
                                </div>
                                <h3 className="text-lg font-bold mb-1">Location</h3>
                                <p className="text-gray-400 leading-relaxed text-xs">{settings.address}</p>
                            </div>
                            <div className="bg-card border border-white/5 p-6 rounded-3xl group hover:border-primary/50 transition-all duration-500">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                                    <Phone size={20} />
                                </div>
                                <h3 className="text-lg font-bold mb-1">Phone</h3>
                                <p className="text-gray-400 leading-relaxed text-xs">{settings.phone}</p>
                            </div>
                            <div className="bg-card border border-white/5 p-6 rounded-3xl group hover:border-primary/50 transition-all duration-500">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                                    <Mail size={20} />
                                </div>
                                <h3 className="text-lg font-bold mb-1">Email</h3>
                                <p className="text-gray-400 leading-relaxed text-xs break-all">{settings.email}</p>
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            <div className="bg-card border border-white/5 p-8 rounded-3xl h-full relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full -mr-32 -mt-32" />

                                {isSubmitted ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="h-full flex flex-col items-center justify-center text-center space-y-4 relative z-10"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mb-2">
                                            <CheckCircle2 size={32} />
                                        </div>
                                        <h2 className="text-2xl font-bold">Message Sent!</h2>
                                        <p className="text-gray-400 max-w-sm mx-auto text-sm">
                                            Thank you for reaching out. Our team will get back to you within 24 hours.
                                        </p>
                                        <button
                                            onClick={() => setIsSubmitted(false)}
                                            className="text-primary text-sm font-bold hover:underline"
                                        >
                                            Send another message
                                        </button>
                                    </motion.div>
                                ) : (
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                                <Send size={20} />
                                            </div>
                                            <h2 className="text-2xl font-bold">Send a Message</h2>
                                        </div>

                                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="John Doe"
                                                    value={formData.full_name}
                                                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm focus:outline-none focus:border-primary transition-all placeholder:text-gray-600"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                                                <input
                                                    required
                                                    type="email"
                                                    placeholder="john@example.com"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm focus:outline-none focus:border-primary transition-all placeholder:text-gray-600"
                                                />
                                            </div>
                                            <div className="md:col-span-2 space-y-1.5">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Phone Number</label>
                                                <div className="flex gap-2">
                                                    <CountryCodeDropdown
                                                        value={formData.country_code}
                                                        onChange={(val) => setFormData({ ...formData, country_code: val })}
                                                    />
                                                    <input
                                                        required
                                                        type="tel"
                                                        placeholder="9632572885"
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm focus:outline-none focus:border-primary transition-all placeholder:text-gray-600"
                                                    />
                                                </div>
                                            </div>
                                            <div className="md:col-span-2 space-y-1.5">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Subject</label>
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="How can we help?"
                                                    value={formData.subject}
                                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm focus:outline-none focus:border-primary transition-all placeholder:text-gray-600"
                                                />
                                            </div>
                                            <div className="md:col-span-2 space-y-1.5">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Message</label>
                                                <textarea
                                                    required
                                                    rows={4}
                                                    placeholder="Tell us about your inquiry..."
                                                    value={formData.message}
                                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm focus:outline-none focus:border-primary transition-all placeholder:text-gray-600 resize-none"
                                                />
                                            </div>
                                            <div className="md:col-span-2 pt-2">
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="w-full bg-primary hover:bg-yellow-500 text-black font-black py-4 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-primary/20 flex items-center justify-center gap-3 text-sm disabled:opacity-50"
                                                >
                                                    {isSubmitting ? "Sending..." : "Send Message"}
                                                    <Send size={16} />
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
