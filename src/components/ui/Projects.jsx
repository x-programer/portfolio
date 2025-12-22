"use client";
import { useState } from "react";
import { projects } from "@/lib/projects";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";

export default function Projects() {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-16 pointer-events-auto"
            >
                <h2 className="text-[var(--color-glow)] font-mono mb-2 text-sm uppercase tracking-widest">Explorations</h2>
                <h3 className="text-4xl md:text-5xl font-bold" style={{ color: 'var(--foreground)' }}>Featured Projects..</h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pointer-events-auto">
                {projects.map((project, index) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        index={index}
                        hoveredIndex={hoveredIndex}
                        setHoveredIndex={setHoveredIndex}
                    />
                ))}
            </div>
        </section>
    );
}
