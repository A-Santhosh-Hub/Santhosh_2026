"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Html } from "@react-three/drei";
import * as THREE from "three";

interface Phone3DProps {
    appColor: string;
    appName: string;
}

export default function Phone3D({ appColor, appName }: Phone3DProps) {
    const phoneRef = useRef<THREE.Group>(null);
    const screenRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (phoneRef.current) {
            // Gentle Floating Animation
            const t = state.clock.getElapsedTime();
            phoneRef.current.position.y = Math.sin(t * 1) * 0.1;
            phoneRef.current.rotation.x = Math.sin(t * 0.5) * 0.05;
            phoneRef.current.rotation.y = Math.sin(t * 0.3) * 0.1;
        }
    });

    return (
        <group ref={phoneRef}>
            {/* Phone Body (Black Glass/Metal) */}
            <RoundedBox args={[2.5, 5, 0.3]} radius={0.2} smoothness={4}>
                <meshStandardMaterial color="#101010" metalness={0.9} roughness={0.1} />
            </RoundedBox>

            {/* Screen (Changing Content) */}
            <RoundedBox args={[2.3, 4.8, 0.01]} radius={0.1} smoothness={4} position={[0, 0, 0.16]}>
                <meshStandardMaterial
                    color={appColor}
                    emissive={appColor}
                    emissiveIntensity={0.5}
                    roughness={0.2}
                    metalness={0.1}
                />

                {/* HTML Overlay on Screen */}
                <Html transform position={[0, 0, 0.01]} scale={0.5} pointerEvents="none">
                    <div className="flex items-center justify-center w-64 h-96 select-none">
                        <h3 className="font-display text-4xl text-white drop-shadow-lg text-center leading-none">
                            {appName}
                        </h3>
                    </div>
                </Html>
            </RoundedBox>

            {/* Home Button / Dynamic Island Indicator */}
            <mesh position={[0, -2.2, 0.17]}>
                <capsuleGeometry args={[0.05, 0.5, 4, 8]} />
                <meshBasicMaterial color="#333" />
                <mesh rotation={[0, 0, Math.PI / 2]} />
            </mesh>
        </group>
    );
}
