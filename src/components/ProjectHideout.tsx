"use client";

import MissionFile from "./MissionFile";
import WebToolDevice from "./WebToolDevice";

export default function ProjectHideout() {
    return (
        <section className="relative min-h-screen w-full bg-blueprint bg-blueprint-glow text-white py-20 px-4 md:px-20 overflow-hidden">
            {/* Top Light Text */}
            {/* Top Light Text */}
            <div className="absolute top-10 left-10 font-mono text-xs text-vice-blue opacity-50">
                LOCATION: VICE CITY SAFEHOUSE <br />
                {/* Static text to prevent hydration error */}
                STATUS: ONLINE
            </div>

            <div className="max-w-7xl mx-auto">
                <header className="mb-16 flex items-end border-b border-white/10 pb-4">
                    <h2 className="font-display text-8xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                        MISSIONS
                    </h2>
                    <span className="ml-6 mb-4 font-mono text-vice-pink text-xl animate-pulse">
                        [ 5 ACTIVE CONTRACTS ]
                    </span>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <MissionFile title="SAN PLAY" role="Desktop App / Electron" status="COMPLETED" />
                    <MissionFile title="INCOGNITO" role="Browser / Security" status="TOP SECRET" />
                    <MissionFile title="DREAM FOTOS" role="Photography / Web" status="LIVE" />
                    <MissionFile title="PORTFOLIO" role="Web / Creative" status="IN PROGRESS" />
                    {/* Flipper Zero Device Style Skills */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-2 relative border border-white/10 rounded-xl p-8 bg-black/40 backdrop-blur-sm flex items-center justify-center min-h-[300px] overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-blueprint opacity-50 z-0"></div>
                        <WebToolDevice />
                    </div>
                </div>
            </div>
        </section>
    );
}
