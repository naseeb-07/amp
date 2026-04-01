"use client";

import React from "react";
import { Check, X, Trash2, Star, Eye } from "lucide-react";

interface Feedback {
    id: string;
    name: string;
    role: string;
    quote: string;
    rating: number;
    image: string;
    approved: boolean;
    createdAt: string;
}

export default function FeedbackAdmin() {
    const [feedbacks, setFeedbacks] = React.useState<Feedback[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [viewQuote, setViewQuote] = React.useState<string | null>(null);

    const fetchFeedbacks = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/feedback");
            const data = await res.json();
            setFeedbacks(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to fetch feedbacks:", error);
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        fetchFeedbacks();
    }, []);

    const toggleApproval = async (id: string, currentStatus: boolean) => {
        try {
            const res = await fetch(`/api/feedback/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ approved: !currentStatus }),
            });

            if (res.ok) {
                fetchFeedbacks();
            } else {
                alert("Failed to update status");
            }
        } catch (error) {
            console.error("Error updating feedback:", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this feedback forever?")) return;

        try {
            const res = await fetch(`/api/feedback/${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchFeedbacks();
            } else {
                alert("Failed to delete feedback");
            }
        } catch (error) {
            console.error("Error deleting feedback:", error);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-end mb-10 text-[#FFFFFF]">
                <div>
                    <h1 className="text-3xl font-bold mb-2">User Feedback</h1>
                    <p className="text-[#9CA3AF]">Moderate customer reviews before they appear on the homepage.</p>
                </div>
            </div>

            {/* Quote Modal */}
            {viewQuote && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6 text-[#FFFFFF]">
                    <div className="bg-[#111827] border border-white/10 p-8 rounded-3xl w-full max-w-lg shadow-2xl relative">
                        <button
                            onClick={() => setViewQuote(null)}
                            className="absolute top-4 right-4 text-[#9CA3AF] hover:text-[#FFFFFF]"
                        >
                            <X size={24} />
                        </button>
                        <h2 className="text-sm font-bold mb-4 opacity-50 uppercase tracking-widest text-[#9CA3AF]">Full Review</h2>
                        <p className="text-lg leading-relaxed text-gray-300 italic">"{viewQuote}"</p>
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="bg-[#111827] border border-white/5 rounded-3xl overflow-hidden shadow-2xl text-[#FFFFFF]">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/5 bg-[#1F2937]/50">
                            <th className="px-6 py-4 text-xs font-bold text-[#9CA3AF] uppercase tracking-widest min-w-[300px]">Customer</th>
                            <th className="px-6 py-4 text-xs font-bold text-[#9CA3AF] uppercase tracking-widest">Rating</th>
                            <th className="px-6 py-4 text-xs font-bold text-[#9CA3AF] uppercase tracking-widest">Review</th>
                            <th className="px-6 py-4 text-xs font-bold text-[#9CA3AF] uppercase tracking-widest">Date</th>
                            <th className="px-6 py-4 text-xs font-bold text-[#9CA3AF] uppercase tracking-widest">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-[#9CA3AF] uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {isLoading ? (
                            <tr><td colSpan={6} className="px-6 py-10 text-center text-[#9CA3AF]">Loading feedback...</td></tr>
                        ) : feedbacks.length === 0 ? (
                            <tr><td colSpan={6} className="px-6 py-10 text-center text-[#9CA3AF]">No feedback entries found.</td></tr>
                        ) : feedbacks.map((feedback: Feedback) => (
                            <tr key={feedback.id} className={`group hover:bg-white/5 transition-colors ${!feedback.approved && 'bg-primary/5'}`}>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10 shrink-0 bg-[#1F2937]">
                                            <img
                                                src={feedback.image || "/default-avatar.png"}
                                                alt={feedback.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(feedback.name) + "&background=random";
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <div className="font-bold text-[#FFFFFF] line-clamp-1">{feedback.name}</div>
                                            <div className="text-xs text-primary uppercase tracking-wider">{feedback.role || "Customer"}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1 text-yellow-400">
                                        <span className="font-bold mr-1">{feedback.rating}</span>
                                        <Star size={14} fill="currentColor" />
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <p className="text-[#9CA3AF] text-sm line-clamp-1 max-w-[200px]">{feedback.quote}</p>
                                        <button
                                            onClick={() => setViewQuote(feedback.quote)}
                                            className="text-[#9CA3AF] hover:text-primary transition-colors"
                                            title="View full quote"
                                        >
                                            <Eye size={16} />
                                        </button>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-[#9CA3AF] text-sm">
                                    {new Date(feedback.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                                    {feedback.approved ? (
                                        <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase flex items-center gap-1 w-max">
                                            <Check size={14} /> Approved
                                        </span>
                                    ) : (
                                        <span className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase flex items-center gap-1 w-max">
                                            Pending
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => toggleApproval(feedback.id, feedback.approved)}
                                            className={`p-2 rounded-lg transition-colors border ${feedback.approved
                                                ? "border-red-500/20 text-red-400 hover:bg-red-500/10"
                                                : "border-green-500/20 text-green-400 hover:bg-green-500/10"
                                                }`}
                                            title={feedback.approved ? "Revoke Approval" : "Approve Feedback"}
                                        >
                                            {feedback.approved ? <X size={18} /> : <Check size={18} />}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(feedback.id)}
                                            className="p-2 border border-red-500/20 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                            title="Delete permanently"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
