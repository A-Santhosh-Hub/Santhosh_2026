"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const ViceCityEvasion = dynamic(() => import("./game/ViceCityEvasion"), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-black flex items-center justify-center text-white">LOADING CARTRIDGE...</div>
});

export default function GameArcadeSection() {
    return (
        <section className="relative w-full py-20 bg-vice-midnight overflow-hidden border-t-4 border-vice-pink">

            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="flex flex-col items-center mb-10 text-center">
                    <h2 className="font-display text-6xl text-white italic tracking-tighter drop-shadow-[0_0_15px_rgba(255,0,204,0.5)]">
                        ARCADE
                    </h2>
                    <div className="h-1 w-24 bg-vice-blue mt-2 mb-4"></div>
                    <p className="text-white/60 font-mono text-sm max-w-xl">
                        PROVE YOUR SKILLS. HIGH SCORE UNLOCKS NOTHING BUT RESPECT.
                    </p>
                </div>

                {/* Game Container */}
                <div className="relative w-full max-w-4xl mx-auto h-[600px] bg-black rounded-lg shadow-2xl border border-white/10 p-2 md:p-4 rotate-1 hover:rotate-0 transition-transform duration-500">

                    {/* Retro CRT Effect Container */}
                    <div className="w-full h-full relative rounded overflow-hidden">
                        <ViceCityEvasion />
                    </div>
                </div>
            </div>
        </section>
    );
}
