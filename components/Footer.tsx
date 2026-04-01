"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Send } from "lucide-react";
import { useTheme } from "next-themes";

export default function Footer() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [settings, setSettings] = useState<any>({
        address: "1184 Lawrenceville Hwy, Suite C, Lawrenceville",
        phone: "(470) 292-3576",
        email: "hello@asifsmeltingpot.com"
    });
    const [hours, setHours] = useState<any[]>([]);

    useEffect(() => {
        setTimeout(() => setMounted(true), 0);
        const fetchData = async () => {
            try {
                const [sRes, hRes] = await Promise.all([
                    fetch("/api/settings"),
                    fetch("/api/opening-hours")
                ]);
                if (sRes.ok) {
                    const sData = await sRes.json();
                    if (Object.keys(sData).length > 0) setSettings(sData);
                }
                if (hRes.ok) {
                    const hData = await hRes.json();
                    if (hData.length > 0) setHours(hData);
                }
            } catch (error) {
                console.error("Error fetching footer data:", error);
            }
        };
        fetchData();
    }, []);

    const defaultHours = [
        { day_range: "Mon - Thu", time_range: "11:00 AM - 10:00 PM" },
        { day_range: "Fri - Sat", time_range: "11:00 AM - 11:00 PM" },
        { day_range: "Sunday", time_range: "12:00 PM - 09:00 PM" }
    ];

    const filteredHours = (hours.length > 0 ? hours : defaultHours)
        .filter((h: any) => h.day_range !== "New Range" && h.day_range !== "New Slot" && h.day_range.trim() !== "");

    const isCurrentlyOpen = () => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const now = new Date();
        const todayIndex = now.getDay();
        const todayName = days[todayIndex].toLowerCase();
        const todayShort = shortDays[todayIndex].toLowerCase();

        const todaySlot = filteredHours.find((h: any) => {
            const range = h.day_range.toLowerCase();
            if (range === todayName || range === todayShort) return true;
            if (range.split(',').some((d: string) => d.trim() === todayName || d.trim() === todayShort)) return true;
            if (range.includes('-')) {
                const parts = range.split('-').map((p: string) => p.trim());
                if (parts.length === 2) {
                    const sIdx = days.findIndex(d => d.toLowerCase().startsWith(parts[0])) || shortDays.findIndex(d => d.toLowerCase() === parts[0]);
                    const eIdx = days.findIndex(d => d.toLowerCase().startsWith(parts[1])) || shortDays.findIndex(d => d.toLowerCase() === parts[1]);
                    if (sIdx !== -1 && eIdx !== -1) {
                        if (sIdx <= eIdx) return todayIndex >= sIdx && todayIndex <= eIdx;
                        return todayIndex >= sIdx || todayIndex <= eIdx;
                    }
                }
            }
            return false;
        });

        if (!todaySlot || todaySlot.time_range === "CLOSED") return { open: false, message: "CLOSED TODAY" };

        const [startStr, endStr] = todaySlot.time_range.split(' - ');

        const parseTime = (timeStr: string) => {
            const [time, modifier] = timeStr.split(' ');
            const [h_raw, m] = time.split(':').map(Number);
            let h = h_raw;
            if (modifier === 'PM' && h < 12) h += 12;
            if (modifier === 'AM' && h === 12) h = 0;
            const res = new Date(now);
            res.setHours(h, m, 0, 0);
            return res;
        };

        const startTime = parseTime(startStr);
        const endTime = parseTime(endStr);
        if (endTime < startTime) endTime.setDate(endTime.getDate() + 1);

        const isOpen = now >= startTime && now <= endTime;
        return {
            open: isOpen,
            message: isOpen ? "OPEN NOW" : "CLOSED NOW",
            details: isOpen ? `until ${endStr}` : `opens at ${startStr}`
        };
    };

    const status = isCurrentlyOpen();

    return (
        <footer className="bg-gray-50 dark:bg-black pt-24 pb-12 border-t border-gray-100 dark:border-white/5 transition-colors duration-300">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-20">
                    {/* 1. Brand & Halal logo */}
                    <div className="space-y-8">
                        <div>
                            <Link href="/#home" className="text-2xl font-black text-gray-900 dark:text-white mb-4 block tracking-tighter">
                                ASIF&apos;S <span className="text-primary italic">MELTING POT</span>
                            </Link>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                                Premium Halal comfort food bringing the authentic taste of Indo-Med cuisine to your table. Open late for your cravings.
                            </p>
                        </div>

                        <div className="relative w-20 h-20 group">
                            <img
                                src={mounted && resolvedTheme === "light" ? "/halal-logo-transparent.png" : "/halal-logo.png"}
                                alt="Halal Certified"
                                className="w-full h-full object-contain transition-all duration-500 group-hover:scale-110"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            {[Instagram, Facebook, Twitter].map((Icon, i) => (
                                <a key={i} href="#" className="w-9 h-9 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-black hover:border-primary transition-all duration-300">
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* 2. Quick Links */}
                    <div>
                        <h3 className="text-gray-900 dark:text-white font-bold mb-8 text-sm uppercase tracking-widest">Quick Links</h3>
                        <ul className="space-y-4">
                            {[
                                { name: "Home", href: "/#home" },
                                { name: "Menu", href: "/menu" },
                                { name: "Our Story", href: "/blog" },
                                { name: "Reservation", href: "/reservation" },
                                { name: "Contact", href: "/contact" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors text-sm font-medium">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3. Contact Us */}
                    <div>
                        <h3 className="text-gray-900 dark:text-white font-bold mb-8 text-sm uppercase tracking-widest">Contact Us</h3>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4 group">
                                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                                <span className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{settings.address}</span>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <Phone size={18} className="text-primary shrink-0" />
                                <span className="text-gray-600 dark:text-gray-400 text-sm group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{settings.phone}</span>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <Mail size={18} className="text-primary shrink-0" />
                                <span className="text-gray-600 dark:text-gray-400 text-sm break-all group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{settings.email}</span>
                            </li>
                        </ul>
                    </div>

                    {/* 4. Opening Hours */}
                    <div className="relative">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-gray-900 dark:text-white font-bold text-sm uppercase tracking-widest">Timings</h3>
                            <div className="flex flex-col items-end gap-1 translate-y-[-2px]">
                                <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${status.open
                                    ? "bg-green-500/10 text-green-500 border-green-500/20"
                                    : "bg-red-500/10 text-red-500 border-red-500/20"
                                    }`}>
                                    {status.message}
                                </span>
                            </div>
                        </div>
                        <ul className="space-y-4">
                            {filteredHours.map((hour: any, i: number) => (
                                <li key={i} className="flex justify-between items-center text-xs border-b border-gray-100 dark:border-white/5 pb-2 last:border-0">
                                    <span className="text-gray-500 dark:text-gray-400 font-medium">{hour.day_range}</span>
                                    <span className={`font-bold ${hour.time_range === "CLOSED" ? "text-red-500" : "text-gray-900 dark:text-white"}`}>
                                        {hour.time_range}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 5. Newsletter */}
                    <div>
                        <h3 className="text-gray-900 dark:text-white font-bold mb-8 text-sm uppercase tracking-widest">Newsletter</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                            Subscribe for latest updates and exclusive offers from our kitchen.
                        </p>
                        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                            <div className="relative group">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all pr-12"
                                />
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary hover:scale-110 transition-transform">
                                    <Send size={16} />
                                </button>
                            </div>
                            <button className="w-full bg-primary hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-xl text-sm transition-all active:scale-[0.98]">
                                Subscribe Now
                            </button>
                        </form>
                    </div>
                </div>

                <div className="pt-12 border-t border-gray-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-500 dark:text-gray-500 text-xs font-medium">
                        © {new Date().getFullYear()} Asif&apos;s Melting Pot. All rights reserved.
                    </p>
                    <div className="flex items-center gap-8">
                        <Link href="/privacy" className="text-xs text-gray-400 hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="text-xs text-gray-400 hover:text-primary transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
