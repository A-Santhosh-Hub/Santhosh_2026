"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tools = [
    { name: "NEXT.JS", level: "v14", color: "text-white" },
    { name: "REACT", level: "EXPERT", color: "text-vice-blue" },
    { name: "THREE.JS", level: "ADVANCED", color: "text-vice-pink" },
    { name: "TAILWIND", level: "MASTER", color: "text-vice-yellow" },
    { name: "NODE.JS", level: "BACKEND", color: "text-green-500" },
    { name: "BLENDER", level: "3D MODEL", color: "text-orange-500" },
];

export default function WebToolDevice() {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextTool = () => setActiveIndex((prev) => (prev + 1) % tools.length);
    const prevTool = () => setActiveIndex((prev) => (prev - 1 + tools.length) % tools.length);

    return (
        <div className="relative w-full h-[300px] flex items-center justify-center">
            {/* Device Body */}
            <div className="relative w-64 h-40 bg-neutral-900 rounded-3xl border-4 border-neutral-800 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">

                {/* Screen */}
                <div className="absolute top-4 left-4 right-16 bottom-4 bg-orange-500 rounded-lg overflow-hidden border-4 border-neutral-800 flex items-center justify-center p-2">
                    <div className="w-full h-full bg-orange-600 relative scanline">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.2 }}
                                className="flex flex-col items-center justify-center h-full text-black font-mono font-bold"
                            >
                                <span className="text-xs opacity-70">MODULE LOADED:</span>
                                <span className="text-2xl">{tools[activeIndex].name}</span>
                                <span className="text-xs border border-black px-1 mt-1">{tools[activeIndex].level}</span>
                            </motion.div>
                        </AnimatePresence>

                        {/* Scanlines Overlay */}
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
                    </div>
                </div>

                {/* Controls */}
                <div className="absolute top-8 right-3 flex flex-col gap-2">
                    <button
                        onClick={nextTool}
                        className="w-10 h-10 bg-neutral-800 rounded-full border-2 border-neutral-700 active:scale-90 flex items-center justify-center text-neutral-500 font-bold hover:text-white"
                    >
                        ▲
                    </button>
                    <div className="w-10 h-10 bg-neutral-800 rounded-full border-2 border-neutral-700 flex items-center justify-center text-neutral-500 font-bold">
                        ●
                    </div>
                    <button
                        onClick={prevTool}
                        className="w-10 h-10 bg-neutral-800 rounded-full border-2 border-neutral-700 active:scale-90 flex items-center justify-center text-neutral-500 font-bold hover:text-white"
                    >
                        ▼
                    </button>
                </div>

                {/* Branding */}
                <div className="absolute bottom-2 right-16 text-[0.6rem] text-white/20 font-sans tracking-widest">
                    SAN-ZERO
                </div>
            </div>
        </div>
    );
}
