"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import StarField from "./Stars";
import Planet from "./Planet";
import ShootingStars from "./ShootingStars";
import SpaceDust from "./SpaceDust";
import GeometricDebris from "./GeometricDebris";
import { Suspense, useRef } from "react";
import * as THREE from 'three';

function SceneContent() {
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            // Subtle parallax responding to mouse pointer
            // state.pointer.x goes from -1 to 1
            const x = state.pointer.x * 0.2;
            const y = state.pointer.y * 0.2;

            // Smoothly interpolate rotation
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x, 0.05);
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y, 0.05);
        }
    });

    return (
        <group ref={groupRef}>
            <StarField />
            <Planet />
            <ShootingStars count={5} />
            <SpaceDust count={800} />
            <GeometricDebris count={15} />
        </group>
    );
}

export default function Background3D() {
    return (
        <div className="fixed inset-0 z-[-1] bg-[var(--color-void)]">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]} // Support high-DPI displays
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={0.2} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} color="#22d3ee" />
                    <pointLight position={[-10, -10, -5]} intensity={1} color="#6b21a8" />
                    <SceneContent />
                </Suspense>
            </Canvas>
        </div>
    );
}
