'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ShootingStar = ({ position, speed, delay, color }) => {
    const mesh = useRef();
    const trail = useRef();

    // Random starting offset to make them appear natural
    const initialOffset = useMemo(() => Math.random() * 10, []);

    // Track animation state
    const state = useRef({
        distance: 0,
        active: false,
        startTime: 0,
        currDelay: delay + Math.random() * 5 // Add random variation to initial delay
    });

    useFrame((stateContext, delta) => {
        if (!mesh.current || !trail.current) return;

        const time = stateContext.clock.getElapsedTime();

        // Check if we should activate the star
        if (!state.current.active) {
            if (time > state.current.startTime + state.current.currDelay) {
                state.current.active = true;
                state.current.startTime = time;
                // Reset position to start
                mesh.current.position.set(position[0], position[1], position[2]);
                trail.current.visible = true;
                mesh.current.visible = true;
                state.current.distance = 0;
            } else {
                mesh.current.visible = false;
                trail.current.visible = false;
                return;
            }
        }

        // Move star diagonally (top-right to bottom-left)
        // Adjust these vectors to change direction
        const moveX = -speed * delta * 15; // Move left
        const moveY = -speed * delta * 10; // Move down

        mesh.current.position.x += moveX;
        mesh.current.position.y += moveY;

        // Update state distance
        state.current.distance += Math.abs(moveX);

        // Trail logic
        // Trail follows the head but stretches out
        trail.current.position.copy(mesh.current.position);
        // Offset trail slightly behind and up/right to look like it's dragging
        trail.current.position.x += 0.5;
        trail.current.position.y += 0.3;

        // Fade out logic
        const lifeTime = 2.5; // seconds
        const age = time - state.current.startTime;

        let opacity = 1;

        // Fade in
        if (age < 0.2) {
            opacity = age / 0.2;
        }
        // Fade out
        else if (age > lifeTime - 0.5) {
            opacity = (lifeTime - age) / 0.5;
        }
        else if (age > lifeTime) {
            // Reset
            state.current.active = false;
            state.current.startTime = time;
            state.current.currDelay = Math.random() * 5 + 2; // Random delay before next show
            opacity = 0;
        }

        // Apply opacity
        if (mesh.current.material) {
            mesh.current.material.opacity = opacity;
        }
        if (trail.current.material) {
            trail.current.material.opacity = opacity;
        }
    });

    return (
        <group>
            {/* The glowing head of the meteor */}
            <mesh ref={mesh} visible={false}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshBasicMaterial
                    color="#ffffff"
                    transparent
                    toneMapped={false}
                />
            </mesh>

            {/* The trailing tail */}
            <mesh ref={trail} rotation={[0, 0, Math.PI / 4]} visible={false}>
                <planeGeometry args={[2, 0.1]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0}
                    side={THREE.DoubleSide}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>
        </group>
    );
};

const ShootingStars = ({ count = 5 }) => {
    const stars = useMemo(() => {
        return new Array(count).fill(0).map(() => {
            // Random starting positions in top right quadrant area but broadly distributed
            const x = Math.random() * 20 - 5;
            const y = Math.random() * 10 + 5;
            const z = Math.random() * 10 - 20; // Depth

            return {
                position: [x, y, z],
                speed: 0.3 + Math.random() * 0.5,
                delay: Math.random() * 5,
                color: '#22d3ee' // Cyan
            };
        });
    }, [count]);

    return (
        <group>
            {stars.map((props, i) => (
                <ShootingStar key={i} {...props} />
            ))}
        </group>
    );
};

export default ShootingStars;
