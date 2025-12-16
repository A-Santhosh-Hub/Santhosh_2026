"use client";

import { useEffect, useRef, useState } from "react";

export default function ViceCityEvasion() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);

    // Game State Refs to avoid re-renders during loop
    const gameState = useRef({
        playerX: 0,
        playerSpeed: 5,
        enemies: [] as { x: number; y: number; type: 'police' | 'civilian'; speed: number }[],
        roadOffset: 0,
        gameSpeed: 5,
        score: 0,
        width: 0,
        height: 0,
        laneWidth: 0,
        isGameOver: false,
        animationId: 0
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Resize Handling
        const resize = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
                gameState.current.width = canvas.width;
                gameState.current.height = canvas.height;
                gameState.current.laneWidth = canvas.width / 3; // 3 Lanes

                // Reset player to center if not playing
                if (!gameState.current.isGameOver) {
                    gameState.current.playerX = canvas.width / 2;
                }
            }
        };
        window.addEventListener("resize", resize);
        resize();

        // Input Handling (Mouse & Touch)
        const handleInput = (clientX: number) => {
            if (gameState.current.isGameOver) return;
            const rect = canvas.getBoundingClientRect();
            let x = clientX - rect.left;
            // Clamp to screen
            x = Math.max(30, Math.min(x, gameState.current.width - 30));
            gameState.current.playerX = x;
        };

        const onMouseMove = (e: MouseEvent) => handleInput(e.clientX);
        const onTouchMove = (e: TouchEvent) => {
            e.preventDefault(); // Prevent scrolling
            handleInput(e.touches[0].clientX);
        };

        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("touchmove", onTouchMove, { passive: false });

        // Game Loop
        const loop = () => {
            if (!ctx) return;
            const state = gameState.current;

            if (state.isGameOver) {
                return; // Stop updating
            }

            // Update difficulty
            state.gameSpeed += 0.005;

            // Draw Background (Road)
            ctx.fillStyle = "#111";
            ctx.fillRect(0, 0, state.width, state.height);

            // Draw Moving Grid/Lines
            state.roadOffset = (state.roadOffset + state.gameSpeed) % 40;
            ctx.fillStyle = "#ffffff33";
            const laneW = state.width / 3;

            // Lane lines
            for (let i = 1; i < 3; i++) {
                for (let y = -40; y < state.height; y += 80) {
                    ctx.fillRect(i * laneW - 2, y + state.roadOffset, 4, 30);
                }
            }

            // Spawn Enemies
            if (Math.random() < 0.02) {
                const lane = Math.floor(Math.random() * 3);
                state.enemies.push({
                    x: lane * laneW + laneW / 2,
                    y: -100,
                    type: Math.random() > 0.3 ? 'police' : 'civilian',
                    speed: state.gameSpeed * (Math.random() * 0.5 + 0.8)
                });
            }

            // Draw Player
            ctx.save();
            ctx.translate(state.playerX, state.height - 100);

            // Player Car Body
            ctx.fillStyle = "#fff"; // White Sports Car
            ctx.shadowBlur = 20;
            ctx.shadowColor = "#00ccff";
            ctx.beginPath();
            ctx.roundRect(-20, -40, 40, 80, 5);
            ctx.fill();

            // Windshield
            ctx.fillStyle = "#000";
            ctx.fillRect(-15, -20, 30, 20);

            // Tail Lights (Trails)
            ctx.fillStyle = "#ff0000";
            ctx.fillRect(-18, 35, 10, 5);
            ctx.fillRect(8, 35, 10, 5);

            ctx.restore();

            // Update & Draw Enemies
            for (let i = state.enemies.length - 1; i >= 0; i--) {
                const enemy = state.enemies[i];
                enemy.y += enemy.speed;

                // Draw Enemy
                ctx.save();
                ctx.translate(enemy.x, enemy.y);

                if (enemy.type === 'police') {
                    // Police Car (Black & White)
                    ctx.fillStyle = "#000";
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = Math.random() > 0.5 ? "#ff0000" : "#0000ff"; // Siren
                    ctx.beginPath();
                    ctx.roundRect(-22, -40, 44, 80, 5);
                    ctx.fill();
                    // White doors
                    ctx.fillStyle = "#fff";
                    ctx.fillRect(-22, -10, 44, 40);
                    // Lightbar
                    ctx.fillStyle = Math.random() > 0.5 ? "#ff0000" : "#0000ff";
                    ctx.fillRect(-20, -10, 40, 5);
                } else {
                    // Civilian (Yellow Taxis)
                    ctx.fillStyle = "#fbbf24";
                    ctx.shadowBlur = 0;
                    ctx.beginPath();
                    ctx.roundRect(-20, -40, 40, 80, 5);
                    ctx.fill();
                }
                ctx.restore();

                // Cleanup Offscreen
                if (enemy.y > state.height + 100) {
                    state.enemies.splice(i, 1);
                    state.score += 10;
                    setScore(state.score);
                }

                // Collision Detection
                // Player Rect: [playerX - 20, height - 140, 40, 80]
                // Enemy Rect: [enemy.x - 20, enemy.y - 40, 40, 80]
                if (
                    Math.abs(state.playerX - enemy.x) < 35 && // Width overlap
                    Math.abs((state.height - 100) - enemy.y) < 70 // Height overlap
                ) {
                    gameOver();
                }
            }

            state.animationId = requestAnimationFrame(loop);
        };

        const gameOver = () => {
            gameState.current.isGameOver = true;
            setGameOver(true);
            cancelAnimationFrame(gameState.current.animationId);
        };

        if (gameStarted && !gameState.current.isGameOver) {
            gameState.current.animationId = requestAnimationFrame(loop);
        }

        return () => {
            window.removeEventListener("resize", resize);
            canvas.removeEventListener("mousemove", onMouseMove);
            canvas.removeEventListener("touchmove", onTouchMove);
            cancelAnimationFrame(gameState.current.animationId);
        };
    }, [gameStarted]);

    const handleStart = () => {
        setGameStarted(true);
        setGameOver(false);
        setScore(0);
        // Reset Logic
        gameState.current.enemies = [];
        gameState.current.score = 0;
        gameState.current.gameSpeed = 5;
        gameState.current.isGameOver = false;
        gameState.current.playerX = gameState.current.width / 2;
    };

    return (
        <div className="relative w-full h-[500px] md:h-full bg-black border-2 border-white/20 rounded-lg overflow-hidden group">

            {/* Canvas Layer */}
            <canvas ref={canvasRef} className="block w-full h-full cursor-none touch-none" />

            {/* UI Overlay: HUD */}
            <div className="absolute top-4 left-4 font-display text-white text-2xl italic">
                WANTED LVL: {Math.floor(score / 500) + 1}
            </div>
            <div className="absolute top-4 right-4 font-mono text-vice-blue text-xl">
                SCORE: {score}
            </div>

            {/* UI Overlay: Start Screen */}
            {!gameStarted && !gameOver && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-20">
                    <h2 className="font-display text-5xl text-white italic tracking-tighter mb-4 text-center">
                        VICE CITY EVASION
                    </h2>
                    <p className="text-white/50 font-mono mb-8 text-center max-w-md px-4">
                        MOUSE/TOUCH ORAG TO STEER. <br />
                        AVOID THE COPS to ESCAPE.
                    </p>
                    <button
                        onClick={handleStart}
                        className="px-8 py-3 bg-vice-pink text-white font-black italic text-xl hover:scale-105 transition-transform skew-x-[-10deg]"
                    >
                        START ENGINE
                    </button>
                </div>
            )}

            {/* UI Overlay: Game Over */}
            {gameOver && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/80 backdrop-blur-sm z-20 animate-in fade-in zoom-in duration-300">
                    <h2 className="font-display text-7xl text-white italic tracking-tighter mb-2 drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
                        WASTED
                    </h2>
                    <p className="text-white font-mono mb-8">FINAL SCORE: {score}</p>
                    <button
                        onClick={handleStart}
                        className="px-8 py-3 bg-white text-black font-black italic text-xl hover:bg-gray-200 transition-colors skew-x-[-10deg]"
                    >
                        RETRY MISSION
                    </button>
                </div>
            )}

            {/* Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]"></div>
        </div>
    );
}
