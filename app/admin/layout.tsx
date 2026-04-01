"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Utensils,
    Star,
    ChefHat,
    Calendar,
    FileText,
    LogOut,
    Menu as MenuIcon,
    X,
    Settings as SettingsIcon,
    MessageSquare,
    Mail,
} from "lucide-react";

const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Menu", href: "/admin/menu", icon: Utensils },
    { name: "Reservations", href: "/admin/reservations", icon: Calendar }, // Added Reservations
    { name: "Signature Dishes", href: "/admin/signature", icon: Star },
    { name: "Chef's Specials", href: "/admin/chef", icon: ChefHat },
    { name: "Events", href: "/admin/events", icon: Calendar },
    { name: "Feedback", href: "/admin/feedback", icon: MessageSquare },
    { name: "Blog", href: "/admin/blog", icon: FileText },
    { name: "Enquiries", href: "/admin/enquiries", icon: Mail },
    { name: "Settings", href: "/admin/settings", icon: SettingsIcon },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const auth = localStorage.getItem("admin_auth");
            if (!auth && pathname !== "/admin/login") {
                router?.push("/admin/login");
            } else {
                setIsAuthenticated(true);
            }
        }
    }, [pathname, router]);

    if (!isAuthenticated && pathname !== "/admin/login") return null;

    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    return (
        <div
            className="min-h-screen bg-dark text-[#FFFFFF] font-poppins"
        >
            {/* Sidebar */}
            <aside
                className={`${isSidebarOpen ? "w-64" : "w-20"
                    } fixed left-0 top-0 h-full bg-[#111827] border-r border-white/5 transition-all duration-300 z-50`}
            >
                <div className="flex flex-col h-full p-4">
                    <div className="flex items-center justify-between mb-10 px-2">
                        {isSidebarOpen && (
                            <span className="text-xl font-bold text-primary tracking-tighter">NASEEB <span className="text-[#FFFFFF]">ADMIN</span></span>
                        )}
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                        >
                            {isSidebarOpen ? <X size={20} /> : <MenuIcon size={20} />}
                        </button>
                    </div>

                    <nav className="grow space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${isActive
                                        ? "bg-primary text-black font-bold shadow-lg shadow-primary/20"
                                        : "text-[#9CA3AF] hover:bg-white/5 hover:text-[#FFFFFF]"
                                        }`}
                                >
                                    <Icon size={20} />
                                    {isSidebarOpen && <span>{item.name}</span>}
                                </Link>
                            );
                        })}
                    </nav>

                    <button
                        onClick={() => {
                            localStorage.removeItem("admin_auth");
                            setIsAuthenticated(false);
                            router.push("/admin/login");
                        }}
                        className="flex items-center w-full gap-4 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-all text-left"
                    >
                        <LogOut size={20} />
                        {isSidebarOpen && <span>Log Out</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main
                className={`${isSidebarOpen ? "pl-64" : "pl-20"
                    } transition-all duration-300 min-h-screen`}
            >
                <div className="p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
