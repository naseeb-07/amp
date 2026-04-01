"use client";

import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Events from "@/components/Events";

export default function EventsPage() {
    return (
        <main className="min-h-screen bg-background relative overflow-hidden">
            <Navbar />

            {/* Hero Section for Events */}
            <div className="pt-32 pb-12 bg-gray-50 dark:bg-neutral-900 border-b border-gray-100 dark:border-white/5">
                <div className="container mx-auto px-6 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-bold mb-4 text-gray-900 dark:text-white"
                    >
                        Experience Our <span className="text-primary">Events</span>
                    </motion.h1>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        From live music nights to exclusive chef&apos;s table experiences, join us for moments that matter.
                    </p>
                </div>
            </div>

            {/* Main Events List */}
            <Events />

            <Footer />
        </main>
    );
}
