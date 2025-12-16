"use client";

import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer className="relative w-full bg-black py-20 border-t border-white/10 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-vice-purple/5 z-0"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-10 flex flex-col items-center justify-center text-center">

                {/* Mission Passed Vibe Header */}
                <motion.h2
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="font-display text-6xl md:text-8xl text-vice-yellow mb-8 drop-shadow-[0_0_15px_rgba(255,204,0,0.6)]"
                >
                    MISSION PASSED
                </motion.h2>

                <div className="font-mono text-vice-blue mb-12 tracking-widest opacity-80">
                    Respect +
                </div>

                {/* Social Links Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 font-sans text-sm tracking-widest text-white/60">
                    <a href="#" className="hover:text-white hover:scale-105 transition-all">LINKEDIN</a>
                    <a href="#" className="hover:text-white hover:scale-105 transition-all">GITHUB</a>
                    <a href="#" className="hover:text-white hover:scale-105 transition-all">TWITTER</a>
                    <a href="#" className="hover:text-white hover:scale-105 transition-all">INSTAGRAM</a>
                </div>

                {/* SanStudio Signature */}
                <a
                    href="https://sanstudio.neocities.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-block"
                >
                    <div className="absolute inset-0 bg-vice-pink blur-xl opacity-20 group-hover:opacity-60 transition-opacity duration-300"></div>
                    <button className="relative px-8 py-3 border border-vice-pink/50 text-vice-pink font-display text-2xl tracking-widest group-hover:bg-vice-pink group-hover:text-black transition-all duration-300 shadow-[0_0_10px_rgba(255,0,204,0.2)] group-hover:shadow-[0_0_30px_rgba(255,0,204,0.6)]">
                        DEVELOPED BY SANSTUDIO
                    </button>
                </a>

                <div className="mt-20 text-xs text-white/20 font-mono">
                    © 2025 SANTHOSH A. ALL RIGHTS RESERVED. <br />
                    INSPIRED BY ROCKSTAR GAMES.
                </div>
            </div>
        </footer>
    );
}
