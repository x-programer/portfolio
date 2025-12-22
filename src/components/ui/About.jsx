"use client";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";

// NEW: Skills with proficiency data
const skillsData = [
    { name: "JavaScript (ES6+)", level: 90, years: "2+ Years" },
    { name: "TypeScript", level: 85, years: " Years" },
    { name: "React", level: 95, years: "2 Years" },
    { name: "Next.js", level: 90, years: "2 Years" },
    { name: "Node.js", level: 80, years: "2 Years" },
    { name: "Three.js", level: 80, years: "0.6 Years" },
    { name: "React Three Fiber", level: 80, years: "0.6 Years" },
    { name: "Tailwind CSS", level: 95, years: "1.5 Years" },
    { name: "Firebase", level: 65, years: "0.6 Years" },
    { name: "Express.js", level: 80, years: "1.5 Years" },
    { name: "MongoDB", level: 80, years: "1.5 Years" }
];

// NEW: Floating Tech Icons component
const TechIcons = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const icons = ["⚛️", "🐍", "📦", "⚡", "🎨", "🤖"];
    if (!mounted) return null;

    return (
        <div className="absolute inset-0 pointer-events-none hidden md:block">
            {icons.map((icon, i) => (
                <motion.div
                    key={i}
                    className="absolute text-2xl opacity-30 select-none"
                    initial={{
                        x: Math.random() * 400 - 200,
                        y: Math.random() * 400 - 200,
                    }}
                    animate={{
                        y: [0, -20, 0],
                        x: [0, 15, 0],
                        rotate: [0, 10, -10, 0],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 4 + Math.random() * 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.5
                    }}
                    style={{
                        left: `${10 + (i * 15)}%`,
                        top: `${Math.random() * 80}%`,
                    }}
                >
                    {icon}
                </motion.div>
            ))}
        </div>
    );
};

// NEW: Skill Tag with Tooltip
const SkillTag = ({ skill, index, isOverPlanet }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="relative">
            <motion.span
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                variants={{
                    initial: { opacity: 0, y: 10, scale: 0.8 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: { delay: index * 0.05 }
                    }
                }}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(107, 33, 168, 0.2)", borderColor: "var(--color-glow)" }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1.5 rounded-full border text-sm cursor-help transition-colors backdrop-blur-sm inline-block"
                style={{
                    backgroundColor: 'var(--glass-bg)',
                    borderColor: isOverPlanet ? 'rgba(0,0,0,0.2)' : 'var(--glass-border)',
                    color: isOverPlanet ? '#000000' : 'var(--foreground)',
                    opacity: 0.9
                }}
            >
                {skill.name}
            </motion.span>

            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 5, scale: 0.9 }}
                        animate={{ opacity: 1, y: -45, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.9 }}
                        className="absolute left-1/2 -translate-x-1/2 z-50 min-w-[150px] p-3 rounded-xl glass-heavy border border-white/10 text-xs pointer-events-none"
                    >
                        <div className="flex justify-between mb-2">
                            <span className="font-bold">{skill.name}</span>
                            <span className="opacity-60">{skill.years}</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="h-full"
                                style={{
                                    background: skill.level > 80 ? '#ec4899' : skill.level > 50 ? '#a855f7' : '#22d3ee'
                                }}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function About() {
    // Antigravity Scroll Logic
    const cardRef = useRef(null);
    const [isOverPlanet, setIsOverPlanet] = useState(false);

    // NEW: 3D Tilt State
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // NEW: Experience Counter Logic
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = 3;
            const duration = 2000;
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);
            return () => clearInterval(timer);
        }
    }, [isInView]);

    // NEW: Parallax Logic
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Disable parallax on mobile
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    const leftParallax = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : -50]);
    const rightParallax = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : 50]);

    useEffect(() => {
        const handleScroll = () => {
            const isDarkMode = !document.documentElement.classList.contains("light");

            if (isMobile && isDarkMode && cardRef.current) {
                const rect = cardRef.current.getBoundingClientRect();
                const viewportCenter = window.innerHeight / 2;

                const isOver = rect.top < (viewportCenter + 100) && rect.bottom > (viewportCenter - 100);
                setIsOverPlanet(isOver);
            } else {
                setIsOverPlanet(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isMobile]);

    // NEW: Mouse handlers for Tilt and Spotlight
    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;

        // Tilt calculation (max 10 degrees)
        const tiltX = (y - 0.5) * -10;
        const tiltY = (x - 0.5) * 10;

        setTilt({ x: tiltX, y: tiltY });
        setMousePos({ x: x * 100, y: y * 100 });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
    };

    return (
        <section id="about" ref={sectionRef} className="py-24 px-6 md:px-12 max-w-7xl mx-auto overflow-visible relative">
            {/* NEW: Background Decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="grid md:grid-cols-2 gap-16 items-center">
                <motion.div
                    style={{ y: leftParallax }}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="pointer-events-auto"
                >
                    <h2 className="text-[var(--color-glow)] font-mono mb-2 text-sm uppercase tracking-widest">About Me</h2>

                    {/* NEW: Experience Counter */}
                    <div className="flex items-center gap-4 mb-4">
                        <div className="text-5xl font-bold text-[var(--color-glow)]">
                            {count}+
                        </div>
                        <div className="text-sm uppercase tracking-tighter opacity-60">
                            Years of<br />Digital Crafting
                        </div>
                    </div>

                    <h3 className="text-4xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>Navigating the digital void.</h3>
                    <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                        I'm a Full-Stack developer with a passion for building intelligent systems and immersive web experiences.
                        My journey began with a curiosity about how website works, which led me to explore the depths of computer science and the heights of interactive web design.
                    </p>
                    <p className="text-lg leading-relaxed" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                        When I'm not coding, you can find me exploring new technologies, and AI tools or gazing at the actual stars.
                    </p>
                </motion.div>

                <div className="relative perspective-1000">
                    {/* NEW: Floating Tech Icons */}
                    <TechIcons />

                    <motion.div
                        ref={cardRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            y: rightParallax,
                            rotateX: tilt.x,
                            rotateY: tilt.y,
                            transition: 'transform 0.1s ease-out',
                            boxShadow: `${(tilt.y) * -2}px ${(tilt.x) * 2}px 30px rgba(0,0,0,0.3)`
                        }}
                        initial="initial"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="relative z-10 p-8 rounded-2xl pointer-events-auto bg-white/10 backdrop-blur-md border border-white/10 shadow-2xl overflow-hidden group"
                    >
                        {/* NEW: Cursor Glow Spotlight */}
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                            style={{
                                background: `radial-gradient(circle 200px at ${mousePos.x}% ${mousePos.y}%, rgba(168, 85, 247, 0.15), transparent)`
                            }}
                        />

                        {/* Animated Border Overlay */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl">
                            <motion.rect
                                width="100%"
                                height="100%"
                                rx="16"
                                ry="16"
                                fill="none"
                                stroke="#a855f7"
                                strokeWidth="2"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{
                                    pathLength: 1,
                                    opacity: 1,
                                    transition: { duration: 1.5, ease: "easeInOut", delay: 0.5 }
                                }}
                                style={{ filter: "drop-shadow(0 0 8px #a855f7)" }}
                            />
                        </svg>

                        <h4 className="text-xl font-bold mb-6 transition-colors duration-300" style={{ color: isOverPlanet ? '#000000' : 'var(--foreground)' }}>Technical Arsenal</h4>

                        {/* Updated Skill Mapping with Stagger and Tooltips */}
                        <motion.div
                            initial="initial"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="flex flex-wrap gap-3"
                        >
                            {skillsData.map((skill, i) => (
                                <SkillTag
                                    key={skill.name}
                                    skill={skill}
                                    index={i}
                                    isOverPlanet={isOverPlanet}
                                />
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            <style jsx>{`
                .perspective-1000 {
                    perspective: 1000px;
                }
            `}</style>
        </section>
    );
}

