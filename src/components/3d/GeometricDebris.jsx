'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const geometries = [
    'tetrahedron',
    'octahedron',
    'icosahedron',
    'box'
];

const colors = [
    '#a855f7', // Purple
    '#22d3ee', // Cyan
    '#ec4899', // Pink
    '#10b981'  // Green
];

const DebrisPiece = ({ type, position, color, speed, rotationSpeed, scale }) => {
    const mesh = useRef();

    // Random offset for sine wave calculation
    const offset = useMemo(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        z: Math.random() * 100
    }), []);

    useFrame((state) => {
        if (!mesh.current) return;

        const time = state.clock.getElapsedTime();

        // Rotation
        mesh.current.rotation.x += rotationSpeed.x * 0.01;
        mesh.current.rotation.y += rotationSpeed.y * 0.01;
        mesh.current.rotation.z += rotationSpeed.z * 0.01;

        // Floating motion
        // Calculate new position based on initial position + sine wave offset
        mesh.current.position.y = position[1] + Math.sin(time * speed + offset.y) * 0.5;
        mesh.current.position.x = position[0] + Math.sin(time * speed * 0.5 + offset.x) * 0.3;
        mesh.current.position.z = position[2] + Math.sin(time * speed * 0.3 + offset.z) * 0.3;
    });

    const GeometryComponent = () => {
        switch (type) {
            case 'tetrahedron': return <tetrahedronGeometry args={[scale, 0]} />;
            case 'octahedron': return <octahedronGeometry args={[scale, 0]} />;
            case 'icosahedron': return <icosahedronGeometry args={[scale, 0]} />;
            case 'box': return <boxGeometry args={[scale, scale, scale]} />;
            default: return <boxGeometry args={[scale, scale, scale]} />;
        }
    };

    return (
        <mesh ref={mesh} position={position}>
            <GeometryComponent />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.5}
                wireframe={true}
                transparent
                opacity={0.6}
                roughness={0.1}
                metalness={0.8}
            />
        </mesh>
    );
};

const GeometricDebris = ({ count = 20 }) => {
    const debris = useMemo(() => {
        return new Array(count).fill(0).map(() => {
            // Spread them out in a large area
            const x = (Math.random() - 0.5) * 30;
            const y = (Math.random() - 0.5) * 20;
            const z = (Math.random() - 0.5) * 10 - 5; // Mostly somewhat in background

            return {
                type: geometries[Math.floor(Math.random() * geometries.length)],
                position: [x, y, z],
                color: colors[Math.floor(Math.random() * colors.length)],
                speed: 0.1 + Math.random() * 0.3,
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 2,
                    y: (Math.random() - 0.5) * 2,
                    z: (Math.random() - 0.5) * 2
                },
                scale: 0.2 + Math.random() * 0.3
            };
        });
    }, [count]);

    return (
        <group>
            {debris.map((props, i) => (
                <DebrisPiece key={i} {...props} />
            ))}
        </group>
    );
};

export default GeometricDebris;
