"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Lock, User, LayoutDashboard } from "lucide-react";

export default function AdminLogin() {
    const router = useRouter();
    const [credentials, setCredentials] = React.useState({ username: "", password: "" });
    const [error, setError] = React.useState("");

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            const auth = localStorage.getItem("admin_auth");
            if (auth) {
                router.push("/admin");
            }
        }
    }, [router]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // SIMPLE HARDCODED AUTH FOR DEMO
        if (credentials.username === "admin" && credentials.password === "naseeb123") {
            localStorage.setItem("admin_auth", "true");
            router.push("/admin");
        } else {
            setError("Invalid credentials. Try admin / naseeb123");
        }
    };

    return (
        <div className="min-h-screen bg-dark flex items-center justify-center p-6 font-poppins">
            <div className="bg-[#111827] border border-white/5 p-10 rounded-[2.5rem] w-full max-w-md shadow-2xl relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-primary rounded-3xl flex items-center justify-center text-black mx-auto mb-6 rotate-6 shadow-lg shadow-primary/20">
                        <Lock size={32} />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Admin <span className="text-primary">Portal</span></h1>
                    <p className="text-gray-500 text-sm">Secure access for restaurant management</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    {error && (
                        <div className="bg-red-400/10 border border-red-400/20 text-red-400 p-4 rounded-2xl text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="text"
                            required
                            placeholder="Username"
                            value={credentials.username}
                            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-4 focus:outline-none focus:border-primary transition-all text-white placeholder:text-gray-600"
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="password"
                            required
                            placeholder="Password"
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-4 focus:outline-none focus:border-primary transition-all text-white placeholder:text-gray-600"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-black font-bold py-4 rounded-2xl hover:bg-yellow-500 transition-all active:scale-95 shadow-lg shadow-primary/20"
                    >
                        Login to Dashboard
                    </button>
                </form>

                <p className="text-center text-xs text-gray-600 mt-8">
                    &copy; 2026 Asif's Melting Pot Management System
                </p>
            </div>
        </div>
    );
}
