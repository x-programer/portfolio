"use client";
import { Suspense, useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import dynamic from "next/dynamic";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/ui/Hero";
import Services from "@/components/ui/Services";
import Projects from "@/components/ui/Projects";
import About from "@/components/ui/About";
import Contact from "@/components/ui/Contact";
import CanvasPlaceholder from "@/components/ui/CanvasPlaceholder";

// Dynamic import for 3D scene - improves initial page load performance
const Scene3D = dynamic(() => import("@/components/3d/Scene3D"), {
  ssr: false,
  loading: () => <CanvasPlaceholder />,
});

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* Smooth scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-pink-500 origin-left z-[100]"
        style={{ scaleX }}
      />

      <Navbar />

      {/* 3D Background Canvas - Dynamically Loaded */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Scene3D isMobile={isMobile} />
      </div>

      <div className="flex flex-col min-h-screen relative overflow-hidden">
        {/* Liquid gradient orbs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)',
            }}
            animate={{
              x: ['-10%', '110%'],
              y: ['20%', '80%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
          />
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)',
            }}
            animate={{
              x: ['110%', '-10%'],
              y: ['80%', '20%'],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
          />
        </div>

        {/* Sections with smooth animations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Hero />
        </motion.div>

        {/* Glassmorphic divider */}
        <div className="relative h-px my-16 mx-auto w-3/4 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <Services />
        </motion.div>

        {/* Glassmorphic divider */}
        <div className="relative h-px my-16 mx-auto w-3/4 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <About />
        </motion.div>

        {/* Glassmorphic divider */}
        <div className="relative h-px my-16 mx-auto w-3/4 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <Projects />
        </motion.div>

        {/* Glassmorphic divider */}
        <div className="relative h-px my-16 mx-auto w-3/4 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <Contact />
        </motion.div>

        {/* Enhanced Footer with floating particles */}
        <footer className="relative py-12 text-center text-sm mt-auto overflow-hidden">
          {/* Glassmorphic background */}
          <div className="absolute inset-0 glass-heavy backdrop-blur-xl border-t border-white/10" />

          {/* Animated gradient border on top */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-cyan-400 to-pink-500"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear'
            }}
            style={{
              backgroundSize: '200% 200%'
            }}
          />

          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                style={{
                  left: `${(i * 12.5) + 5}%`,
                  bottom: '20%',
                }}
                animate={{
                  y: [-20, -60, -20],
                  opacity: [0.2, 0.5, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3 + i * 0.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.3
                }}
              />
            ))}
          </div>

          {/* Footer content */}
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              className="text-base font-medium mb-2"
              style={{ color: 'var(--foreground)', opacity: 0.7 }}
              whileHover={{ opacity: 0.9, scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              © 2025 Shravana Kumar Patel
            </motion.p>
            <motion.p
              className="text-sm italic"
              style={{ color: 'var(--color-glow)' }}
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              Exploring the Antigravity of Code.
            </motion.p>
          </motion.div>

          {/* Liquid shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'linear',
              repeatDelay: 1
            }}
          />
        </footer>
      </div>
    </>
  );
}
