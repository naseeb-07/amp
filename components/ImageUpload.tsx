"use client";

import React, { useRef, useState } from "react";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    label?: string;
}

export default function ImageUpload({ value, onChange, label = "Image" }: ImageUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Reset error
        setError(null);
        setIsUploading(true);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Upload failed");

            const data = await res.json();
            onChange(data.url);
        } catch (err) {
            setError("Failed to upload image. Please try again.");
            console.error("Upload error:", err);
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const removeImage = () => {
        onChange("");
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-400 mb-2">{label}</label>

            <div className="relative group">
                {value ? (
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-white/5">
                        <img
                            src={value}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />
                        <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ) : (
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full aspect-video rounded-xl border-2 border-dashed border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/50 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 group"
                    >
                        {isUploading ? (
                            <>
                                <Loader2 size={32} className="text-primary animate-spin" />
                                <span className="text-sm text-gray-400">Uploading...</span>
                            </>
                        ) : (
                            <>
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-primary transition-colors">
                                    <Upload size={24} />
                                </div>
                                <span className="text-sm text-gray-400 group-hover:text-gray-300">Click to upload or drag and drop</span>
                                <span className="text-[10px] text-gray-500 uppercase tracking-widest">PNG, JPG or WEBP</span>
                            </>
                        )}
                    </div>
                )}

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                />
            </div>

            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}

            {value && !isUploading && (
                <div className="flex items-center gap-2 mt-2">
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline"
                    >
                        Change Image
                    </button>
                    <span className="text-[10px] text-gray-600">|</span>
                    <p className="text-[10px] text-gray-500 truncate max-w-[200px] italic">{value}</p>
                </div>
            )}
        </div>
    );
}
