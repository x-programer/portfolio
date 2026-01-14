"use client";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";

// NEW: Helper component for Magnetic Button effect
const MagneticButton = ({ children, className, style, ...props }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        // Calculate distance from center (max 8px movement)
        const moveX = (clientX - centerX) * 0.1;
        const moveY = (clientY - centerY) * 0.1;

        const limitedX = Math.max(Math.min(moveX, 8), -8);
        const limitedY = Math.max(Math.min(moveY, 8), -8);

        setPosition({ x: limitedX, y: limitedY });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const springConfig = { stiffness: 150, damping: 15 };
    const dx = useSpring(position.x, springConfig);
    const dy = useSpring(position.y, springConfig);

    useEffect(() => {
        dx.set(position.x);
        dy.set(position.y);
    }, [position, dx, dy]);

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: dx, y: dy }}
            className="w-full md:w-auto"
        >
            <motion.a {...props} className={className} style={style}>
                {children}
            </motion.a>
        </motion.div>
    );
};

// NEW: Particle background component
const HeroParticles = () => {
    const [mounted, setMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setMounted(true);
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const particles = useMemo(() => {
        const count = isMobile ? 8 : 20;
        return Array.from({ length: count }).map((_, i) => ({
            id: i,
            size: Math.random() * 4 + 2,
            x: Math.random() * 100,
            y: Math.random() * 100,
            duration: Math.random() * 5 + 3,
            color: Math.random() > 0.5 ? "#22d3ee" : "#a855f7",
            delay: Math.random() * 2
        }));
    }, [isMobile]);

    if (!mounted) return null;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full opacity-40"
                    style={{
                        width: p.size,
                        height: p.size,
                        background: p.color,
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, 20, 0],
                        opacity: [0.2, 0.6, 0.2],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
};

const phrases = [
    "CodeCraft Studio — Digital Growth Agency.",
    "build fast, scalable websites.",
    "grow businesses online with CodeCraft Studio."
];

export default function Hero() {
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    // Antigravity Scroll Logic
    const buttonRef = useRef(null);
    const [isOverPlanet, setIsOverPlanet] = useState(false);

    // NEW: Scroll-down indicator visibility
    const [showScroll, setShowScroll] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            // Only active in Mobile View (< 768px) and Dark Mode (no .light class)
            const isMobile = window.innerWidth < 768;
            const isDarkMode = !document.documentElement.classList.contains("light");

            if (isMobile && isDarkMode && buttonRef.current) {
                const rect = buttonRef.current.getBoundingClientRect();
                const viewportCenter = window.innerHeight / 2;

                // Check if button container overlaps the "Planet Zone" (viewport center)
                const isOver = rect.top < (viewportCenter + 100) && rect.bottom > (viewportCenter - 100);
                setIsOverPlanet(isOver);
            } else {
                setIsOverPlanet(false);
            }

            // NEW: Hide scroll indicator on scroll
            setShowScroll(window.scrollY < 100);
        };

        window.addEventListener("scroll", handleScroll);
        // Trigger once on mount to set initial state
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleTyping = () => {
            const i = loopNum % phrases.length;
            const fullText = phrases[i];

            setText(isDeleting
                ? fullText.substring(0, text.length - 1)
                : fullText.substring(0, text.length + 1)
            );

            // Typing Speed Logic
            setTypingSpeed(isDeleting ? 30 : 150);

            if (!isDeleting && text === fullText) {
                // Finished typing line
                setTimeout(() => setIsDeleting(true), 1500);
            } else if (isDeleting && text === "") {
                // Finished deleting line
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, typingSpeed]);

    return (
        <section id="hero" className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto pt-20">
            {/* NEW: Background particles */}
            <HeroParticles />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="pointer-events-auto"
            >
                {/* NEW: Glitch effect on hover */}
                <h2 className="relative inline-block text-[var(--color-glow)] font-mono mb-4 text-lg group cursor-default">
                    <span className="relative z-10">Hello, Universe.</span>
                    <span className="absolute top-0 left-0 -z-10 text-cyan-400 opacity-0 group-hover:opacity-70 group-hover:animate-glitch-1">Hello, Universe.</span>
                    <span className="absolute top-0 left-0 -z-10 text-pink-500 opacity-0 group-hover:opacity-70 group-hover:animate-glitch-2">Hello, Universe.</span>
                </h2>
            </motion.div>

            <motion.h1
                className="relative text-5xl md:text-8xl font-bold tracking-tight mb-12 pointer-events-auto w-full"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                style={{ color: 'var(--foreground)' }}
            >
                {/* Ghost Element to reserve vertical space (prevent layout shift) */}
                <span className="invisible" aria-hidden="true">
                    We <br className="md:hidden" />
                    build fast, scalable websites.
                </span>

                {/* Actual Visible Typewriter Content */}
                <span className="absolute top-0 left-0">
                    We <br className="md:hidden" />
                    <span>{text}</span>
                    <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                        className="inline-block w-1 h-[0.8em] md:h-[0.75em] ml-1 align-baseline bg-[var(--color-glow)]"
                    />
                </span>
            </motion.h1>

            <motion.p
                className="text-xl md:text-2xl max-w-2xl leading-relaxed mb-10 pointer-events-auto"
                style={{ color: 'var(--foreground)', opacity: 0.6 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                A digital agency crafting SEO-optimized websites, high-performance web applications, and conversion-focused user experiences powered by <span className="animated-gradient-text font-bold">modern technology</span>.

            </motion.p>

            {/* NEW: Updated button container with staggered children */}
            <motion.div
                ref={buttonRef}
                className="flex flex-col md:flex-row gap-6 pointer-events-auto items-center"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                            staggerChildren: 0.15,
                            delayChildren: 0.3
                        }
                    }
                }}
            >
                {/* Each button wrapped in MagneticButton and motion.div for stagger */}
                <motion.div variants={{
                    hidden: { opacity: 0, y: 20, scale: 0.9 },
                    visible: { opacity: 1, y: 0, scale: 1 }
                }}>
                    <MagneticButton
                        href="#projects"
                        className="relative px-8 py-4 rounded-full font-medium text-white group overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-shadow flex items-center justify-center min-w-[180px]"
                        style={{
                            background: 'linear-gradient(135deg, rgba(107, 33, 168, 0.3), rgba(30, 58, 138, 0.3))',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.05)',
                            color: isOverPlanet ? '#000000' : '#ffffff',
                            fontWeight: isOverPlanet ? 'bold' : '500'
                        }}
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            View Projects
                        </span>
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    </MagneticButton>
                </motion.div>

                <motion.div variants={{
                    hidden: { opacity: 0, y: 20, scale: 0.9 },
                    visible: { opacity: 1, y: 0, scale: 1 }
                }}>
                    <MagneticButton
                        href="#contact"
                        className="relative px-8 py-4 rounded-full font-medium group overflow-hidden transition-colors flex items-center justify-center min-w-[180px]"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            color: isOverPlanet ? '#000000' : 'var(--foreground)',
                            fontWeight: isOverPlanet ? 'bold' : '500'
                        }}
                    >
                        <span className="relative z-10 group-hover:text-[var(--color-glow)] transition-colors" style={{ color: isOverPlanet ? '#000000' : 'inherit' }}>Contact Me</span>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-[var(--color-glow)]" />
                    </MagneticButton>
                </motion.div>

                <motion.div variants={{
                    hidden: { opacity: 0, y: 20, scale: 0.9 },
                    visible: { opacity: 1, y: 0, scale: 1 }
                }}>
                    <MagneticButton
                        href="https://www.linkedin.com/in/shravana-patel-029400274"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative px-8 py-4 rounded-full font-medium group overflow-hidden transition-colors flex items-center justify-center min-w-[180px]"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            color: isOverPlanet ? '#000000' : 'var(--foreground)',
                            fontWeight: isOverPlanet ? 'bold' : '500'
                        }}
                    >
                        <span className="relative z-10 group-hover:text-[var(--color-glow)] transition-colors" style={{ color: isOverPlanet ? '#000000' : 'inherit' }}>LinkedIn</span>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-[#0077b5]" />
                    </MagneticButton>
                </motion.div>
            </motion.div>

            {/* NEW: Scroll down indicator */}
            <AnimatePresence>
                {showScroll && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
                    >
                        <motion.span
                            animate={{ opacity: [0.3, 0.8, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-[10px] uppercase tracking-widest font-mono text-[var(--color-glow)]"
                        >
                            Scroll Down
                        </motion.span>
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-1 h-8 rounded-full bg-gradient-to-b from-[var(--color-glow)] to-transparent"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
                .animated-gradient-text {
                    background: linear-gradient(90deg, #a855f7, #22d3ee, #ec4899, #a855f7);
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: shine 3s linear infinite;
                    text-shadow: 0 0 10px rgba(168, 85, 247, 0.2);
                }

                @keyframes shine {
                    to { background-position: 200% center; }
                }

                @keyframes glitch-1 {
                    0% { transform: translate(0) }
                    20% { transform: translate(-2px, 2px) }
                    40% { transform: translate(-2px, -2px) }
                    60% { transform: translate(2px, 2px) }
                    80% { transform: translate(2px, -2px) }
                    100% { transform: translate(0) }
                }

                @keyframes glitch-2 {
                    0% { transform: translate(0) }
                    20% { transform: translate(2px, -2px) }
                    40% { transform: translate(2px, 2px) }
                    60% { transform: translate(-2px, -2px) }
                    80% { transform: translate(-2px, 2px) }
                    100% { transform: translate(0) }
                }

                :global(.group:hover .group-hover\:animate-glitch-1) {
                    animation: glitch-1 0.3s cubic-bezier(.25,.46,.45,.94) both infinite;
                }
                :global(.group:hover .group-hover\:animate-glitch-2) {
                    animation: glitch-2 0.3s cubic-bezier(.25,.46,.45,.94) reverse both infinite;
                }
            `}</style>
        </section>
    );
}
