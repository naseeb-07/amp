"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Plus,
    Trash2,
    Save,
    RefreshCw,
    GripVertical
} from "lucide-react";

interface SettingData {
    address: string;
    phone: string;
    email: string;
}

interface OpeningHour {
    id: number;
    day_range: string;
    time_range: string;
    display_order: number;
}

const COUNTRY_CODES = [
    { code: "+1", country: "US", flag: "🇺🇸" },
    { code: "+91", country: "IN", flag: "🇮🇳" },
    { code: "+971", country: "AE", flag: "🇦🇪" },
    { code: "+966", country: "SA", flag: "🇸🇦" },
];

export default function SettingsPage() {
    const [settings, setSettings] = useState<SettingData>({
        address: "",
        phone: "",
        email: ""
    });
    const [hours, setHours] = useState<OpeningHour[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isSavingHours, setIsSavingHours] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [sRes, hRes] = await Promise.all([
                fetch("/api/settings"),
                fetch("/api/opening-hours")
            ]);
            if (sRes.ok) {
                const sData = await sRes.json();
                if (Object.keys(sData).length > 0) setSettings(sData);
            }
            if (hRes.ok) {
                const hData = await hRes.json();
                setHours(hData);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveSettings = async () => {
        setIsSaving(true);
        try {
            const res = await fetch("/api/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings)
            });
            if (res.ok) alert("Settings saved successfully!");
        } catch (error) {
            console.error("Error saving settings:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleUpdateHour = (id: number, data: Partial<OpeningHour>) => {
        // Only update local state now
        setHours(hours.map(h => h.id === id ? { ...h, ...data } : h));
    };

    const handleUpdateAllTimings = async () => {
        setIsSavingHours(true);
        try {
            // Update each timing slot sequentially or in parallel
            const updates = hours
                .filter(hour => hour.id) // Ensure ID exists
                .map(hour =>
                    fetch(`/api/opening-hours/${hour.id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(hour)
                    })
                );

            const results = await Promise.all(updates);
            if (results.every(r => r.ok)) {
                alert("All timings updated successfully!");
                fetchData();
            } else {
                alert("Some updates failed. Please try again.");
            }
        } catch (error) {
            console.error("Error updating all hours:", error);
            alert("An error occurred while saving timings.");
        } finally {
            setIsSavingHours(false);
        }
    };

    const handleDeleteHour = async (id: number) => {
        if (!confirm("Are you sure you want to delete this time slot?")) return;
        try {
            const res = await fetch(`/api/opening-hours/${id}`, {
                method: "DELETE"
            });
            if (res.ok) fetchData();
        } catch (error) {
            console.error("Error deleting hour:", error);
        }
    };

    const parseTimeRange = (timeRange: string) => {
        if (timeRange === "CLOSED") return { start: "11:00 AM", end: "10:00 PM", isClosed: true };
        const parts = timeRange.split(" - ");
        if (parts.length !== 2) return { start: "11:00 AM", end: "10:00 PM", isClosed: false };
        return { start: parts[0], end: parts[1], isClosed: false };
    };

    const formatTime = (h: string, m: string, p: string) => `${h}:${m} ${p}`;

    const TimeSelection = ({
        value,
        onChange,
        disabled
    }: {
        value: string,
        onChange: (val: string) => void,
        disabled?: boolean
    }) => {
        const [h, mp] = value.split(":");
        const [m, p] = mp ? mp.split(" ") : ["00", "AM"];

        return (
            <div className={`flex items-center gap-1 bg-black/40 p-1 rounded-xl ${disabled ? 'opacity-30 pointer-events-none' : ''}`}>
                <select
                    value={h}
                    disabled={disabled}
                    onChange={(e) => onChange(formatTime(e.target.value, m, p))}
                    className="bg-transparent border-none text-sm p-1 focus:ring-0 cursor-pointer hover:text-primary transition-colors disabled:cursor-not-allowed"
                >
                    {Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0')).map(v => (
                        <option key={v} value={v} className="bg-neutral-900">{v}</option>
                    ))}
                </select>
                <span className="text-gray-600">:</span>
                <select
                    value={m}
                    disabled={disabled}
                    onChange={(e) => onChange(formatTime(h, e.target.value, p))}
                    className="bg-transparent border-none text-sm p-1 focus:ring-0 cursor-pointer hover:text-primary transition-colors disabled:cursor-not-allowed"
                >
                    {["00", "15", "30", "45"].map(v => (
                        <option key={v} value={v} className="bg-neutral-900">{v}</option>
                    ))}
                </select>
                <select
                    value={p}
                    disabled={disabled}
                    onChange={(e) => onChange(formatTime(h, m, e.target.value))}
                    className="bg-transparent border-none text-[10px] font-bold p-1 focus:ring-0 cursor-pointer hover:text-primary transition-colors disabled:cursor-not-allowed"
                >
                    {["AM", "PM"].map(v => (
                        <option key={v} value={v} className="bg-neutral-900">{v}</option>
                    ))}
                </select>
            </div>
        );
    };

    const CountryCodeDropdown = ({
        value,
        onChange
    }: {
        value: string,
        onChange: (val: string) => void
    }) => {
        const [isOpen, setIsOpen] = useState(false);
        const selected = COUNTRY_CODES.find(c => c.code === value) || COUNTRY_CODES[0];

        return (
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 bg-[#1F2937] border border-white/10 rounded-xl px-3 py-3 hover:border-primary transition-colors min-w-[90px]"
                >
                    <span className="text-lg">{selected.flag}</span>
                    <span className="text-sm font-bold text-[#FFFFFF]">{selected.code}</span>
                </button>

                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-10"
                            onClick={() => setIsOpen(false)}
                        />
                        <div className="absolute top-full left-0 mt-2 w-48 bg-[#1F2937] border border-white/10 rounded-xl shadow-2xl z-20 overflow-hidden max-h-60 overflow-y-auto custom-scrollbar">
                            {COUNTRY_CODES.map((c) => (
                                <button
                                    key={`${c.country}-${c.code}`}
                                    type="button"
                                    onClick={() => {
                                        onChange(c.code);
                                        setIsOpen(false);
                                    }}
                                    className="flex items-center gap-3 w-full px-4 py-3 hover:bg-primary/10 transition-colors text-left"
                                >
                                    <span className="text-lg">{c.flag}</span>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-[#9CA3AF]">{c.country}</span>
                                        <span className="text-sm font-bold text-[#FFFFFF]">{c.code}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        );
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <RefreshCw className="animate-spin text-primary" size={40} />
            </div>
        );
    }

    // Filter out any rogue "New Range" or empty entries to keep the schedule fixed
    const filteredHours = hours.filter(h => h.day_range !== "New Range" && h.day_range !== "New Slot" && h.day_range.trim() !== "");

    return (
        <div className="space-y-12 pb-20 text-[#FFFFFF]">
            <header className="flex justify-between items-end mb-8 text-[#FFFFFF]">
                <div>
                    <h1 className="text-4xl font-bold mb-2">Restaurant <span className="text-primary">Settings</span></h1>
                    <p className="text-[#9CA3AF]">Manage your contact information and operating hours.</p>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* General Settings */}
                <div className="lg:col-span-1 space-y-6 text-[#FFFFFF]">
                    <div className="bg-[#111827] border border-white/5 p-8 rounded-3xl">
                        <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
                            <RefreshCw size={20} className="text-primary" /> General Info
                        </h2>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm text-[#9CA3AF] flex items-center gap-2">
                                    <MapPin size={14} /> Address
                                </label>
                                <textarea
                                    value={settings.address}
                                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                                    rows={3}
                                    className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none text-[#FFFFFF]"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-[#9CA3AF] flex items-center gap-2">
                                    <Phone size={14} /> Phone Number
                                </label>
                                <div className="flex gap-3">
                                    <CountryCodeDropdown
                                        value={(() => {
                                            const match = settings.phone.match(/^\+(\d+)\s/);
                                            return match ? match[0].trim() : "+1";
                                        })()}
                                        onChange={(newCode) => {
                                            const currentNumber = settings.phone.replace(/^\+\d+\s/, "");
                                            setSettings({ ...settings, phone: `${newCode} ${currentNumber}` });
                                        }}
                                    />
                                    <input
                                        type="text"
                                        value={settings.phone.replace(/^\+\d+\s/, "")}
                                        placeholder="Phone number"
                                        onChange={(e) => {
                                            const match = settings.phone.match(/^\+(\d+)\s/);
                                            const code = match ? match[0].trim() : "+1";
                                            setSettings({ ...settings, phone: `${code} ${e.target.value}` });
                                        }}
                                        className="flex-1 bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-[#FFFFFF]"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-[#9CA3AF] flex items-center gap-2">
                                    <Mail size={14} /> Email Address
                                </label>
                                <input
                                    type="email"
                                    value={settings.email}
                                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                                    className="w-full bg-[#1F2937] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-[#FFFFFF]"
                                />
                            </div>

                            <button
                                onClick={handleSaveSettings}
                                disabled={isSaving}
                                className="w-full bg-primary hover:bg-yellow-500 text-black font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                <Save size={18} /> {isSaving ? "Saving..." : "Save Settings"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Opening Hours */}
                <div className="lg:col-span-2 space-y-6 text-[#FFFFFF]">
                    <div className="bg-[#111827] border border-white/5 p-8 rounded-3xl">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-xl font-bold flex items-center gap-3">
                                <Clock size={20} className="text-primary" /> Opening Hours
                            </h2>
                            <button
                                onClick={handleUpdateAllTimings}
                                disabled={isSavingHours}
                                className="bg-primary hover:bg-yellow-500 text-black px-6 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 disabled:opacity-50"
                            >
                                <Save size={16} /> {isSavingHours ? "Updating..." : "Update Timings"}
                            </button>
                        </div>

                        <div className="space-y-4">
                            {filteredHours.map((hour) => {
                                const { start, end, isClosed } = parseTimeRange(hour.time_range);
                                return (
                                    <motion.div
                                        key={hour.id}
                                        layout
                                        className="group flex flex-col md:flex-row items-center gap-6 bg-[#1F2937] border border-white/10 p-5 rounded-2xl"
                                    >
                                        <div className="flex-1 w-full space-y-3">
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    value={hour.day_range}
                                                    onChange={(e) => handleUpdateHour(hour.id, { day_range: e.target.value })}
                                                    className="bg-transparent border-none p-0 text-[#FFFFFF] font-bold placeholder:text-gray-500 focus:ring-0 text-lg"
                                                    placeholder="e.g. Monday - Friday"
                                                />
                                            </div>

                                            <div className="flex flex-wrap items-center gap-3">
                                                <TimeSelection
                                                    value={start}
                                                    disabled={isClosed}
                                                    onChange={(newStart) => handleUpdateHour(hour.id, { time_range: `${newStart} - ${end}` })}
                                                />
                                                <span className={`text-[#9CA3AF] text-xs font-bold ${isClosed ? 'opacity-30' : ''}`}>TO</span>
                                                <TimeSelection
                                                    value={end}
                                                    disabled={isClosed}
                                                    onChange={(newEnd) => handleUpdateHour(hour.id, { time_range: `${start} - ${newEnd}` })}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                                            <button
                                                onClick={() => handleUpdateHour(hour.id, { time_range: isClosed ? "11:00 AM - 10:00 PM" : "CLOSED" })}
                                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${isClosed
                                                    ? "bg-red-400 text-black border-red-400"
                                                    : "bg-transparent text-[#9CA3AF] border-white/10 hover:border-red-400/50 hover:text-red-400"
                                                    }`}
                                            >
                                                {isClosed ? "CLOSED" : "MARK CLOSED"}
                                            </button>
                                        </div>
                                    </motion.div>
                                );
                            })}
                            {filteredHours.length === 0 && (
                                <div className="text-center py-10 text-[#9CA3AF] italic">
                                    No opening hours set. Please contact system administrator.
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
