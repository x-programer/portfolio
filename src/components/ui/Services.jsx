"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const servicesData = [
    {
        id: 1,
        title: "Website Building",
        description: "Custom, responsive websites built with modern technologies. From stunning portfolios to complex web applications.",
        icon: "🌐",
        gradient: "from-purple-500 to-pink-500",
        features: ["React & Next.js", "Responsive Design", "SEO Optimized", "Fast Performance"]
    },
    {
        id: 2,
        title: "Social Media Handling",
        description: "Strategic social media management to grow your brand presence and engage with your audience effectively.",
        icon: "📱",
        gradient: "from-cyan-500 to-blue-500",
        features: ["Content Strategy", "Community Management", "Analytics & Insights", "Brand Voice"]
    },
    {
        id: 3,
        title: "Graphics Generation",
        description: "Creating engaging and informative graphics to help your audience learn and grow.",
        icon: "✍️",
        gradient: "from-green-500 to-emerald-500",
        features: ["Blog Posts", "Social Media Content", "Email Campaigns", "Poster Design"]
    },
    {
        id: 4,
        title: "SEO",
        description: "Boost your online visibility with data-driven SEO strategies that drive organic traffic and rankings.",
        icon: "🚀",
        gradient: "from-green-500 to-emerald-500",
        features: ["Keyword Research", "On-Page SEO", "Technical SEO", "Performance Tracking"]
    }

];

// Service Card Component
const ServiceCard = ({ service, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative group pointer-events-auto cursor-pointer"
        >
            {/* Card */}
            <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative h-full p-8 rounded-2xl overflow-hidden backdrop-blur-md border border-white/10 shadow-2xl group"
                style={{
                    backgroundColor: 'var(--glass-bg)',
                    boxShadow: isHovered
                        ? '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 30px rgba(168, 85, 247, 0.15)'
                        : '0 10px 40px -15px rgba(0, 0, 0, 0.2)'
                }}
            >
                {/* Animated Border Overlay - SVG like Technical Arsenal */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl">
                    <motion.rect
                        width="100%"
                        height="100%"
                        rx="16"
                        ry="16"
                        fill="none"
                        stroke={isHovered ? "#a855f7" : "transparent"}
                        strokeWidth="2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={isHovered ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        style={{ filter: isHovered ? "drop-shadow(0 0 8px #a855f7)" : "none" }}
                    />
                </svg>

                {/* Cursor Glow Spotlight - like Technical Arsenal */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                    style={{
                        background: 'radial-gradient(circle 300px at 50% 50%, rgba(168, 85, 247, 0.1), transparent)'
                    }}
                />

                {/* Content */}
                <div className="relative z-10">
                    {/* Icon with glow */}
                    <motion.div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 relative border"
                        style={{
                            backgroundColor: 'var(--glass-bg)',
                            borderColor: 'var(--glass-border)'
                        }}
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {service.icon}
                        <motion.div
                            className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${service.gradient} blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                        />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-3 transition-colors duration-300" style={{ color: 'var(--foreground)' }}>
                        {service.title}
                    </h3>

                    {/* Description */}
                    <p className="mb-6 leading-relaxed" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                        {service.description}
                    </p>

                    {/* Feature tags */}
                    <div className="flex flex-wrap gap-2">
                        {service.features.map((feature, i) => (
                            <motion.span
                                key={feature}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: index * 0.15 + i * 0.05 + 0.3 }}
                                className="px-3 py-1 text-xs rounded-full border"
                                style={{
                                    color: 'var(--foreground)',
                                    opacity: 0.8,
                                    backgroundColor: 'var(--glass-bg)',
                                    borderColor: 'var(--glass-border)'
                                }}
                            >
                                {feature}
                            </motion.span>
                        ))}
                    </div>
                </div>

                {/* Shimmer effect */}
                <motion.div
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
                />
            </motion.div>
        </motion.div>
    );
};

export default function Services() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section id="services" ref={sectionRef} className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative overflow-visible pointer-events-auto">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-600/5 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/5 blur-[150px] rounded-full pointer-events-none" />

            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
            >
                <motion.span
                    className="text-[var(--color-glow)] font-mono text-sm uppercase tracking-widest inline-block mb-4"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.2 }}
                >
                    What CodeCraftStudio Offer
                </motion.span>

                <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
                    Services & Expertise
                </h2>

                <p className="max-w-2xl mx-auto text-lg" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
                    Transforming ideas into digital reality with a blend of creativity, technology, and strategic thinking.
                </p>

                {/* Decorative line */}
                <motion.div
                    className="mt-8 mx-auto h-[2px] bg-gradient-to-r from-transparent via-[var(--color-glow)] to-transparent"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: '200px' } : {}}
                    transition={{ duration: 1, delay: 0.5 }}
                />
            </motion.div>

            {/* Services Grid */}
            <div className="grid md:grid-cols-2 gap-8">
                {servicesData.map((service, index) => (
                    <ServiceCard key={service.id} service={service} index={index} />
                ))}
            </div>

            {/* Bottom CTA */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-center mt-16"
            >
                <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(168, 85, 247, 0.4)' }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 backdrop-blur-sm font-semibold transition-all group"
                    style={{ color: 'var(--foreground)' }}
                >
                    <span>Let's Work Together</span>
                    <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-[var(--color-glow)]"
                    >
                        →
                    </motion.span>
                </motion.a>
            </motion.div>
        </section>
    );
}
