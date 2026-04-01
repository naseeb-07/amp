"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, Send, Loader2 } from "lucide-react";

export default function FeedbackForm() {
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        quote: "",
        rating: 5
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        if (!formData.name || !formData.quote) {
            setError("Name and review text are required.");
            setIsSubmitting(false);
            return;
        }

        try {
            const res = await fetch("/api/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!res.ok) throw new Error("Failed to submit feedback");

            setSuccess(true);
            setFormData({ name: "", role: "", quote: "", rating: 5 });

            // Hide success message after 5 seconds
            setTimeout(() => setSuccess(false), 5000);
        } catch (err: any) {
            setError(err.message || "An error occurred while submitting.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-12 bg-gray-50 dark:bg-neutral-900 transition-colors duration-300 relative border-t border-gray-100 dark:border-white/5">
            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                <div className="text-center mb-12">
                    <h3 className="text-primary font-medium tracking-widest uppercase mb-3">Share Your Experience</h3>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Leave a <span className="text-primary">Review</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        We&apos;d love to hear about your experience! Your feedback helps us improve and will be featured on our page.
                    </p>
                </div>

                <div className="bg-white dark:bg-card p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-white/10">
                    {success ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-12"
                        >
                            <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Send size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Thank You!</h3>
                            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                                Your feedback has been submitted successfully and is awaiting review. We appreciate your time!
                            </p>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Your Name *</label>
                                    <input
                                        suppressHydrationWarning
                                        type="text"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-primary outline-none transition-colors text-gray-900 dark:text-white"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Role / Title</label>
                                    <input
                                        suppressHydrationWarning
                                        type="text"
                                        value={formData.role}
                                        onChange={e => setFormData({ ...formData, role: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-primary outline-none transition-colors text-gray-900 dark:text-white"
                                        placeholder="Optional"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Rating</label>
                                    <div className="flex gap-2 pt-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                suppressHydrationWarning
                                                key={star}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, rating: star })}
                                                className="focus:outline-none transition-transform hover:scale-110"
                                            >
                                                <Star
                                                    size={28}
                                                    className={star <= formData.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 flex flex-col">
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Your Review *</label>
                                <textarea
                                    suppressHydrationWarning
                                    value={formData.quote}
                                    onChange={e => setFormData({ ...formData, quote: e.target.value })}
                                    rows={3}
                                    className="w-full grow px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-primary outline-none transition-colors text-gray-900 dark:text-white resize-none"
                                    placeholder="Tell us about your experience..."
                                />
                            </div>

                            {error && (
                                <p className="text-red-500 text-sm">{error}</p>
                            )}

                            <button
                                suppressHydrationWarning
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-primary text-black font-bold py-4 rounded-xl hover:bg-yellow-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <><Loader2 size={20} className="animate-spin" /> Submitting...</>
                                ) : (
                                    <><Send size={20} /> Submit Review</>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
