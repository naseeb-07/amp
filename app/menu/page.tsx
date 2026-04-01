"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCurrencySymbol } from "@/lib/currency";
import { MenuItem } from "@/components/MenuData";
import { useCart } from "@/components/CartContext";
import { Plus } from "lucide-react";

export default function MenuPage() {
    const [categories, setCategories] = React.useState<any[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const { addToCart } = useCart();

    React.useEffect(() => {
        const fetchMenuData = async () => {
            try {
                const [catRes, itemRes] = await Promise.all([
                    fetch("/api/menu/categories"),
                    fetch("/api/menu/items")
                ]);
                const cats = await catRes.json();
                const items = await itemRes.json();

                if (Array.isArray(cats) && Array.isArray(items)) {
                    const organizedData = cats.map(cat => ({
                        ...cat,
                        items: items.filter(item => item.category_id === cat.id)
                    }));
                    setCategories(organizedData);
                }
            } catch (error) {
                console.error("Error fetching menu data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMenuData();
    }, []);

    React.useEffect(() => {
        if (!isLoading && window.location.hash) {
            const id = window.location.hash.substring(1);
            const element = document.getElementById(id);
            if (element) {
                // Short delay to allow animations to start/settle
                setTimeout(() => {
                    element.scrollIntoView({ behavior: "smooth" });
                }, 100);
            }
        }
    }, [isLoading, categories]);

    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar />

            {/* Header */}
            <div className="pt-32 pb-12 container mx-auto px-6 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-bold mb-4"
                >
                    Our <span className="text-primary">Menu</span>
                </motion.h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Explore our delicious range of authentic Halal dishes, prepared fresh daily.
                </p>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="container mx-auto px-6 py-20 text-center text-primary">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    Loading Menu...
                </div>
            )}

            {/* Menu Sections */}
            {!isLoading && (
                <div className="container mx-auto px-6 pb-20">
                    {categories.map((category, index) => (
                        <div
                            key={category.id}
                            id={category.id}
                            className="mb-16 scroll-mt-32"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="mb-8 border-b border-primary/20 pb-4">
                                    <h2 className="text-3xl font-bold text-primary mb-2">{category.name}</h2>
                                    <p className="text-gray-400">{category.description}</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {category.items.map((item: MenuItem) => (
                                        <div key={item.id} className="bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-colors group">
                                            {item.image && (
                                                <div className="relative h-48 w-full overflow-hidden">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            addToCart({
                                                                id: item.id,
                                                                name: item.name,
                                                                price: item.price,
                                                                image: item.image,
                                                                currency: item.currency,
                                                            });
                                                        }}
                                                        className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-black shadow-lg hover:scale-110 transition-transform z-10"
                                                    >
                                                        <Plus size={24} />
                                                    </button>
                                                </div>
                                            )}
                                            <div className="p-6">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-xl font-bold">{item.name}</h3>
                                                    <span className="text-primary font-bold">{getCurrencySymbol(item.currency)} {item.price}</span>
                                                </div>
                                                <p className="text-gray-400 text-sm mb-4">{item.description}</p>
                                                {!!item.popular && (
                                                    <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded uppercase tracking-wider font-bold">
                                                        Popular
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            )}

            <Footer />
        </main>
    );
}
