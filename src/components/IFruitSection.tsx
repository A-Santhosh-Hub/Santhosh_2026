"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { motion } from "framer-motion";

import Phone3D from "./3d/Phone3D";

const APPS = [
    {
        id: 1,
        name: "SanMusic",
        color: "#ff0055",
        description: "A high-fidelity music streaming app with real-time audio visualization.",
        tech: "Next.js, Web Audio API, Framer Motion"
    },
    {
        id: 2,
        name: "SecureChat",
        color: "#00cc88",
        description: "End-to-end encrypted messaging platform for privacy-focused users.",
        tech: "React, Socket.io, Node.js"
    },
    {
        id: 3,
        name: "TaskForce",
        color: "#0088ff",
        description: "Gamified project management tool for high-performance teams.",
        tech: "Vue.js, Firebase, Tailwind"
    },
    {
        id: 4,
        name: "PixelArt",
        color: "#ffcc00",
        description: "Browser-based 8-bit art studio with export functionality.",
        tech: "HTML5 Canvas, Vanilla JS"
    },
];

export default function IFruitSection() {
    const [activeApp, setActiveApp] = useState(APPS[0]);

    return (
        <section className="relative w-full bg-white text-black py-20">
            <div className="max-w-7xl mx-auto px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-10">

                {/* Left Column: Scrollable Content */}
                <div className="flex flex-col gap-20 py-20">
                    <h2 className="font-display text-8xl mb-10 text-vice-blue">iFRUIT STORE</h2>

                    {APPS.map((app) => (
                        <motion.div
                            key={app.id}
                            className="min-h-[50vh] flex flex-col justify-center cursor-pointer p-8 rounded-2xl transition-colors hover:bg-neutral-100"
                            onViewportEnter={() => setActiveApp(app)}
                            viewport={{ amount: 0.5, margin: "-20% 0px -20% 0px" }}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-16 h-16 rounded-2xl shadow-lg" style={{ backgroundColor: app.color }}></div>
                                <h3 className="font-display text-4xl">{app.name}</h3>
                            </div>
                            <p className="font-sans text-xl text-neutral-600 mb-4">{app.description}</p>
                            <div className="font-mono text-sm text-neutral-400 border-t pt-4 border-neutral-300">
                                TECH: {app.tech}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Right Column: Sticky Phone */}
                <div className="sticky top-0 h-screen flex items-center justify-center">
                    <div className="w-full h-[80vh] relative">
                        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                            <ambientLight intensity={1} />
                            <Environment preset="studio" />

                            <Phone3D appColor={activeApp.color} appName={activeApp.name} />

                            <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
                        </Canvas>

                        {/* Decorative Circle behind phone */}
                        <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full -z-10 blur-3xl opacity-30 transition-colors duration-500"
                            style={{ backgroundColor: activeApp.color }}
                        ></div>
                    </div>
                </div>

            </div>
        </section>
    );
}
