"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/components/CartContext";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getCurrencySymbol } from "@/lib/currency";

export default function CartPage() {
    const { items, updateQuantity, removeFromCart, totalAmount, clearCart } = useCart();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <main className="min-h-screen bg-black text-[#FFFFFF] font-poppins pt-28">
            <Navbar />

            <div className="container mx-auto px-6 max-w-5xl mb-20">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/menu" className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">Your <span className="text-primary">Cart</span></h1>
                </div>

                {items.length === 0 ? (
                    <div className="bg-[#111827] border border-white/5 rounded-3xl p-16 text-center shadow-2xl flex flex-col items-center justify-center min-h-[50vh]">
                        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-gray-400 mb-6">
                            <ShoppingBag size={48} />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't added any items to your cart yet. Explore our delicious menu to get started!</p>
                        <Link
                            href="/menu"
                            className="bg-primary hover:bg-yellow-500 text-black px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                        >
                            Browse Menu
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {items.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-[#111827] border border-white/5 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden group"
                                >
                                    {item.image ? (
                                        <div className="relative w-full sm:w-32 h-32 rounded-xl overflow-hidden shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-full sm:w-32 h-32 bg-white/5 rounded-xl flex items-center justify-center shrink-0">
                                            <ShoppingBag className="text-gray-600" size={32} />
                                        </div>
                                    )}

                                    <div className="grow w-full text-center sm:text-left flex flex-col items-center sm:items-start">
                                        <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                                        <p className="text-primary font-semibold mb-4 text-lg">
                                            {getCurrencySymbol(item.currency)} {typeof item.price === "string" ? parseFloat(item.price).toFixed(2) : item.price.toFixed(2)}
                                        </p>

                                        <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-full px-4 py-2 w-max mx-auto sm:mx-0">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="text-gray-400 hover:text-white transition-colors"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="w-6 text-center font-semibold">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="text-gray-400 hover:text-white transition-colors"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="absolute top-4 right-4 sm:relative sm:top-auto sm:right-auto">
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="p-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-full transition-all"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-[#111827] border border-white/5 rounded-3xl p-8 sticky top-32">
                                <h3 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4">Order Summary</h3>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-400">
                                        <span>Subtotal ({items.length} items)</span>
                                        <span className="text-white">${totalAmount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400">
                                        <span>Taxes</span>
                                        <span className="text-white">Calculated at checkout</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center border-t border-white/10 pt-6 mb-8">
                                    <span className="text-lg font-bold">Total Amount</span>
                                    <span className="text-3xl font-bold text-primary">${totalAmount.toFixed(2)}</span>
                                </div>

                                <button className="w-full bg-primary hover:bg-yellow-500 text-black py-4 rounded-xl font-bold text-lg transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 mb-4">
                                    Proceed to Checkout
                                </button>

                                <button
                                    onClick={clearCart}
                                    className="w-full text-gray-400 hover:text-red-400 text-sm font-medium transition-colors py-2"
                                >
                                    Clear Cart
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
