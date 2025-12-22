"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import StarField from "./Stars";
import SpaceDust from "./SpaceDust";
import GeometricDebris from "./GeometricDebris";
import ShootingStars from "./ShootingStars";
import Planet from "./Planet";

export default function Scene3D({ isMobile = false }) {
    return (
        <Canvas
            camera={{ position: [0, 0, 15], fov: 50 }}
            gl={{ alpha: true, antialias: true }}
            dpr={[1, 2]}
        >
            <Suspense fallback={null}>
                {/* Enhanced lighting */}
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#22d3ee" />
                <pointLight position={[-10, -10, -5]} intensity={1} color="#a855f7" />

                {/* All 3D Background Components */}
                <StarField />
                <SpaceDust count={isMobile ? 500 : 1000} />
                {!isMobile && <GeometricDebris count={20} />}
                <ShootingStars count={5} />
                <Planet />
            </Suspense>
        </Canvas>
    );
}
