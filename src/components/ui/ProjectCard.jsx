"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ProjectCard({ project, index, hoveredIndex, setHoveredIndex }) {
    const ref = useRef(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const isHovered = hoveredIndex === index;
    const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;
    const targetScale = isHovered ? 1.15 : (isOtherHovered ? 0.95 : 1);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate rotation (-10 to 10 degrees)
        const midX = rect.width / 2;
        const midY = rect.height / 2;

        const rotX = ((y - midY) / midY) * -10;
        const rotY = ((x - midX) / midX) * 10;

        setRotateX(rotX);
        setRotateY(rotY);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            animate={{
                scale: targetScale,
                opacity: 1, // ensure visibility persists
                y: 0
            }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                opacity: { duration: 0.5, delay: index * 0.1 }, // Separate delay for entrance
                y: { duration: 0.5, delay: index * 0.1 }
            }}
            viewport={{ once: true }}
            style={{
                transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                pointerEvents: 'auto'
            }}
            className="glass rounded-xl p-5 h-full cursor-pointer hover:border-[var(--color-glow)]/50 transition-colors group relative overflow-hidden flex flex-col will-change-transform"
        >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-glow)]/10 to-[var(--color-cosmic)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full">
                <div className="h-40 w-full rounded-lg mb-4 overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-500" style={{ backgroundColor: 'var(--glass-heavy-bg)' }}>
                    {/* Project Image */}
                    {project.image ? (
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[var(--color-nebula)] to-[var(--color-cosmic)] flex items-center justify-center text-3xl font-bold" style={{ color: 'rgba(255,255,255,0.2)' }}>
                            {project.title[0]}
                        </div>
                    )}
                </div>

                <h3 className="text-lg font-bold mb-1 group-hover:text-[var(--color-glow)] transition-colors" style={{ color: 'var(--foreground)' }}>{project.title}</h3>
                <p className="mb-4 text-sm line-clamp-3 leading-relaxed" style={{ color: 'var(--foreground)', opacity: 0.6 }}>{project.description}</p>

                <div className="flex flex-wrap gap-2 mt-auto mb-4">
                    {project.tags.map(tag => (
                        <span
                            key={tag}
                            className="tech-tag text-[11px] font-mono px-2.5 py-1 rounded-md border-2 font-semibold transition-all hover:scale-105"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <style jsx>{`
                    .tech-tag {
                        background-color: rgba(168, 85, 247, 0.15);
                        border-color: var(--color-glow);
                        color: var(--color-glow);
                        box-shadow: 0 0 10px rgba(168, 85, 247, 0.2);
                    }
                    
                    :global(.light) .tech-tag {
                        background-color: rgba(0, 0, 0, 0.05);
                        border-color: rgba(0, 0, 0, 0.3);
                        color: rgba(0, 0, 0, 0.85);
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
                        backdrop-filter: blur(5px);
                        -webkit-backdrop-filter: blur(5px);
                    }
                    
                    :global(.light) .tech-tag:hover {
                        background-color: rgba(0, 0, 0, 0.08);
                        border-color: rgba(0, 0, 0, 0.5);
                    }
                `}</style>

                <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-flex items-center justify-center w-full px-4 py-3 text-sm font-bold transition-all rounded-xl overflow-hidden group/btn"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-pink-500/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />

                    {/* Liquid shimmer effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        animate={{
                            x: ['-200%', '200%']
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                            repeatDelay: 2
                        }}
                    />

                    {/* Glassmorphic border and background */}
                    <div
                        className="absolute inset-0 rounded-xl border-2 transition-all duration-300 group-hover/btn:border-[var(--color-glow)]/50"
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.03)',
                            borderColor: 'var(--glass-border)',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)'
                        }}
                    />

                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 rounded-xl blur-md bg-gradient-to-r from-purple-500/30 via-cyan-500/30 to-pink-500/30" style={{ zIndex: -1 }} />

                    {/* Button text */}
                    <span className="relative z-10 flex items-center gap-2 font-semibold tracking-wide transition-all duration-300 group-hover/btn:gap-3" style={{ color: 'var(--foreground)', textShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
                        <span>View Project</span>
                        <motion.span
                            animate={{
                                rotate: [0, 15, 0],
                                x: [0, 3, 0]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            ↗
                        </motion.span>
                    </span>
                </a>
            </div>
        </motion.div>
    );
}
