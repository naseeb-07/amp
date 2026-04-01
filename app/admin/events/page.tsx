"use client";

import React from "react";
import { Plus, Pencil, Trash2, Calendar, Check, X } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";

interface Event {
    id: number;
    title: string;
    date: string;
    time: string;
    description: string;
    image: string;
}

export default function EventsAdmin() {
    const [events, setEvents] = React.useState<Event[]>([]);
    const [isFormOpen, setIsFormOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [editingEntity, setEditingEntity] = React.useState<Event | null>(null);
    const [formData, setFormData] = React.useState({
        title: "",
        date: "",
        time: "",
        description: "",
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop"
    });

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/events");
            const data = await res.json();
            setEvents(Array.isArray(data) ? data : []);
        } catch (error) { console.error(error); } finally { setIsLoading(false); }
    };

    React.useEffect(() => { fetchData(); }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = editingEntity ? `/api/events/${editingEntity.id}` : "/api/events";
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
        if (!confirm("Delete this event?")) return;
        try {
            const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchData();
            } else {
                const errorData = await res.json();
                alert(`Error deleting event: ${errorData.error || "Unknown error"}`);
            }
        } catch (error) {
            console.error(error);
            alert("Network error while deleting event.");
        }
    };

    const handleEdit = (event: Event) => {
        setEditingEntity(event);
        setFormData({
            title: event.title,
            date: event.date,
            time: event.time,
            description: event.description,
            image: event.image
        });
        setIsFormOpen(true);
    };

    return (
        <div>
            <div className="flex justify-between items-end mb-10 text-[#FFFFFF]">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Events Management</h1>
                    <p className="text-[#9CA3AF]">Plan and promote upcoming live nights and brunches.</p>
                </div>
                <button
                    onClick={() => {
                        setEditingEntity(null);
                        setFormData({ title: "", date: "", time: "", description: "", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop" });
                        setIsFormOpen(true);
                    }}
                    className="bg-primary text-black font-bold px-6 py-3 rounded-full flex items-center gap-2 hover:bg-yellow-500 transition-all shadow-lg shadow-primary/20"
                >
                    <Plus size={20} /> New Event
                </button>
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-100 flex items-center justify-center p-6 text-[#FFFFFF]">
                    <div className="bg-[#111827] border border-white/10 p-8 rounded-3xl w-full max-w-md">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">{editingEntity ? "Edit Event" : "Create Event"}</h2>
                            <button onClick={() => setIsFormOpen(false)} className="text-[#9CA3AF] hover:text-[#FFFFFF]"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <input type="text" required placeholder="Event Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none" />
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Date</label>
                                    <input
                                        type="date"
                                        required
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none text-[#FFFFFF] scheme-dark"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Time</label>
                                    <input
                                        type="time"
                                        required
                                        value={formData.time}
                                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                        className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none text-[#FFFFFF] scheme-dark"
                                    />
                                </div>
                            </div>
                            <textarea placeholder="Event Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none" />
                            <ImageUpload
                                value={formData.image}
                                onChange={(url) => setFormData({ ...formData, image: url })}
                                label="Event Poster/Image"
                            />
                            <button type="submit" className="w-full bg-primary text-black font-bold py-4 rounded-xl hover:bg-yellow-500 transition-all">
                                {editingEntity ? "Update Event" : "Launch Event"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-[#FFFFFF]">
                {isLoading ? <p>Loading...</p> : events.map((event) => (
                    <div key={event.id} className="bg-[#111827] border border-white/5 p-6 rounded-3xl flex flex-col sm:flex-row gap-6">
                        <img src={event.image} className="w-full sm:w-32 h-32 rounded-2xl object-cover" />
                        <div className="grow">
                            <h3 className="text-xl font-bold mb-1">{event.title}</h3>
                            <div className="flex items-center gap-4 text-xs text-[#9CA3AF] mb-3">
                                <span>{event.date}</span>
                                <span>{event.time}</span>
                            </div>
                            <p className="text-[#9CA3AF] text-sm line-clamp-2">{event.description}</p>
                        </div>
                        <div className="flex sm:flex-col gap-2 justify-end">
                            <button onClick={() => handleEdit(event)} className="p-2 hover:bg-white/5 rounded-lg"><Pencil size={18} /></button>
                            <button onClick={() => handleDelete(event.id)} className="p-2 hover:bg-red-400/10 text-red-400 rounded-lg"><Trash2 size={18} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
