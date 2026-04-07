"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ShoppingBag, ChevronRight, Phone, MapPin, Star } from "lucide-react";
import Link from "next/link";

const deliveryPlatforms = [
    {
        name: "Swiggy",
        description: "Fast delivery to your doorstep",
        url: "https://www.swiggy.com/city/bangalore/village-restaurant-electronic-city-phase-1-rest23218",
        color: "#FC8019",
        icon: "/swiggy.png",
        rating: "3.9"
    },
    {
        name: "Zomato",
        description: "Order your favourites on Zomato",
        url: "https://www.zomato.com/bangalore/village-restaurant-electronic-city-bangalore",
        color: "#E23744",
        icon: "/zomato.png",
        rating: "3.8"
    },
    {
        name: "Magicpin",
        description: "Get best offers and discounts",
        url: "https://magicpin.in/Bangalore/Electronic-City/Restaurant/Village-Restaurant/store/29b9/",
        color: "#7A1FA2",
        icon: "/magicpin.jpeg",
        rating: "4.1"
    }
];

export default function OrderPage() {
    return (
        <main className="min-h-screen bg-background transition-colors duration-300">
            <Navbar />
            
            <section className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-4xl">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                            Order <span className="text-primary italic">Online</span>
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Get your favorite Arabian and North Indian delicacies delivered fresh and hot. 
                            Choose your preferred platform below.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        {deliveryPlatforms.map((platform, index) => (
                            <motion.a
                                key={platform.name}
                                href={platform.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="group relative bg-card hover:bg-accent border border-border rounded-3xl p-8 flex flex-col justify-between transition-all shadow-lg hover:shadow-2xl overflow-hidden"
                            >
                                {/* Platform Color Accents */}
                                <div 
                                    className="absolute top-0 right-0 w-32 h-32 blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"
                                    style={{ backgroundColor: platform.color }}
                                />
                                
                                <div className="flex items-center justify-between mb-8">
                                    <div 
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden"
                                        style={{ backgroundColor: platform.color }}
                                    >
                                        <img 
                                            src={platform.icon} 
                                            alt={platform.name}
                                            className="w-10 h-10 object-contain"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${platform.name}&background=${platform.color.replace('#', '')}&color=fff`;
                                            }}
                                        />
                                    </div>
                                    <div className="flex items-center gap-1 bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-sm font-bold">
                                        <Star size={14} className="fill-current" />
                                        {platform.rating}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                        {platform.name}
                                    </h3>
                                    <p className="text-muted-foreground mb-6">
                                        {platform.description}
                                    </p>
                                    <div className="flex items-center text-primary font-bold group-hover:gap-2 transition-all">
                                        Order on {platform.name} <ChevronRight size={20} />
                                    </div>
                                </div>
                            </motion.a>
                        ))}

                        {/* Direct Order Option */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="bg-primary/5 border border-primary/20 rounded-3xl p-8 flex flex-col justify-between shadow-lg relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-primary/20 transition-colors" />
                            
                            <div className="flex items-start justify-between mb-8 relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-black shadow-lg">
                                    <Phone size={32} />
                                </div>
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-foreground mb-4">Order Directly</h3>
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <a 
                                            href="tel:+917338130025" 
                                            className="flex-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-yellow-500 text-black px-6 py-4 rounded-2xl font-bold transition-all hover:scale-105 shadow-md"
                                        >
                                            <Phone size={18} />
                                            73381 30025
                                        </a>
                                        <a 
                                            href="https://wa.me/917338130025" 
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-2xl font-bold transition-all hover:scale-105 shadow-md"
                                        >
                                            WhatsApp
                                        </a>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <a 
                                            href="tel:+919108701358" 
                                            className="flex-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-yellow-500 text-black px-6 py-4 rounded-2xl font-bold transition-all hover:scale-105 shadow-md"
                                        >
                                            <Phone size={18} />
                                            91087 01358
                                        </a>
                                        <a 
                                            href="https://wa.me/919108701358" 
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-2xl font-bold transition-all hover:scale-105 shadow-md"
                                        >
                                            WhatsApp
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Location Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="bg-card border border-border rounded-3xl p-8 text-center"
                    >
                        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                            <div className="flex items-center gap-3 text-muted-foreground">
                                <MapPin className="text-primary" />
                                <span>Ground Floor, Villa-18, Neeladri Road, E-City Phase I</span>
                            </div>
                            <div className="hidden md:block w-px h-8 bg-border" />
                            <div className="flex items-center gap-3 text-muted-foreground">
                                <ShoppingBag className="text-primary" />
                                <span>Available: 10:30 AM - 11:45 PM</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
