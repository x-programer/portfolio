"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import Image from "next/image";

// Magnetic Wrapper for links
const MagneticWrapper = ({ children, className = "" }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX, y: middleY });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const springConfig = { damping: 15, stiffness: 150 };
    const springX = useSpring(position.x * 0.2, springConfig);
    const springY = useSpring(position.y * 0.2, springConfig);

    return (
        <motion.div
            style={{ x: springX, y: springY }}
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Animated Logo Component
const AnimatedLogo = () => {
    const letters = "C.C.S".split("");
    return (
        <Link href="/" className="text-xl font-bold tracking-tighter flex items-center group pointer-events-auto">
            {letters.map((char, i) => (
                <motion.span
                    key={i}
                    whileHover={{
                        y: -5,
                        color: "var(--color-glow)",
                        textShadow: "0 0 8px var(--color-glow)"
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="inline-block transition-colors"
                    style={{ color: char === "." ? (i === 1 ? "var(--color-glow)" : "var(--color-cosmic)") : "var(--foreground)" }}
                >
                    {char === "." ? (
                        <motion.span
                            animate={{ opacity: [1, 0.5, 1], scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                        >
                            {char}
                        </motion.span>
                    ) : (
                        char
                    )}
                </motion.span>
            ))}
        </Link>
    );
};

// Theme Toggle Component
const ThemeToggle = ({ theme, toggleTheme }) => {
    return (
        <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9, rotate: 360 }}
            className="relative w-10 h-10 rounded-full flex items-center justify-center transition-all bg-[var(--glass-bg)] border border-[var(--glass-border)] group overflow-hidden"
            title="Toggle theme"
        >
            <AnimatePresence mode="wait">
                <motion.span
                    key={theme}
                    initial={{ y: 20, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: -20, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.3 }}
                >
                    {theme === "dark" ? "☀️" : "🌙"}
                </motion.span>
            </AnimatePresence>

            {/* Particle burst on click (simplified) */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                whileTap={{ opacity: 1 }}
                initial={{ opacity: 0 }}
            >
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        animate={{
                            x: [0, (i % 2 === 0 ? 1 : -1) * 20],
                            y: [0, (i < 3 ? 1 : -1) * 20],
                            opacity: [1, 0]
                        }}
                        transition={{ duration: 0.5 }}
                        style={{ left: "50%", top: "50%" }}
                    />
                ))}
            </motion.div>
        </motion.button>
    );
};

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [theme, setTheme] = useState("dark");
    const [mounted, setMounted] = useState(false);
    const [scrollDirection, setScrollDirection] = useState("up");
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeSection, setActiveSection] = useState("");
    const lastScrollY = useRef(0);

    // Body scroll lock is no longer needed since dock doesn't cover screen

    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem("theme") || "dark";
        setTheme(savedTheme);
        if (savedTheme === "light") {
            document.documentElement.classList.add("light");
        }

        const observerOptions = { threshold: 0.5, rootMargin: "-80px 0px 0px 0px" };
        const sections = ["hero", "about", "projects", "contact"];

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, observerOptions);

        sections.forEach(id => {
            const section = document.getElementById(id);
            if (section) observer.observe(section);
        });



        return () => {
            observer.disconnect();
        };
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        if (newTheme === "light") {
            document.documentElement.classList.add("light");
        } else {
            document.documentElement.classList.remove("light");
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            setIsScrolled(currentY > 20);

            if (currentY > lastScrollY.current + 5 && currentY > 100) {
                setScrollDirection("down");
            } else if (currentY < lastScrollY.current - 5) {
                setScrollDirection("up");
            }
            lastScrollY.current = currentY;

            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (totalHeight > 0) {
                setScrollProgress((currentY / totalHeight) * 100);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const links = [
        { name: "About", href: "#about" },
        { name: "Projects", href: "#projects" },
        { name: "Contact", href: "#contact" },
        { name: "Services", href: "#services" },
    ];

    const scrollToSection = (e, href) => {
        if (e) e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            // Delay scroll slightly to allow menu to close and body overflow lock to release
            setTimeout(() => {
                const offset = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                window.history.pushState(null, "", href);
            }, 400); // 400ms to allow spring exit animation and body overflow sync
        }
    };

    if (!mounted) return null;

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 pointer-events-none transform ${scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
                    } ${isScrolled ? "py-4" : "py-6"}`}
            >
                <div className="mx-auto max-w-7xl px-6 md:px-12">
                    <div
                        className={`relative flex items-center rounded-2xl border transition-all duration-500 ${isScrolled ? "glass-heavy py-3 px-6 shadow-2xl" : "border-transparent py-2 px-0"
                            } justify-between md:justify-between`}
                        style={{
                            borderColor: isScrolled ? 'var(--glass-border)' : 'transparent',
                            boxShadow: isScrolled ? '0 0 20px rgba(168, 85, 247, 0.05)' : 'none'
                        }}
                    >
                        {isScrolled && (
                            <motion.div
                                className="absolute inset-0 rounded-2xl pointer-events-none"
                                animate={{
                                    boxShadow: [
                                        "inset 0 0 0px var(--glass-border)",
                                        "inset 0 0 10px rgba(168, 85, 247, 0.1)",
                                        "inset 0 0 0px var(--glass-border)"
                                    ]
                                }}
                                transition={{ duration: 4, repeat: Infinity }}
                            />
                        )}

                        <AnimatedLogo />

                        {/* Desktop Links */}
                        <div className="hidden md:flex items-center gap-6 lg:gap-8">
                            {links.map((link) => (
                                <MagneticWrapper key={link.name} className="pointer-events-auto">
                                    <Link
                                        href={link.href}
                                        onClick={(e) => scrollToSection(e, link.href)}
                                        className={`text-sm font-medium transition-all relative group py-2 ${activeSection === link.href.substring(1) ? "opacity-100" : "opacity-70 hover:opacity-100"
                                            }`}
                                        style={{
                                            color: 'var(--foreground)',
                                            transform: activeSection === link.href.substring(1) ? "translateY(-1px)" : "none"
                                        }}
                                    >
                                        {link.name}
                                        <span className={`absolute bottom-0 left-0 h-[2px] transition-all duration-300 bg-[var(--color-glow)] ${activeSection === link.href.substring(1) ? "w-full shadow-[0_0_8px_var(--color-glow)]" : "w-0 group-hover:w-full"
                                            }`} />
                                    </Link>
                                </MagneticWrapper>
                            ))}

                            <div className="pointer-events-auto ml-2">
                                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                            </div>

                            <div className="pointer-events-auto">
                                <button
                                    onClick={() => window.location.href = 'mailto:my.codecraftstudio@gmail.com'}
                                    className="relative px-6 py-2.5 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] hover:bg-[var(--glass-border)] text-sm font-bold transition-all hover:scale-105 active:scale-95 group overflow-hidden"
                                    style={{ color: 'var(--foreground)' }}
                                >
                                    <span className="relative z-10">Let's Talk</span>
                                    <span className="absolute top-1.5 right-1.5 w-2 h-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-full w-full bg-green-500"></span>
                                    </span>
                                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                                </button>
                            </div>
                        </div>

                        {/* Mobile - Let's Talk Button (Centered) */}
                        <div className="md:hidden absolute left-1/2 -translate-x-1/2 pointer-events-auto">
                            <button
                                onClick={() => window.location.href = 'mailto:my.codecraftstudio@gmail.com'}
                                className="relative px-5 py-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] hover:bg-[var(--glass-border)] text-sm font-bold transition-all hover:scale-105 active:scale-95 group overflow-hidden"
                                style={{ color: 'var(--foreground)' }}
                            >
                                <span className="relative z-10">Let's Talk</span>
                                <span className="absolute top-1 right-1 w-2 h-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-full w-full bg-green-500"></span>
                                </span>
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                            </button>
                        </div>

                        {/* Mobile - Theme Toggle (Right) */}
                        <div className="md:hidden pointer-events-auto">
                            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                        </div>

                        {/* Scroll Progress Indicator */}
                        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5 overflow-hidden rounded-b-2xl">
                            <motion.div
                                className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-pink-500"
                                style={{ width: `${scrollProgress}%` }}
                            />
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
