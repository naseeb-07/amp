"use client";

import React, { useState, useEffect } from "react";
import { Trash2, Check, X, Search, Calendar, User, Phone, Mail, Clock } from "lucide-react";
import { format } from "date-fns";

interface Reservation {
    id: number;
    name: string;
    persons: number;
    date: string;
    time: string;
    occasion: string;
    specialRequirement: string;
    email: string;
    phone: string;
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
}

export default function AdminReservations() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
    const [searchQuery, setSearchQuery] = useState("");

    const fetchReservations = async () => {
        try {
            const res = await fetch("/api/reservations");
            const data = await res.json();
            setReservations(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching reservations:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    const updateStatus = async (id: number, status: 'approved' | 'rejected') => {
        try {
            const res = await fetch(`/api/reservations/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status })
            });

            if (res.ok) {
                // Update local state without re-fetching
                setReservations(prev => prev.map(r => r.id === id ? { ...r, status } : r));
            } else {
                alert("Failed to update status");
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const filteredReservations = reservations.filter(res => {
        const matchesFilter = filter === 'all' || res.status === filter;
        const matchesSearch = res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            res.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            res.phone.includes(searchQuery);
        return matchesFilter && matchesSearch;
    });

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'approved': return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase">Approved</span>;
            case 'rejected': return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold uppercase">Rejected</span>;
            default: return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold uppercase">Pending</span>;
        }
    };

    return (
        <div className="p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Reservations</h1>
                    <p className="text-gray-500">Manage all incoming bookings and special events.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search name, email, phone..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full sm:w-64"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                </div>
            </div>

            <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide border-b border-gray-200">
                {['all', 'pending', 'approved', 'rejected'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setFilter(tab as any)}
                        className={`capitalize px-4 py-2 font-medium whitespace-nowrap transition-colors relative ${filter === tab ? 'text-primary' : 'text-gray-500 hover:text-gray-900'
                            }`}
                    >
                        {tab}
                        {filter === tab && (
                            <div className="absolute -bottom-px left-0 w-full h-[2px] bg-primary rounded-t-full" />
                        )}
                        <span className="ml-2 text-xs bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full">
                            {tab === 'all' ? reservations.length : reservations.filter(r => r.status === tab).length}
                        </span>
                    </button>
                ))}
            </div>

            {isLoading ? (
                <div className="flex justify-center py-20">
                    <div className="w-10 h-10 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
                </div>
            ) : filteredReservations.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                    <Calendar className="mx-auto text-gray-300 mb-4" size={48} />
                    <h3 className="text-lg font-bold text-gray-900 mb-2">No Reservations Found</h3>
                    <p className="text-gray-500">There are no {filter !== 'all' ? filter : ''} reservations matching your criteria.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {filteredReservations.map((res) => (
                        <div key={res.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col lg:flex-row justify-between gap-6 hover:shadow-md transition-shadow">

                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-4">
                                    <h3 className="text-xl font-bold text-gray-900">{res.name}</h3>
                                    {getStatusBadge(res.status)}
                                    <span className="text-sm text-gray-400 ml-auto">
                                        Received: {format(new Date(res.created_at), 'MMM d, yyyy h:mm a')}
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Calendar size={16} className="text-primary" />
                                        <span>{res.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Clock size={16} className="text-primary" />
                                        <span>{res.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <User size={16} className="text-primary" />
                                        <span>{res.persons} Person(s)</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Phone size={16} className="text-primary" />
                                        <span>{res.phone}</span>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg flex flex-col md:flex-row justify-between gap-4">
                                    <div>
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Occasion / Event</span>
                                        <span className="text-gray-900 font-medium">{res.occasion}</span>
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Special Req</span>
                                        <span className={`font-medium ${res.specialRequirement !== 'None' ? 'text-red-500' : 'text-gray-900'}`}>{res.specialRequirement}</span>
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Email contact</span>
                                        <a href={`mailto:${res.email}`} className="text-blue-500 hover:underline flex items-center gap-1"><Mail size={14} /> {res.email}</a>
                                    </div>
                                </div>
                            </div>

                            <div className="flex lg:flex-col justify-end gap-3 min-w-[140px]">
                                {res.status === 'pending' ? (
                                    <>
                                        <button
                                            onClick={() => updateStatus(res.id, 'approved')}
                                            className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-lg font-medium transition-colors"
                                        >
                                            <Check size={18} /> Approve
                                        </button>
                                        <button
                                            onClick={() => updateStatus(res.id, 'rejected')}
                                            className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2.5 rounded-lg font-medium transition-colors"
                                        >
                                            <X size={18} /> Reject
                                        </button>
                                    </>
                                ) : (
                                    <div className="h-full flex flex-col justify-center text-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                                        <span className="text-sm text-gray-500">Status marked as</span>
                                        <strong className={res.status === 'approved' ? 'text-green-600' : 'text-red-600 capitalize'}>{res.status}</strong>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
