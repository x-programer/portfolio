'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SpaceDust = ({ count = 1000 }) => {
    const points = useRef();

    // Define theme colors
    const colors = useMemo(() => [
        new THREE.Color('#a855f7'), // Purple
        new THREE.Color('#22d3ee'), // Cyan
        new THREE.Color('#ec4899'), // Pink
        new THREE.Color('#ffffff')  // White
    ], []);

    const { positions, colorValues, sizes, phases } = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const cols = new Float32Array(count * 3);
        const sz = new Float32Array(count);
        const ph = new Float32Array(count); // Store phase for individual twinkling

        for (let i = 0; i < count; i++) {
            // Random position in a sphere roughly
            const r = Math.random() * 25 + 10; // Distance from center
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos(2 * Math.random() - 1);

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            pos[i * 3] = x;
            pos[i * 3 + 1] = y;
            pos[i * 3 + 2] = z;

            // Random color from palette
            const color = colors[Math.floor(Math.random() * colors.length)];
            cols[i * 3] = color.r;
            cols[i * 3 + 1] = color.g;
            cols[i * 3 + 2] = color.b;

            // Random size
            sz[i] = Math.random() * 2; // Base size multiplier

            // Random phase for twinkling
            ph[i] = Math.random() * Math.PI * 2;
        }

        return {
            positions: pos,
            colorValues: cols,
            sizes: sz,
            phases: ph
        };
    }, [count, colors]);

    useFrame((state) => {
        if (!points.current) return;

        const time = state.clock.getElapsedTime();

        // Group rotation
        points.current.rotation.y = time * 0.02;
        points.current.rotation.x = Math.sin(time * 0.1) * 0.05;

        // Pulse sizes for twinkling effect
        // We access the geometry attributes directly
        const sizesAttribute = points.current.geometry.attributes.size;

        if (sizesAttribute) {
            for (let i = 0; i < count; i++) {
                // Use the stored phase + time to create oscillation
                // Base size 0.05, fluctuating up to 0.1
                const pulses = Math.sin(time * 2 + phases[i]) + 1; // 0 to 2
                sizesAttribute.array[i] = (sizes[i] * 0.05) * (0.5 + 0.5 * pulses);
            }
            sizesAttribute.needsUpdate = true;
        }
    });

    return (
        <points key={count} ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={colorValues.length / 3}
                    array={colorValues}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-size"
                    count={sizes.length}
                    array={sizes} // Initial placeholder, will be updated
                    itemSize={1}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.1}
                vertexColors
                transparent
                opacity={0.6}
                sizeAttenuation={true}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
};

export default SpaceDust;
