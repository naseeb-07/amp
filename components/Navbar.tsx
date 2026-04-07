"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";


export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setTimeout(() => setMounted(true), 0);
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const pathname = usePathname();


    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        // If it's a hash link and we are currently on the homepage, scroll manually.
        if (href.startsWith("/#") && pathname === "/") {
            e.preventDefault();
            const targetId = href.replace("/#", "");
            const elem = document.getElementById(targetId);
            if (elem) {
                elem.scrollIntoView({ behavior: "smooth" });
            }
            setIsOpen(false);
        }
    };

    const navLinks = [
        { name: "Home", href: "/#home" },
        { name: "Menu", href: "/menu" },
        { name: "Events", href: "/events" },
        { name: "Catering", href: "/contact" },
        { name: "Blog", href: "/#blog" },
    ];

    // Navbar is now transparent to show page background.
    // Contrast colors follow the page theme directly.
    const isLightMode = resolvedTheme === "light";

    const headerClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-background/80 backdrop-blur-md py-2 shadow-sm"
        : "bg-transparent py-4"
        }`;

    // Links should adapt when scrolled, but always be white when transparent at the top
    const textClasses = "text-gray-600 dark:text-gray-300 hover:text-primary transition-colors";
    const activeTextClasses = "text-white hover:text-primary transition-colors";

    if (!mounted) return null;

    return (
        <header className={headerClasses}>
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="relative h-16 w-16 md:h-20 md:w-20">
                    <Image
                        src="/logo1.png"
                        alt="Village Restaurant"
                        fill
                        unoptimized
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
                            onClick={(e) => handleLinkClick(e, link.href)}
                            className={`text-sm font-medium uppercase tracking-widest ${scrolled ? textClasses : activeTextClasses
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <Link href="/order" className="bg-primary hover:bg-yellow-500 text-black px-6 py-2 rounded-full font-semibold transition-transform hover:scale-105 flex items-center gap-2">
                            Order Online
                        </Link>
                    </div>
                </nav>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-4 md:hidden">
                    <ThemeToggle />
                    <button
                        className={`transition-colors ${scrolled ? "text-gray-900 dark:text-white" : "text-white"}`}
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
                                    onClick={(e) => {
                                        if (link.href.startsWith("/#") && pathname === "/") {
                                            handleLinkClick(e, link.href);
                                        } else {
                                            setIsOpen(false);
                                        }
                                    }}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <hr className="border-border my-2" />
                            <Link
                                href="/order"
                                onClick={() => setIsOpen(false)}
                                className="w-full bg-primary text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-lg shadow-lg"
                            >
                                Order Online
                            </Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
