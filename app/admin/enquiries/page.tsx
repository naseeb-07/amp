"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Mail,
    Trash2,
    CheckCircle2,
    Clock,
    Search,
    Filter,
    MoreVertical,
    ChevronDown,
    Eye,
    MessageCircle,
    Archive,
    Phone
} from "lucide-react";

interface Enquiry {
    id: number;
    full_name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    status: 'pending' | 'read' | 'archived';
    created_at: string;
}

export default function EnquiriesPage() {
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const fetchEnquiries = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/enquiries");
            if (res.ok) {
                const data = await res.json();
                setEnquiries(data);
            }
        } catch (error) {
            console.error("Error fetching enquiries:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateStatus = async (id: number, status: string) => {
        try {
            const res = await fetch(`/api/enquiries/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status })
            });
            if (res.ok) {
                setEnquiries(enquiries.map(e => e.id === id ? { ...e, status: status as any } : e));
                if (selectedEnquiry?.id === id) {
                    setSelectedEnquiry({ ...selectedEnquiry, status: status as any });
                }
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this enquiry?")) return;
        try {
            const res = await fetch(`/api/enquiries/${id}`, {
                method: "DELETE"
            });
            if (res.ok) {
                setEnquiries(enquiries.filter(e => e.id !== id));
                if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
            }
        } catch (error) {
            console.error("Error deleting enquiry:", error);
        }
    };

    const filteredEnquiries = enquiries.filter(e => {
        const matchesSearch = e.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || e.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
            case 'read': return 'bg-green-500/10 text-green-500 border-green-500/20';
            case 'archived': return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
            default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight mb-2">Customer <span className="text-primary italic">Enquiries</span></h1>
                    <p className="text-[#9CA3AF]">Manage and respond to customer messages.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
                        <input
                            type="text"
                            placeholder="Search enquiries..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-[#111827] border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-all w-64"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-[#111827] border border-white/5 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-all cursor-pointer"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="read">Read</option>
                        <option value="archived">Archived</option>
                    </select>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* En enquiries List */}
                <div className={`${selectedEnquiry ? "lg:col-span-5" : "lg:col-span-12"} space-y-4`}>
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 bg-[#111827] border border-white/5 rounded-3xl">
                            <Clock className="animate-spin text-primary mb-4" size={32} />
                            <p className="text-[#9CA3AF]">Loading enquiries...</p>
                        </div>
                    ) : filteredEnquiries.length === 0 ? (
                        <div className="text-center py-20 bg-[#111827] border border-white/5 rounded-3xl">
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-[#9CA3AF] mx-auto mb-4">
                                <Mail size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-1">No enquiries found</h3>
                            <p className="text-[#9CA3AF]">When customers contact you, they will appear here.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filteredEnquiries.map((enquiry) => (
                                <motion.div
                                    layout
                                    key={enquiry.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    onClick={() => {
                                        setSelectedEnquiry(enquiry);
                                        if (enquiry.status === 'pending') handleUpdateStatus(enquiry.id, 'read');
                                    }}
                                    className={`group p-5 rounded-2xl border transition-all cursor-pointer ${selectedEnquiry?.id === enquiry.id
                                        ? "bg-primary/5 border-primary shadow-lg shadow-primary/10"
                                        : "bg-[#111827] border-white/5 hover:border-white/20"
                                        }`}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="space-y-1 grow min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold truncate">{enquiry.full_name}</h3>
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold uppercase tracking-widest ${getStatusColor(enquiry.status)}`}>
                                                    {enquiry.status}
                                                </span>
                                            </div>
                                            <p className="text-sm text-[#9CA3AF] truncate">{enquiry.subject || "(No Subject)"}</p>
                                        </div>
                                        <span className="text-[10px] text-[#4B5563] font-bold whitespace-nowrap mt-1">
                                            {new Date(enquiry.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Enquiry Details */}
                <AnimatePresence mode="wait">
                    {selectedEnquiry && (
                        <motion.div
                            key={selectedEnquiry.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="lg:col-span-7 bg-[#111827] border border-white/5 rounded-3xl overflow-hidden shadow-2xl sticky top-8"
                        >
                            <div className="p-8 space-y-8">
                                <div className="flex items-start justify-between pb-6 border-b border-white/5">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-4 mb-2">
                                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                                                {selectedEnquiry.full_name.charAt(0)}
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-bold">{selectedEnquiry.full_name}</h2>
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                                                        <Mail size={14} />
                                                        <span>{selectedEnquiry.email}</span>
                                                    </div>
                                                    {selectedEnquiry.phone && (
                                                        <div className="flex items-center gap-2 text-sm text-primary">
                                                            <Phone size={14} />
                                                            <span>{selectedEnquiry.phone}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleUpdateStatus(selectedEnquiry.id, 'archived')}
                                            className="p-2.5 rounded-xl hover:bg-white/5 text-[#9CA3AF] transition-colors"
                                            title="Archive"
                                        >
                                            <Archive size={20} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(selectedEnquiry.id)}
                                            className="p-2.5 rounded-xl hover:bg-red-500/10 text-[#EF4444] transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-[10px] font-bold text-[#4B5563] uppercase tracking-widest mb-2">Subject</h4>
                                        <p className="text-lg font-bold text-primary">{selectedEnquiry.subject || "(No Subject)"}</p>
                                    </div>

                                    <div>
                                        <h4 className="text-[10px] font-bold text-[#4B5563] uppercase tracking-widest mb-2">Message</h4>
                                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-[#FFFFFF] leading-relaxed whitespace-pre-wrap min-h-[200px]">
                                            {selectedEnquiry.message}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4">
                                        <div className="flex items-center gap-2 text-[#9CA3AF] text-sm">
                                            <Clock size={16} />
                                            <span>Received on {new Date(selectedEnquiry.created_at).toLocaleString()}</span>
                                        </div>
                                        <a
                                            href={`mailto:${selectedEnquiry.email}`}
                                            className="bg-primary text-black px-6 py-2.5 rounded-xl font-bold hover:bg-yellow-500 transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
                                        >
                                            <MessageCircle size={18} />
                                            Reply via Email
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
