"use client";

import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF, Html, Preload } from "@react-three/drei";

function Model({ path }: { path: string }) {
    const { scene } = useGLTF(path);
    // Auto-center and reuse scene
    return <primitive object={scene} />;
}

function Loader() {
    return (
        <Html center>
            <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-2 border-vice-pink border-t-white rounded-full animate-spin"></div>
                <div className="font-mono text-vice-pink text-xs animate-pulse">LOADING_ASSET</div>
            </div>
        </Html>
    );
}

export default function AssetViewerExperience({
    modelPath,
    autoRotate = true,
    environment = "city"
}: {
    modelPath: string;
    autoRotate?: boolean;
    environment?: "city" | "studio" | "sunset" | "dawn" | "night";
}) {

    // Preload all assets to make switching instant
    useEffect(() => {
        useGLTF.preload("/car1.glb");
        useGLTF.preload("/charger.glb");
        useGLTF.preload("/Digtool.glb");
        useGLTF.preload("/2022.glb");
    }, []);

    return (
        <div className="w-full h-full touch-none">
            <Canvas shadows dpr={[1, 1.5]} camera={{ fov: 50 }}>
                {/* 
                  Stage: The ultimate helper for model viewers.
                */}
                <Suspense fallback={<Loader />}>
                    <Stage
                        environment={environment}
                        intensity={environment === "studio" ? 1 : 0.5}
                        // Fix: contactShadow expects a boolean or config object, usually strict boolean in Typescript for some props
                        contactShadow={{ opacity: 0.5, blur: 2, resolution: 1024 }}
                    >
                        <Model path={modelPath} />
                    </Stage>
                </Suspense>

                <OrbitControls
                    makeDefault
                    autoRotate={autoRotate}
                    autoRotateSpeed={1}
                    minPolarAngle={0}
                    maxPolarAngle={Math.PI / 1.8}
                    enableZoom={true}
                    enablePan={false}
                />

                {/* Extra Light for Studio Mode */}
                {environment === "studio" && <ambientLight intensity={0.5} />}

                <Preload all />
            </Canvas>
        </div>
    );
}
