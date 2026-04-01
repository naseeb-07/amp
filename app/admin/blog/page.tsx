"use client";

import React from "react";
import { Plus, Pencil, Trash2, FileText, Check, X } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";

interface Post {
    id: number;
    title: string;
    snippet: string;
    date: string;
    readTime: string;
    image: string;
}

export default function BlogAdmin() {
    const [posts, setPosts] = React.useState<Post[]>([]);
    const [isFormOpen, setIsFormOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [editingEntity, setEditingEntity] = React.useState<Post | null>(null);
    const [formData, setFormData] = React.useState({
        title: "",
        snippet: "",
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1546241072-48010ad2862c?q=80&w=1974&auto=format&fit=crop"
    });

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/blog");
            const data = await res.json();
            setPosts(Array.isArray(data) ? data : []);
        } catch (error) { console.error(error); } finally { setIsLoading(false); }
    };

    React.useEffect(() => { fetchData(); }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = editingEntity ? `/api/blog/${editingEntity.id}` : "/api/blog";
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
            } else {
                const errorData = await res.json();
                alert(`Error: ${errorData.error || "Failed to save post"}`);
            }
        } catch (error) {
            console.error(error);
            alert("Network error while saving post.");
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this post?")) return;
        try {
            const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchData();
            } else {
                const errorData = await res.json();
                alert(`Error deleting post: ${errorData.error || "Unknown error"}`);
            }
        } catch (error) {
            console.error(error);
            alert("Network error while deleting post.");
        }
    };

    const handleEdit = (post: Post) => {
        setEditingEntity(post);
        setFormData({
            title: post.title,
            snippet: post.snippet,
            date: post.date,
            readTime: post.readTime,
            image: post.image
        });
        setIsFormOpen(true);
    };

    return (
        <div>
            <div className="flex justify-between items-end mb-10 text-[#FFFFFF]">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Blog Posts</h1>
                    <p className="text-[#9CA3AF]">Write stories about your food, sourcing, and restaurant culture.</p>
                </div>
                <button
                    onClick={() => {
                        setEditingEntity(null);
                        setFormData({
                            title: "",
                            snippet: "",
                            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                            readTime: "5 min read",
                            image: "https://images.unsplash.com/photo-1546241072-48010ad2862c?q=80&w=1974&auto=format&fit=crop"
                        });
                        setIsFormOpen(true);
                    }}
                    className="bg-primary text-black font-bold px-6 py-3 rounded-full flex items-center gap-2 hover:bg-yellow-500 transition-all shadow-lg shadow-primary/20"
                >
                    <Plus size={20} /> Write Post
                </button>
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-100 flex items-center justify-center p-6 text-[#FFFFFF]">
                    <div className="bg-[#111827] border border-white/10 p-8 rounded-3xl w-full max-w-md">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">{editingEntity ? "Edit Story" : "New Blog Story"}</h2>
                            <button onClick={() => setIsFormOpen(false)} className="text-[#9CA3AF] hover:text-[#FFFFFF]"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <input type="text" required placeholder="Story Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none" />
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Publish Date</label>
                                    <input
                                        type="date"
                                        required
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none text-[#FFFFFF] scheme-dark"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Read Time</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 5 min read"
                                        value={formData.readTime}
                                        onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                                        className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none text-[#FFFFFF]"
                                    />
                                </div>
                            </div>
                            <textarea placeholder="Story Snippet" value={formData.snippet} onChange={(e) => setFormData({ ...formData, snippet: e.target.value })} className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none" />
                            <ImageUpload
                                value={formData.image}
                                onChange={(url) => setFormData({ ...formData, image: url })}
                                label="Feature Image"
                            />
                            <button type="submit" className="w-full bg-primary text-black font-bold py-4 rounded-xl hover:bg-yellow-500 transition-all">
                                {editingEntity ? "Update Story" : "Publish Story"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="space-y-4 text-[#FFFFFF]">
                {isLoading ? <p>Loading...</p> : posts.map((post) => (
                    <div key={post.id} className="bg-[#111827] border border-white/5 p-6 rounded-3xl flex items-center gap-6 group hover:border-primary/20 transition-all">
                        <div className="w-20 h-20 rounded-2xl bg-[#1F2937] overflow-hidden">
                            <img src={post.image} className="w-full h-full object-cover" />
                        </div>
                        <div className="grow">
                            <h3 className="text-xl font-bold mb-1 opacity-90 group-hover:opacity-100 transition-opacity">{post.title}</h3>
                            <p className="text-[#9CA3AF] text-sm italic">{post.date} • {post.readTime}</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => handleEdit(post)} className="p-3 hover:bg-white/5 rounded-2xl"><Pencil size={20} /></button>
                            <button onClick={() => handleDelete(post.id)} className="p-3 hover:bg-red-400/10 text-red-400 rounded-2xl"><Trash2 size={20} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
