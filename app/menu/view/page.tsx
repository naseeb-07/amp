"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Download, EyeOff } from "lucide-react";

export default function MenuViewPage() {
    return (
        <main className="min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col">
            {/* Header / Navigation */}
            <header className="h-20 bg-background/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 z-10">
                <Link 
                    href="/menu"
                    className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-bold group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Menu
                </Link>

                <div className="flex items-center gap-4">
                    <a 
                        href="/uploads/menu.pdf"
                        download="Village_Restaurant_Menu.pdf"
                        className="flex items-center gap-2 bg-primary hover:bg-yellow-500 text-black px-5 py-2 rounded-full font-bold transition-all hover:scale-105 shadow-lg text-sm"
                    >
                        <Download size={16} />
                        Download PDF
                    </a>
                </div>
            </header>

            {/* PDF Viewer Area */}
            <div className="flex-1 bg-neutral-900 flex flex-col overflow-hidden">
                <iframe 
                    src="/uploads/menu.pdf#view=FitH&toolbar=0" 
                    className="flex-1 w-full border-none"
                    title="Menu Viewer"
                />
            </div>

            {/* Mobile Footer CTA if they finish viewing */}
            <div className="bg-black/90 p-4 lg:hidden border-t border-white/10">
                <Link 
                    href="/order"
                    className="flex items-center justify-center gap-2 bg-primary text-black w-full py-4 rounded-xl font-bold shadow-xl"
                >
                    Order Now
                </Link>
            </div>
        </main>
    );
}
