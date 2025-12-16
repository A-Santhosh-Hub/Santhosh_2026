"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const SKILLS = [
    { name: "FRONTEND ARCHITECTURE", level: 70, color: "bg-vice-yellow" },
    { name: "UI/UX DESIGN", level: 90, color: "bg-vice-pink" },
    { name: "3D MOTION", level: 60, color: "bg-vice-blue" },
    { name: "BACKEND LOGIC", level: 50, color: "bg-vice-purple" },
];

export default function DeveloperProfile() {
    return (
        <section className="relative w-full min-h-screen bg-black flex items-center justify-center overflow-hidden py-20">

            {/* Background Ambience */}
            <div className="absolute inset-0 bg-vice-midnight opacity-90 z-0"></div>
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-vice-pink/10 to-transparent z-0"></div>

            <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* Left Column: The Boss Image (GTA Loading Screen Style) */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative group"
                >
                    {/* Image Frame/Border */}
                    <div className="absolute inset-0 border-4 border-white/20 transform translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform"></div>

                    <div className="relative overflow-hidden aspect-[3/4] md:aspect-[4/5] shadow-2xl">
                        <Image
                            src="/developer.jpg"
                            alt="Santhosh A - Level 50 Boss"
                            fill
                            className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Overlay Gradient for Text Readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                        {/* Float Text on Image */}
                        <div className="absolute bottom-6 left-6">
                            <h3 className="font-display text-4xl text-white italic drop-shadow-md">SANTHOSH A.</h3>
                            <p className="font-mono text-vice-yellow text-sm tracking-widest">THE ARCHITECT</p>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column: Stats & CV */}
                <div className="flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h2 className="font-display text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-2">
                            THE DEVELOPER
                        </h2>
                        <div className="inline-block bg-vice-pink px-4 py-1 text-black font-bold font-mono text-lg mb-10 transform -skew-x-12">
                            LEVEL 50 BOSS
                        </div>

                        {/* Skill Bars */}
                        <div className="space-y-8 mb-12">
                            {SKILLS.map((skill, index) => (
                                <div key={skill.name} className="relative">
                                    <div className="flex justify-between text-sm font-mono text-white/80 mb-2 tracking-widest">
                                        <span>{skill.name}</span>
                                        <span>{skill.level}%</span>
                                    </div>
                                    <div className="h-4 w-full bg-white/10 skew-x-[-20deg] overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.level}%` }}
                                            transition={{ duration: 1.5, delay: 0.5 + (index * 0.1), ease: "easeOut" }}
                                            className={`h-full ${skill.color} shadow-[0_0_10px_currentColor]`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CV Download Button */}
                        <a
                            href="https://drive.google.com/file/d/1-WJvB9BNcUAMAmekURjG6_zr5PqI964x/view"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block"
                        >
                            <button className="group relative px-8 py-4 bg-white text-black font-display text-2xl tracking-widest overflow-hidden hover:bg-vice-yellow transition-colors duration-300">
                                <span className="relative z-10 flex items-center gap-2">
                                    DOWNLOAD CV
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 group-hover:translate-y-1 transition-transform"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                                </span>
                            </button>
                            <div className="mt-2 text-xs font-mono text-white/40">
                                [ CLASSIFIED DOCUMENT ]
                            </div>
                        </a>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
