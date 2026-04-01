"use client";

import React from "react";
import { Plus, Pencil, Trash2, Check, X, ChevronDown, ChevronRight, UtensilsCrossed, ArrowUp, ArrowDown } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";

interface MenuItem {
    id: string;
    category_id: string;
    name: string;
    description: string;
    currency: string;
    price: string;
    image: string;
    popular: boolean;
}

interface Category {
    id: string;
    name: string;
    description: string;
}

const getCurrencySymbol = (currency: string) => {
    switch (currency) {
        case 'SAR': return 'SAR';
        case 'INR': return '₹';
        case 'EUR': return '€';
        case 'GBP': return '£';
        default: return '$';
    }
};

export default function MenuManagementAdmin() {
    const [categories, setCategories] = React.useState<Category[]>([]);
    const [items, setItems] = React.useState<MenuItem[]>([]);
    const [expandedCategories, setExpandedCategories] = React.useState<Set<string>>(new Set());
    const [isFormOpen, setIsFormOpen] = React.useState(false);
    const [formType, setFormType] = React.useState<"category" | "item">("category");
    const [editingEntity, setEditingEntity] = React.useState<Category | MenuItem | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);

    const [categoryData, setCategoryData] = React.useState({ id: "", name: "", description: "" });
    const [itemData, setItemData] = React.useState({
        id: "",
        category_id: "",
        name: "",
        description: "",
        currency: "INR",
        price: "",
        image: "/chicken-over-rice.jpg",
        popular: false
    });

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [catRes, itemRes] = await Promise.all([
                fetch("/api/menu/categories"),
                fetch("/api/menu/items")
            ]);
            const cats = await catRes.json();
            const its = await itemRes.json();
            setCategories(Array.isArray(cats) ? cats : []);
            setItems(Array.isArray(its) ? its : []);
            // Expand all by default
            setExpandedCategories(new Set((cats as Category[]).map((c) => c.id)));
        } catch (error) {
            console.error("Failed to fetch menu data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    const toggleCategory = (id: string) => {
        const newSet = new Set(expandedCategories);
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
        setExpandedCategories(newSet);
    };

    const handleMoveCategory = async (e: React.MouseEvent, index: number, direction: 'up' | 'down') => {
        e.stopPropagation();
        if (
            (direction === 'up' && index === 0) ||
            (direction === 'down' && index === categories.length - 1)
        ) return;

        const newCategories = [...categories];
        const swapIndex = direction === 'up' ? index - 1 : index + 1;

        const temp = newCategories[index];
        newCategories[index] = newCategories[swapIndex];
        newCategories[swapIndex] = temp;

        setCategories(newCategories); // Optimistic UI update

        try {
            const orderedIds = newCategories.map(c => c.id);
            const res = await fetch("/api/menu/categories/reorder", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderedIds })
            });
            if (!res.ok) throw new Error("Failed to reorder");
        } catch (err) {
            console.error(err);
            fetchData(); // Rollback on failure
        }
    };

    const handleCategorySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = editingEntity
                ? `/api/menu/categories/${editingEntity.id}`
                : "/api/menu/categories";
            const method = editingEntity ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(categoryData),
            });
            if (res.ok) {
                setIsFormOpen(false);
                setEditingEntity(null);
                fetchData();
            } else {
                const errorData = await res.json();
                alert(`Error: ${errorData.error || "Failed to save category"}`);
            }
        } catch (error) {
            console.error(error);
            alert("Network error while saving category.");
        }
    };

    const handleItemSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = editingEntity
                ? `/api/menu/items/${editingEntity.id}`
                : "/api/menu/items";
            const method = editingEntity ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(itemData),
            });
            if (res.ok) {
                setIsFormOpen(false);
                setEditingEntity(null);
                fetchData();
            } else {
                const errorData = await res.json();
                alert(`Error: ${errorData.error || "Failed to save item"}`);
            }
        } catch (error) {
            console.error(error);
            alert("Network error while saving item.");
        }
    };

    const handleDeleteCategory = async (id: string) => {
        if (!confirm("Delete category and all items?")) return;
        try {
            const res = await fetch(`/api/menu/categories/${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchData();
            } else {
                const errorData = await res.json();
                alert(`Error deleting category: ${errorData.error || "Unknown error"}`);
            }
        } catch (error) {
            console.error(error);
            alert("Network error while deleting category.");
        }
    };

    const handleDeleteItem = async (id: string) => {
        if (!confirm("Delete item?")) return;
        try {
            const res = await fetch(`/api/menu/items/${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchData();
            } else {
                const errorData = await res.json();
                alert(`Error deleting item: ${errorData.error || "Unknown error"}`);
            }
        } catch (error) {
            console.error(error);
            alert("Network error while deleting item.");
        }
    };

    return (
        <div>
            <div className="flex justify-between items-end mb-10 text-[#FFFFFF]">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Menu Management</h1>
                    <p className="text-[#9CA3AF]">Organize your dishes by categories and manage individual items.</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => {
                            setFormType("category");
                            setEditingEntity(null);
                            setCategoryData({ id: "", name: "", description: "" });
                            setIsFormOpen(true);
                        }}
                        className="bg-white/5 border border-white/10 text-[#FFFFFF] font-bold px-6 py-3 rounded-full flex items-center gap-2 hover:bg-white/10 transition-colors"
                    >
                        <Plus size={20} /> New Category
                    </button>
                    <button
                        onClick={() => {
                            setFormType("item");
                            setEditingEntity(null);
                            setItemData({
                                id: "",
                                category_id: categories[0]?.id || "",
                                name: "",
                                description: "",
                                currency: "INR",
                                price: "",
                                image: "/chicken-over-rice.jpg",
                                popular: false
                            });
                            setIsFormOpen(true);
                        }}
                        className="bg-primary text-black font-bold px-6 py-3 rounded-full flex items-center gap-2 hover:bg-yellow-500 transition-colors shadow-lg shadow-primary/20"
                    >
                        <Plus size={20} /> Add Menu Item
                    </button>
                </div>
            </div>

            {/* Form Modal */}
            {isFormOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-100 flex items-center justify-center p-6 text-[#FFFFFF]">
                    <div className="bg-[#111827] border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl overflow-y-auto max-h-[90vh]">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">
                                {editingEntity ? "Edit" : "New"} {formType === "category" ? "Category" : "Menu Item"}
                            </h2>
                            <button onClick={() => setIsFormOpen(false)} className="text-[#9CA3AF] hover:text-[#FFFFFF]"><X size={24} /></button>
                        </div>

                        {formType === "category" ? (
                            <form onSubmit={handleCategorySubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Category ID (unique)</label>
                                    <input type="text" disabled={!!editingEntity} required value={categoryData.id} onChange={(e) => setCategoryData({ ...categoryData, id: e.target.value })} className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-[#FFFFFF] disabled:opacity-50" placeholder="e.g. burgers" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Name</label>
                                    <input type="text" required value={categoryData.name} onChange={(e) => setCategoryData({ ...categoryData, name: e.target.value })} className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-[#FFFFFF]" placeholder="e.g. Gourmet Burgers" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Description</label>
                                    <textarea value={categoryData.description} onChange={(e) => setCategoryData({ ...categoryData, description: e.target.value })} className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-[#FFFFFF]" />
                                </div>
                                <button type="submit" className="w-full bg-primary text-black font-bold py-4 rounded-xl hover:bg-yellow-500 transition-all shadow-lg shadow-primary/10">
                                    {editingEntity ? "Update" : "Create"} Category
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleItemSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Category</label>
                                    <select
                                        value={itemData.category_id}
                                        onChange={(e) => setItemData({ ...itemData, category_id: e.target.value })}
                                        className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-[#FFFFFF] appearance-none"
                                    >
                                        {categories.map(c => <option key={c.id} value={c.id} className="bg-[#111827]">{c.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Item Name</label>
                                    <input type="text" required value={itemData.name} onChange={(e) => setItemData({ ...itemData, name: e.target.value })} className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-[#FFFFFF]" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Item ID</label>
                                        <input type="text" disabled={!!editingEntity} required value={itemData.id} onChange={(e) => setItemData({ ...itemData, id: e.target.value })} className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-[#FFFFFF] disabled:opacity-50" placeholder="id-slug" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Price</label>
                                        <div className="flex gap-2">
                                            <select
                                                value={itemData.currency || 'USD'}
                                                onChange={(e) => setItemData({ ...itemData, currency: e.target.value })}
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
                                                    value={itemData.price.replace('$', '')}
                                                    onChange={(e) => setItemData({ ...itemData, price: e.target.value })}
                                                    className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-[#FFFFFF]"
                                                    placeholder="0.00"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Description</label>
                                    <textarea value={itemData.description} onChange={(e) => setItemData({ ...itemData, description: e.target.value })} className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-[#FFFFFF]" />
                                </div>
                                <ImageUpload
                                    value={itemData.image}
                                    onChange={(url) => setItemData({ ...itemData, image: url })}
                                    label="Item Image"
                                />
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" id="popular" checked={itemData.popular} onChange={(e) => setItemData({ ...itemData, popular: e.target.checked })} className="w-5 h-5 accent-primary" />
                                    <label htmlFor="popular" className="text-[#9CA3AF]">Popular Dish</label>
                                </div>
                                <button type="submit" className="w-full bg-primary text-black font-bold py-4 rounded-xl hover:bg-yellow-500 transition-all shadow-lg shadow-primary/10">
                                    {editingEntity ? "Update" : "Add"} Item
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}

            <div className="space-y-8 text-[#FFFFFF]">
                {isLoading ? (
                    <div className="text-center py-20 text-[#9CA3AF]">Loading Menu...</div>
                ) : categories.map((cat, index) => (
                    <div key={cat.id} className="bg-[#111827] border border-white/5 rounded-3xl overflow-hidden">
                        <div
                            onClick={() => toggleCategory(cat.id)}
                            className="p-6 flex items-center justify-between cursor-pointer hover:bg-white/2 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                {expandedCategories.has(cat.id) ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                                <div>
                                    <h2 className="text-xl font-bold uppercase tracking-widest text-primary">{cat.name}</h2>
                                    <p className="text-[#9CA3AF] text-sm">{cat.description}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap hidden sm:inline-block">
                                    {items.filter(i => i.category_id === cat.id).length} Items
                                </span>
                                <div className="flex items-center gap-1 border-l border-white/10 pl-4">
                                    <button
                                        onClick={(e) => handleMoveCategory(e, index, 'up')}
                                        disabled={index === 0}
                                        title="Move Up"
                                        className="p-2 hover:bg-white/10 rounded-lg transition-all disabled:opacity-30 disabled:hover:bg-transparent"
                                    >
                                        <ArrowUp size={16} />
                                    </button>
                                    <button
                                        onClick={(e) => handleMoveCategory(e, index, 'down')}
                                        disabled={index === categories.length - 1}
                                        title="Move Down"
                                        className="p-2 hover:bg-white/10 rounded-lg transition-all disabled:opacity-30 disabled:hover:bg-transparent mr-2"
                                    >
                                        <ArrowDown size={16} />
                                    </button>
                                    <div className="w-px h-6 bg-white/10 mx-1"></div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setFormType("category");
                                            setEditingEntity(cat);
                                            setCategoryData({ id: cat.id, name: cat.name, description: cat.description });
                                            setIsFormOpen(true);
                                        }}
                                        title="Edit Category"
                                        className="p-2 hover:bg-primary/20 hover:text-primary rounded-lg transition-all ml-2"
                                    >
                                        <Pencil size={16} />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteCategory(cat.id);
                                        }}
                                        title="Delete Category"
                                        className="p-2 hover:bg-red-400/20 hover:text-red-400 rounded-lg transition-all"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {expandedCategories.has(cat.id) && (
                            <div className="px-6 pb-6 pt-2">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-white/5 text-xs font-bold text-[#9CA3AF] uppercase tracking-widest">
                                                <th className="py-4">Item</th>
                                                <th className="py-4">Description</th>
                                                <th className="py-4 text-right pr-6">Price</th>
                                                <th className="py-4 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {items.filter(i => i.category_id === cat.id).map(item => (
                                                <tr key={item.id} className="group hover:bg-white/2 transition-colors">
                                                    <td className="py-4 font-medium w-1/3 text-[#FFFFFF]">
                                                        <div className="flex items-center gap-3">
                                                            {!!item.popular && <UtensilsCrossed size={14} className="text-primary" />}
                                                            {item.name}
                                                        </div>
                                                    </td>
                                                    <td className="py-4 text-[#9CA3AF] text-sm">{item.description}</td>
                                                    <td className="py-4 text-primary font-bold text-right pr-6">
                                                        {getCurrencySymbol(item.currency)} {item.price}
                                                    </td>
                                                    <td className="py-4 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button
                                                                onClick={() => {
                                                                    setFormType("item");
                                                                    setEditingEntity(item);
                                                                    setItemData({
                                                                        id: item.id,
                                                                        category_id: item.category_id,
                                                                        name: item.name,
                                                                        description: item.description,
                                                                        currency: item.currency || "USD",
                                                                        price: item.price,
                                                                        image: item.image,
                                                                        popular: item.popular
                                                                    });
                                                                    setIsFormOpen(true);
                                                                }}
                                                                className="p-2 hover:bg-primary/20 hover:text-primary rounded-lg transition-all"
                                                            >
                                                                <Pencil size={16} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteItem(item.id)}
                                                                className="p-2 hover:bg-red-400/20 hover:text-red-400 rounded-lg transition-all"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            {items.filter(i => i.category_id === cat.id).length === 0 && (
                                                <tr><td colSpan={4} className="py-10 text-center text-[#9CA3AF]">No items in this category.</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
