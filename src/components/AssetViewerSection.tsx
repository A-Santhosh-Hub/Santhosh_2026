"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

const AssetViewerExperience = dynamic(() => import("./3d/AssetViewerExperience"), {
    ssr: false,
    loading: () => <div className="text-white text-center p-20 font-mono">INITIALIZING ASSET ENGINE...</div>
});

const ASSETS = [
    { id: "car1", name: "SPORT CAR 1", file: "/car1.glb", desc: "Prototype Racer" },
    { id: "charger", name: "CHARGER", file: "/charger.glb", desc: "Muscle Classic" },
    { id: "digtool", name: "EXCAVATOR", file: "/Digtool.glb", desc: "Heavy Industry" },
    { id: "2022", name: "PROJECT 2022", file: "/2022.glb", desc: "Concept Arch" },
];

export default function AssetViewerSection() {
    const [selectedAsset, setSelectedAsset] = useState(ASSETS[0]);
    const [autoRotate, setAutoRotate] = useState(true);
    const [envMode, setEnvMode] = useState<"city" | "studio">("city");

    return (
        <section className="relative w-full h-[80vh] md:h-screen bg-vice-midnight overflow-hidden border-t border-white/10 group">

            {/* --- 3D CANVAS LAYER (Fullscreen) --- */}
            <div className="absolute inset-0 z-0">
                <AssetViewerExperience
                    key={selectedAsset.file} // Force reset on change
                    modelPath={selectedAsset.file}
                    autoRotate={autoRotate}
                    environment={envMode}
                />
            </div>

            {/* --- SCANNER OVERLAY --- */}
            <div className="absolute inset-0 z-10 pointer-events-none bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
            <div className="absolute top-10 left-10 z-10 pointer-events-none">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 animate-ping rounded-full"></div>
                    <div className="font-mono text-white/50 text-xs">LIVE PREVIEW // 60 FPS</div>
                </div>
                <h2 className="font-display text-4xl text-white italic tracking-tighter mt-2 drop-shadow-lg">
                    {selectedAsset.name}
                </h2>
            </div>

            {/* --- CONTROLS HUD (Top Right) --- */}
            <div className="absolute top-10 right-10 z-20 flex flex-col gap-2">
                {/* Auto Rotate Toggle */}
                <button
                    onClick={() => setAutoRotate(!autoRotate)}
                    className={`nav-btn backdrop-blur-md p-3 rounded border transition-all ${autoRotate ? 'bg-vice-pink text-white border-vice-pink' : 'bg-black/50 text-white/50 border-white/20'}`}
                >
                    <span className="font-mono text-xs">{autoRotate ? "SPIN: ON" : "SPIN: OFF"}</span>
                </button>

                {/* Env Toggle */}
                <button
                    onClick={() => setEnvMode(envMode === "city" ? "studio" : "city")}
                    className="nav-btn backdrop-blur-md p-3 rounded border border-white/20 bg-black/50 text-white hover:bg-white/20 transition-all text-right"
                >
                    <span className="font-mono text-xs block text-white/50">LIGHTING</span>
                    <span className="font-mono text-sm text-vice-blue">{envMode.toUpperCase()}</span>
                </button>
            </div>

            {/* --- ASSET SELECTOR HUD (Bottom) --- */}
            <div className="absolute bottom-0 left-0 w-full z-20 bg-gradient-to-t from-black via-black/80 to-transparent p-6 pt-20">
                <div className="flex overflow-x-auto gap-4 pb-4 snap-x no-scrollbar md:justify-center">
                    {ASSETS.map((asset) => (
                        <button
                            key={asset.id}
                            onClick={() => setSelectedAsset(asset)}
                            className={`
                                relative flex-shrink-0 w-48 p-4 rounded border backdrop-blur-md transition-all snap-center text-left group/btn
                                ${selectedAsset.id === asset.id
                                    ? "bg-white/10 border-vice-pink shadow-[0_0_20px_rgba(255,0,204,0.3)]"
                                    : "bg-black/40 border-white/10 hover:border-white/40"}
                            `}
                        >
                            <div className="font-display text-lg text-white italic relative z-10">
                                {asset.name}
                            </div>
                            <div className="font-mono text-xs text-white/50 relative z-10">
                                {asset.desc}
                            </div>

                            {/* Selected Indicator */}
                            {selectedAsset.id === asset.id && (
                                <div className="absolute top-2 right-2 w-2 h-2 bg-vice-pink rounded-full animate-pulse shadow-[0_0_10px_#ff00cc]"></div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Prompt */}
                <div className="text-center mt-2 text-white/30 text-[10px] font-mono tracking-[0.2em] md:hidden">
                    SWIPE TO SELECT
                </div>
            </div>

        </section>
    );
}
