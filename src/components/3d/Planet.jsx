"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function Planet() {
    const outerRef = useRef();
    const innerRef = useRef();
    const groupRef = useRef();

    // State for interaction
    const [hovered, setHovered] = useState(false);
    const [dragging, setDragging] = useState(false);

    // Access viewport for 1:1 coordinate mapping
    const { viewport } = useThree();

    // Cursor management
    useEffect(() => {
        if (dragging) {
            document.body.style.cursor = "grabbing";
        } else if (hovered) {
            document.body.style.cursor = "grab";
        } else {
            document.body.style.cursor = "auto";
        }

        return () => {
            document.body.style.cursor = "auto";
        };
    }, [hovered, dragging]);

    // Physics state
    const targetPosition = useRef(new THREE.Vector3(0, 0, 0));

    useFrame((state, delta) => {
        // Continuous Rotation
        if (outerRef.current) {
            outerRef.current.rotation.y += delta * 0.1;
            outerRef.current.rotation.x += delta * 0.05;
        }
        if (innerRef.current) {
            innerRef.current.rotation.y -= delta * 0.2;
            innerRef.current.rotation.z += delta * 0.1;
        }

        if (groupRef.current) {
            if (dragging) {
                // Map 2D pointer to 3D Viewport coordinates
                const x = (state.pointer.x * viewport.width) / 2;
                const y = (state.pointer.y * viewport.height) / 2;

                // Update target anchor
                targetPosition.current.set(x, y, 0);

                // Smooth Drag Responsiveness
                groupRef.current.position.lerp(targetPosition.current, 0.2);
            } else {
                // Antigravity Float
                const t = state.clock.getElapsedTime();
                const floatOffset = Math.sin(t) * 0.2; // 0.2 unit drift

                // Float around the last target position
                // We construct a temporary vector for the floating target
                const floatTarget = new THREE.Vector3(
                    targetPosition.current.x,
                    targetPosition.current.y + floatOffset,
                    0
                );

                groupRef.current.position.lerp(floatTarget, 0.05);
            }

            // Interaction Feedback (Scale)
            const targetScale = dragging ? 1.1 : (hovered ? 1.05 : 1);
            groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        }
    });

    return (
        <group
            ref={groupRef}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerDown={(e) => {
                e.stopPropagation(); // Prevent grabbing background
                setDragging(true);
            }}
            onPointerUp={(e) => {
                e.stopPropagation();
                setDragging(false);
            }}
        // Catch pointer moves is handled globally via state.pointer in useFrame,
        // but capturing the up event globally is safer. 
        // R3F usually handles capture on the element, so onPointerUp works even if mouse leaves element.
        >
            {/* Outer Wireframe Shield */}
            <mesh ref={outerRef} scale={2}>
                <icosahedronGeometry args={[1, 2]} />
                <meshStandardMaterial
                    color="#a855f7" // Brighter purple (Tailwind purple-500)
                    wireframe
                    transparent
                    opacity={dragging ? 0.8 : 0.5}
                    emissive="#a855f7"
                    emissiveIntensity={dragging ? 2 : 1}
                />
            </mesh>

            {/* Inner Glowing Core */}
            <mesh ref={innerRef} scale={1.2}>
                <icosahedronGeometry args={[1, 0]} />
                <meshStandardMaterial
                    color="#1e3a8a"
                    emissive={dragging ? "#ffffff" : "#22d3ee"} // flash white hot when dragging
                    emissiveIntensity={dragging ? 3 : 2}
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>
        </group>
    );
}
