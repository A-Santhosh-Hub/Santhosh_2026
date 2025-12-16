"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface MissionFileProps {
    title: string;
    role: string;
    image?: string;
    status?: string;
}

export default function MissionFile({ title, role, status = "CONFIDENTIAL" }: MissionFileProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const stampRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Hover Interaction using GSAP
        const tl = gsap.timeline({ paused: true });

        tl.to(stampRef.current, {
            opacity: 1,
            scale: 1,
            rotation: -15,
            duration: 0.2,
            ease: "back.out(1.7)"
        });

        const el = containerRef.current;
        if (el) {
            el.addEventListener("mouseenter", () => tl.play());
            el.addEventListener("mouseleave", () => tl.reverse());
        }

        // Cleanup
        return () => {
            if (el) {
                el.removeEventListener("mouseenter", () => tl.play());
                el.removeEventListener("mouseleave", () => tl.reverse());
            }
        };
    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className="relative w-full h-64 bg-[#f4e4bc] text-black p-4 shadow-xl cursor-pointer overflow-hidden transform transition-transform hover:-translate-y-2 hover:rotate-1"
            style={{
                clipPath: "polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)" // Folder cutout
            }}
        >
            <div className="border-b-2 border-black/20 pb-2 mb-4 flex justify-between items-center">
                <span className="font-mono text-xs tracking-widest opacity-60">CASE FILE: #2024-X</span>
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            </div>

            <h3 className="font-display font-bold text-3xl uppercase leading-none mb-2">{title}</h3>
            <p className="font-mono text-sm text-neutral-600 mb-4">{role}</p>

            <div className="absolute bottom-4 right-4">
                <button className="bg-black text-[#f4e4bc] px-3 py-1 font-bold text-xs hover:bg-vice-pink hover:text-white transition-colors">
                    OPEN DOSSIER
                </button>
            </div>

            {/* Secret Stamp */}
            <div
                ref={stampRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-red-600 text-red-600 font-black text-4xl p-2 opacity-0 scale-150 rotate-12 pointer-events-none z-10"
                style={{ mixBlendMode: "multiply" }}
            >
                {status}
            </div>
        </div>
    );
}
