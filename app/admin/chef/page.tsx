"use client";

import React from "react";
import { Plus, Pencil, Trash2, ChefHat, Check, X } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";

interface Special {
    id: number;
    name: string;
    description: string;
    image: string;
    currency: string;
    price: string;
    limited: boolean;
}

export default function ChefSpecialsAdmin() {
    const [specials, setSpecials] = React.useState<Special[]>([]);
    const [isFormOpen, setIsFormOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [editingEntity, setEditingEntity] = React.useState<Special | null>(null);

    const getCurrencySymbol = (currency: string) => {
        switch (currency) {
            case 'SAR': return 'SAR';
            case 'INR': return '₹';
            case 'EUR': return '€';
            case 'GBP': return '£';
            default: return '$';
        }
    };

    const [formData, setFormData] = React.useState({
        name: "",
        description: "",
        image: "/lamb-shank.jpg",
        currency: "USD",
        price: "",
        limited: false
    });

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/chefs-collection");
            const data = await res.json();
            setSpecials(Array.isArray(data) ? data : []);
        } catch (error) { console.error(error); } finally { setIsLoading(false); }
    };

    React.useEffect(() => { fetchData(); }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = editingEntity ? `/api/chefs-collection/${editingEntity.id}` : "/api/chefs-collection";
            const method = editingEntity ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setIsFormOpen(false);
                setEditingEntity(null);
                fetchData();
            }
        } catch (error) { console.error(error); }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this special?")) return;
        try {
            const res = await fetch(`/api/chefs-collection/${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchData();
            } else {
                const errorData = await res.json();
                alert(`Error deleting special: ${errorData.error || "Unknown error"}`);
            }
        } catch (error) {
            console.error(error);
            alert("Network error while deleting special.");
        }
    };

    const handleEdit = (special: Special) => {
        setEditingEntity(special);
        setFormData({
            name: special.name,
            description: special.description,
            image: special.image,
            currency: special.currency || "USD",
            price: special.price,
            limited: special.limited
        });
        setIsFormOpen(true);
    };

    return (
        <div>
            <div className="flex justify-between items-end mb-10 text-[#FFFFFF]">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Chef's Specials</h1>
                    <p className="text-[#9CA3AF]">Manage limited-time and premium collection dishes.</p>
                </div>
                <button
                    onClick={() => {
                        setEditingEntity(null);
                        setFormData({ name: "", description: "", image: "/lamb-shank.jpg", currency: "USD", price: "", limited: false });
                        setIsFormOpen(true);
                    }}
                    className="bg-primary text-black font-bold px-6 py-3 rounded-full flex items-center gap-2 hover:bg-yellow-500 transition-all shadow-lg shadow-primary/20"
                >
                    <Plus size={20} /> Add Special
                </button>
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-100 flex items-center justify-center p-6 text-[#FFFFFF]">
                    <div className="bg-[#111827] border border-white/10 p-8 rounded-3xl w-full max-w-md">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">{editingEntity ? "Edit Special" : "New Special Dish"}</h2>
                            <button onClick={() => setIsFormOpen(false)} className="text-[#9CA3AF] hover:text-[#FFFFFF]"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <input type="text" required placeholder="Dish Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none" />
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
                                        placeholder="Price"
                                        value={formData.price.replace('$', '')}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full bg-[#1F2937] border border-white/10 rounded-xl pl-8 pr-4 py-3 focus:border-primary outline-none"
                                    />
                                </div>
                            </div>
                            <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none text-[#FFFFFF]" />
                            <ImageUpload
                                value={formData.image}
                                onChange={(url) => setFormData({ ...formData, image: url })}
                                label="Dish Image"
                            />
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" checked={formData.limited} onChange={(e) => setFormData({ ...formData, limited: e.target.checked })} className="w-5 h-5 accent-primary" />
                                <span className="text-sm">Limited Time Only</span>
                            </label>
                            <button type="submit" className="w-full bg-primary text-black font-bold py-4 rounded-xl hover:bg-yellow-500 transition-all">
                                {editingEntity ? "Update Special" : "Create Special"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[#FFFFFF]">
                {isLoading ? <p>Loading...</p> : specials.map((special: Special) => (
                    <div key={special.id} className="bg-[#111827] border border-white/5 p-6 rounded-3xl flex items-center gap-6">
                        <img src={special.image} className="w-24 h-24 rounded-2xl object-cover" />
                        <div className="grow">
                            <div className="flex justify-between items-start">
                                <h3 className="text-xl font-bold">{special.name}</h3>
                                <span className="text-primary font-bold">
                                    {getCurrencySymbol(special.currency)} {special.price}
                                </span>
                            </div>
                            <p className="text-[#9CA3AF] text-sm line-clamp-1">{special.description}</p>
                            {special.limited && <span className="text-red-400 text-xs font-bold uppercase tracking-wider mt-2 block">Limited Time</span>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <button onClick={() => handleEdit(special)} className="p-2 hover:bg-white/5 rounded-lg"><Pencil size={18} /></button>
                            <button onClick={() => handleDelete(special.id)} className="p-2 hover:bg-red-400/10 text-red-400 rounded-lg"><Trash2 size={18} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
