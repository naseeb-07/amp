"use client";

import React from "react";
import {
    Utensils,
    Star,
    Calendar,
    FileText
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
    const [stats, setStats] = React.useState({
        menuItems: 0,
        signatures: 0,
        events: 0,
        blogPosts: 0
    });
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch("/api/admin/stats");
                const data = await res.json();
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch dashboard stats:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStats();
    }, []);

    const statCards = [
        { name: "Menu Items", value: stats.menuItems, icon: Utensils, href: "/admin/menu", color: "text-blue-400" },
        { name: "Signatures", value: stats.signatures, icon: Star, href: "/admin/signature", color: "text-yellow-400" },
        { name: "Events", value: stats.events, icon: Calendar, href: "/admin/events", color: "text-emerald-400" },
        { name: "Blog Posts", value: stats.blogPosts, icon: FileText, href: "/admin/blog", color: "text-purple-400" },
    ];

    return (
        <div>
            <div className="mb-10 text-[#FFFFFF]">
                <h1 className="text-3xl font-bold mb-2">Welcome Back, Admin</h1>
                <p className="text-[#9CA3AF]">Real-time overview of your restaurant&apos;s content.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat) => (
                    <Link
                        key={stat.name}
                        href={stat.href}
                        className="bg-[#111827] border border-white/5 p-8 rounded-3xl hover:border-primary/30 transition-all group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/2 rounded-full -translate-y-12 translate-x-12" />

                        <div className="flex items-center justify-between mb-8">
                            <div className={`p-3 rounded-2xl bg-[#1F2937] ${stat.color}`}>
                                <stat.icon size={28} />
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="h-10 w-16 bg-[#1F2937] animate-pulse rounded-lg mb-2" />
                        ) : (
                            <h3 className="text-5xl text-[#FFFFFF] font-bold mb-2 tracking-tighter">{stat.value}</h3>
                        )}
                        <p className="text-[#9CA3AF] font-medium group-hover:text-primary transition-colors">{stat.name}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
