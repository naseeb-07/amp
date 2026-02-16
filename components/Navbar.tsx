"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "next-themes";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Menu", href: "/menu" },
        { name: "Catering", href: "/#catering" },
        { name: "Blog", href: "/#blog" },
    ];

    // Navbar is now transparent to show page background.
    // Contrast colors follow the page theme directly.
    const isLightMode = resolvedTheme === "light";

    const headerClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-background/80 backdrop-blur-md py-2 shadow-sm"
        : "bg-transparent py-4"
        }`;

    // Links should be black on light background, white on dark background
    const textClasses = "text-gray-600 dark:text-gray-300 hover:text-primary transition-colors";
    const activeTextClasses = "text-gray-900 dark:text-white transition-colors";

    if (!mounted) return null;

    return (
        <header className={headerClasses}>
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="relative h-20 w-32 md:h-24 md:w-40 -my-4">
                    <Image
                        src="/logo-amp.svg"
                        alt="Asif's Melting Pot"
                        fill
                        className={`object-contain transition-all duration-300 ${isLightMode ? "" : "brightness-110"}`}
                        priority
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-sm font-medium uppercase tracking-widest ${scrolled ? textClasses : activeTextClasses
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <button className="bg-primary hover:bg-yellow-500 text-black px-6 py-2 rounded-full font-semibold transition-transform hover:scale-105 flex items-center gap-2">
                            <ShoppingBag size={18} />
                            Order Now
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-4 md:hidden">
                    <ThemeToggle />
                    <button
                        className="transition-colors text-gray-900 dark:text-white"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-border p-6 md:hidden shadow-xl"
                    >
                        <nav className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-xl font-medium text-foreground hover:text-primary"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <hr className="border-border my-2" />
                            <button className="w-full bg-primary text-black py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                                <ShoppingBag size={20} />
                                Order Online
                            </button>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
