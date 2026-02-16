"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";
import { useTheme } from "next-themes";

export default function Footer() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <footer className="bg-gray-50 dark:bg-black border-t border-gray-200 dark:border-white/10 pt-20 pb-10 transition-colors duration-300">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="text-2xl font-bold tracking-tighter text-gray-900 dark:text-white mb-6 block">
                            Asif's <span className="text-primary">Melting</span> Pot
                        </Link>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                            Premium Halal comfort food bringing the authentic taste of Indo-Med cuisine to your table.
                            Open late for your cravings.
                        </p>
                        <div className="mb-6 h-16">
                            {/* Theme-aware Halal Logo */}
                            {mounted && (
                                <img
                                    src={resolvedTheme === "dark" ? "/halal-logo.png" : "/halal-logo-transparent.png"}
                                    alt="Halal Certified"
                                    className="h-16 w-auto"
                                />
                            )}
                        </div>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Twitter].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/5 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary hover:bg-gray-300 dark:hover:bg-white/10 transition-all">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-gray-900 dark:text-white font-bold mb-6 text-lg">Quick Links</h3>
                        <ul className="space-y-4">
                            {[
                                { name: "Home", href: "/" },
                                { name: "Menu", href: "/menu" },
                                { name: "Our Story", href: "/#story" },
                                { name: "Catering", href: "/#catering" },
                                { name: "Contact", href: "/#contact" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors text-sm">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-gray-900 dark:text-white font-bold mb-6 text-lg">Contact Us</h3>
                        <ul className="space-y-4 text-gray-600 dark:text-gray-400 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-primary shrink-0 mt-1" />
                                <span>1184 Lawrenceville Hwy, Suite C, Lawrenceville</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-primary shrink-0" />
                                <span>(470) 292-3576</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-primary shrink-0" />
                                <span>hello@asifsmeltingpot.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-gray-900 dark:text-white font-bold mb-6 text-lg">Newsletter</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Subscribe for latest updates and exclusive offers.</p>
                        <form className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-colors text-sm placeholder:text-gray-500"
                            />
                            <button className="bg-primary text-black font-bold py-3 rounded-lg hover:bg-yellow-500 transition-colors">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Asif's Melting Pot. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-gray-500">
                        <Link href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
