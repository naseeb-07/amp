"use client";

import React from "react";
import { Plus, Pencil, Trash2, Star, Check, X } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";

interface Dish {
    id: number;
    name: string;
    currency: string;
    price: string;
    rating: number;
    image: string;
    isBestSeller: boolean;
}

export default function SignatureDishesAdmin() {
    const [dishes, setDishes] = React.useState<Dish[]>([]);
    const [isFormOpen, setIsFormOpen] = React.useState(false);
    const [editingDish, setEditingDish] = React.useState<Dish | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);

    const getCurrencySymbol = (currency: string) => {
        switch (currency) {
            case 'SAR': return 'SAR';
            case 'INR': return '₹';
            case 'EUR': return '€';
            case 'GBP': return '£';
            default: return '$';
        }
    };

    // Form states
    const [formData, setFormData] = React.useState({
        name: "",
        currency: "USD",
        price: "",
        rating: 4.5,
        image: "/steak.jpg",
        isBestSeller: false
    });

    const fetchDishes = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/signature-dishes");
            const data = await res.json();
            setDishes(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to fetch dishes:", error);
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        fetchDishes();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editingDish ? "PUT" : "POST";
        const url = editingDish ? `/api/signature-dishes/${editingDish.id}` : "/api/signature-dishes";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setIsFormOpen(false);
                setEditingDish(null);
                setFormData({ name: "", currency: "USD", price: "", rating: 4.5, image: "/steak.jpg", isBestSeller: false });
                fetchDishes();
            }
        } catch (error) {
            console.error("Error saving dish:", error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this dish?")) return;

        try {
            const res = await fetch(`/api/signature-dishes/${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchDishes();
            } else {
                const errorData = await res.json();
                alert(`Error deleting dish: ${errorData.error || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Error deleting dish:", error);
            alert("Network error while deleting dish.");
        }
    };

    return (
        <div>
            <div className="flex justify-between items-end mb-10 text-[#FFFFFF]">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Signature Dishes</h1>
                    <p className="text-[#9CA3AF]">Manage the featured dishes shown on your landing page.</p>
                </div>
                <button
                    onClick={() => {
                        setEditingDish(null);
                        setFormData({ name: "", currency: "USD", price: "", rating: 4.5, image: "/steak.jpg", isBestSeller: false });
                        setIsFormOpen(true);
                    }}
                    className="bg-primary text-black font-bold px-6 py-3 rounded-full flex items-center gap-2 hover:bg-yellow-500 transition-colors shadow-lg shadow-primary/20"
                >
                    <Plus size={20} /> Add New Dish
                </button>
            </div>

            {/* Form Modal */}
            {isFormOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-100 flex items-center justify-center p-6 text-[#FFFFFF]">
                    <div className="bg-[#111827] border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">{editingDish ? "Edit Dish" : "Add New Dish"}</h2>
                            <button onClick={() => setIsFormOpen(false)} className="text-[#9CA3AF] hover:text-[#FFFFFF]"><X size={24} /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Dish Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-[#FFFFFF]"
                                    placeholder="e.g. Wagyu Truffle Bowl"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Price</label>
                                    <div className="flex gap-2">
                                        <select
                                            value={formData.currency || 'USD'}
                                            onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                                            className="bg-[#1F2937] border border-white/10 rounded-xl px-3 py-3 focus:outline-none focus:border-primary transition-colors text-[#FFFFFF] appearance-none"
                                        >
                                            <option value="USD" className="bg-[#111827]">USD ($)</option>
                                            <option value="SAR" className="bg-[#111827]">SAR</option>
                                            <option value="INR" className="bg-[#111827]">INR (₹)</option>
                                            <option value="EUR" className="bg-[#111827]">EUR (€)</option>
                                            <option value="GBP" className="bg-[#111827]">GBP (£)</option>
                                        </select>
                                        <div className="relative grow">
                                            <input
                                                type="number"
                                                step="0.01"
                                                required
                                                value={formData.price.replace('$', '')}
                                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-[#FFFFFF]"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Rating</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        max="5"
                                        min="0"
                                        required
                                        value={formData.rating}
                                        onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                                        className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-[#FFFFFF]"
                                    />
                                </div>
                            </div>
                            <ImageUpload
                                value={formData.image}
                                onChange={(url) => setFormData({ ...formData, image: url })}
                                label="Dish Image"
                            />
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div
                                    onClick={() => setFormData({ ...formData, isBestSeller: !formData.isBestSeller })}
                                    className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all ${formData.isBestSeller ? "bg-primary border-primary" : "border-white/20 bg-white/5"
                                        }`}
                                >
                                    {formData.isBestSeller && <Check size={14} className="text-black font-bold" />}
                                </div>
                                <span className="text-sm font-medium text-gray-300">Mark as Best Seller</span>
                            </label>

                            <button
                                type="submit"
                                className="w-full bg-primary text-black font-bold py-4 rounded-xl hover:bg-yellow-500 transition-all active:scale-95 shadow-lg shadow-primary/10"
                            >
                                {editingDish ? "Update Dish" : "Create Dish"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="bg-[#111827] border border-white/5 rounded-3xl overflow-hidden text-[#FFFFFF]">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/5 bg-[#1F2937]/50">
                            <th className="px-6 py-4 text-xs font-bold text-[#9CA3AF] uppercase tracking-widest">Image</th>
                            <th className="px-6 py-4 text-xs font-bold text-[#9CA3AF] uppercase tracking-widest">Name</th>
                            <th className="px-6 py-4 text-xs font-bold text-[#9CA3AF] uppercase tracking-widest">Price</th>
                            <th className="px-6 py-4 text-xs font-bold text-[#9CA3AF] uppercase tracking-widest">Rating</th>
                            <th className="px-6 py-4 text-xs font-bold text-[#9CA3AF] uppercase tracking-widest">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-[#9CA3AF] uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {isLoading ? (
                            <tr><td colSpan={6} className="px-6 py-10 text-center text-[#9CA3AF]">Loading dishes...</td></tr>
                        ) : dishes.length === 0 ? (
                            <tr><td colSpan={6} className="px-6 py-10 text-center text-[#9CA3AF]">No dishes found. Add your first one!</td></tr>
                        ) : dishes.map((dish: Dish) => (
                            <tr key={dish.id} className="group hover:bg-white/2 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/10 overflow-hidden relative">
                                        <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-bold">{dish.name}</td>
                                <td className="px-6 py-4 text-primary font-bold">
                                    {getCurrencySymbol(dish.currency)} {dish.price}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1 text-primary">
                                        <Star size={14} fill="currentColor" />
                                        <span className="text-[#FFFFFF] text-sm font-medium">{dish.rating}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {dish.isBestSeller && (
                                        <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Best Seller</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => {
                                                setEditingDish(dish);
                                                setFormData({
                                                    name: dish.name,
                                                    currency: dish.currency || "USD",
                                                    price: dish.price,
                                                    rating: dish.rating,
                                                    image: dish.image,
                                                    isBestSeller: dish.isBestSeller
                                                });
                                                setIsFormOpen(true);
                                            }}
                                            className="p-2 hover:bg-primary/20 hover:text-primary rounded-lg transition-colors"
                                        >
                                            <Pencil size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(dish.id)}
                                            className="p-2 hover:bg-red-400/20 hover:text-red-400 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
