"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [showWelcome, setShowWelcome] = useState(true);
    const [showControls, setShowControls] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);

    const containerRef = useRef<HTMLDivElement>(null);
    const introRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const hintRef = useRef<HTMLDivElement>(null);

    // Audio Refs (For future implementation)
    // const introAudio = useRef<HTMLAudioElement | null>(null);

    // Lock Scroll on Mount
    useEffect(() => {
        if (!isUnlocked) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";

            // 1. Hide Welcome Text after 3s
            const welcomeTimer = setTimeout(() => {
                setShowWelcome(false);
            }, 3000);

            // 2. Show Video Controls after 7s
            const controlsTimer = setTimeout(() => {
                setShowControls(true);
            }, 7000);

            return () => {
                clearTimeout(welcomeTimer);
                clearTimeout(controlsTimer);
            };
        }
    }, [isUnlocked]);

    const toggleVideo = () => {
        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    useGSAP(() => {
        const tl = gsap.timeline();

        // 1. Initial Intro Animation (Locked State)
        if (!isUnlocked) {
            // Pan Background
            gsap.to(".parallax-bg", {
                scale: 1.1,
                xPercent: -5,
                duration: 20,
                ease: "none",
                repeat: -1,
                yoyo: true
            });

            // Post-Load Animation: Reveal Text Letter by Letter
            const letters = titleRef.current?.querySelectorAll(".letter");
            if (letters) {
                tl.fromTo(letters,
                    { opacity: 0, y: 50, filter: "blur(10px)" },
                    {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "power2.out",
                        delay: 0.5
                    }
                )
                    .fromTo(hintRef.current,
                        { opacity: 0 },
                        { opacity: 1, duration: 1, repeat: -1, yoyo: true },
                        "-=0.5"
                    );
            }
        }

    }, { scope: containerRef, dependencies: [isUnlocked] });

    const handleUnlock = () => {
        if (isUnlocked) return;

        // Play Sound
        // introAudio.current?.play();

        const tl = gsap.timeline({
            onComplete: () => setIsUnlocked(true)
        });

        // CUT SCENE: Zoom In -> Flash -> Reveal
        tl.to(titleRef.current, {
            scale: 5,
            opacity: 0,
            duration: 1.5,
            ease: "power4.in",
        })
            .to(introRef.current, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.inOut"
            }, "-=0.5");

        // Ensure video is playing
        if (videoRef.current) {
            videoRef.current.play();
            videoRef.current.muted = false; // Optional: Unmute on entry if desired
        }
    };

    // Split text for animation
    const name = "SANTHOSH";
    const nameLetters = name.split("").map((char, i) => (
        <span key={i} className="letter inline-block">{char}</span>
    ));

    return (
        <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">

            {/* --- INTRO LAYER (LOCKED) --- */}
            {!isUnlocked && (
                <div
                    ref={introRef}
                    onClick={handleUnlock}
                    className="absolute inset-0 z-50 flex flex-col items-center justify-center cursor-pointer overflow-hidden"
                >
                    {/* Parallax Background */}
                    <div
                        className="parallax-bg absolute inset-0 z-0 bg-cover bg-center"
                        style={{ backgroundImage: "url('/vice_city_skyline.png')" }}
                    >
                        {/* Dark Overlay for Text Pop */}
                        <div className="absolute inset-0 bg-black/40"></div>
                    </div>

                    {/* Floating Particles (CSS Animation) */}
                    <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-50 bg-[url('/noise.png')]"></div>

                    {/* Main Title Trigger */}
                    <h1 ref={titleRef} className="relative z-10 font-display font-black text-6xl md:text-9xl text-white tracking-widest drop-shadow-2xl mix-blend-overlay">
                        {nameLetters}
                    </h1>

                    {/* Hint */}
                    <div ref={hintRef} className="absolute bottom-20 z-10 font-mono text-vice-blue text-xs md:text-sm tracking-[0.5em] opacity-0">
                        CLICK TO START
                    </div>
                </div>
            )}

            {/* --- GAMEPLAY LAYER (UNLOCKED) --- */}
            <div className={`fixed-video-container absolute inset-0 z-0 transition-opacity duration-1000 ${isUnlocked ? "opacity-100" : "opacity-0"}`}>
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                >
                    <source src="/santhosh.mp4" type="video/mp4" />
                </video>

                {/* Post-Unlock Hero Content */}
                {isUnlocked && (
                    <>
                        {/* Welcome Text in Center (Hides after 3s) */}
                        <div className={`absolute inset-0 flex items-center justify-center z-10 bg-black/20 transition-opacity duration-1000 ${showWelcome ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                            <h2 className="font-display text-white text-4xl md:text-6xl animate-pulse tracking-tighter">
                                WELCOME TO VICE CITY
                            </h2>
                        </div>

                        {/* Video Controls (Shows after 7s) */}
                        <div className={`absolute bottom-10 right-10 z-20 transition-opacity duration-1000 ${showControls ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                            <button
                                onClick={toggleVideo}
                                className="flex items-center gap-2 px-4 py-2 bg-black/50 border border-white/20 hover:bg-vice-pink/20 hover:border-vice-pink text-white font-mono text-xs tracking-widest transition-all rounded backdrop-blur-md"
                            >
                                <div className={`w-2 h-2 rounded-full ${isPlaying ? "bg-green-500 animate-pulse" : "bg-red-500"}`}></div>
                                {isPlaying ? "PAUSE FEED" : "RESUME FEED"}
                            </button>
                        </div>
                    </>
                )}
            </div>

        </div>
    );
}
