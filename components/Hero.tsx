"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Background with Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                <div className="absolute inset-0 bg-black/40 z-10" />
                {/* Placeholder for Video - Replace with actual video URL */}
                <div className="w-full h-full bg-neutral-900 flex items-center justify-center text-neutral-700">
                    {/* If video is available, use:
           <video autoPlay loop muted playsInline className="w-full h-full object-cover">
             <source src="/hero-video.mp4" type="video/mp4" />
           </video> 
           */}
                    <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1544025162-d76690b60944?q=80&w=2060&auto=format&fit=crop')] bg-cover bg-center opacity-60 animate-pulse-slow" />
                </div>
            </div>

            {/* Content */}
            <div className="relative z-20 container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-primary font-medium tracking-widest uppercase mb-4 text-sm md:text-base">
                        Premium Halal Comfort Food
                    </h2>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
                        Savor the <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Golden</span> Taste
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light">
                        Experince the finest Indo-Med cuisine crafted with passion.
                        From sizzling bowls to gourmet platters, we redefine late-night dining.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <button className="bg-primary hover:bg-yellow-500 text-black px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105 flex items-center gap-2 w-full md:w-auto justify-center shadow-[0_0_20px_rgba(250,204,21,0.3)]">
                            <ShoppingBag size={20} />
                            Order Online
                        </button>
                        <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 flex items-center gap-2 w-full md:w-auto justify-center">
                            View Menu
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        className="w-1.5 h-1.5 bg-primary rounded-full"
                    />
                </div>
            </motion.div>
        </section>
    );
}
