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
import Footer from "@/components/ui/Footer";

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

        <Footer />
      </div>
    </>
  );
}
