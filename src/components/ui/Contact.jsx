"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// NEW: Social Link component
const SocialLink = ({ href, imgSrc, platform, delay }) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { delay } }
        }}
        whileHover={{ y: -4, scale: 1.1 }}
        className="w-12 h-12 rounded-full flex items-center justify-center glass-heavy border border-white/10 hover:border-[var(--color-glow)] transition-all group relative overflow-hidden"
    >
        <div className="relative w-6 h-6 transition-all group-hover:drop-shadow-[0_0_8px_var(--color-glow)]">
            <Image
                src={imgSrc}
                alt={platform}
                fill
                className="object-contain opacity-80 group-hover:opacity-100 transition-opacity"
            />
        </div>
        {/* Tooltip */}
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black/80 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            {platform}
        </span>
    </motion.a>
);

// Particle Burst for Success Celebration
const SuccessBurst = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const particles = useMemo(() => {
        return Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            x: (Math.random() - 0.5) * 400,
            y: (Math.random() - 0.5) * 400,
            size: Math.random() * 6 + 2,
            color: ["#a855f7", "#22d3ee", "#ec4899", "#ffffff"][Math.floor(Math.random() * 4)],
            duration: Math.random() * 1 + 1
        }));
    }, []);

    if (!mounted) return null;

    return (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-visible">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                    animate={{
                        scale: [0, 1, 0],
                        x: p.x,
                        y: p.y,
                        opacity: 0
                    }}
                    transition={{ duration: p.duration, ease: "easeOut" }}
                    className="absolute rounded-full"
                    style={{
                        width: p.size,
                        height: p.size,
                        background: p.color,
                        boxShadow: `0 0 10px ${p.color}`
                    }}
                />
            ))}
        </div>
    );
};

export default function Contact() {
    const [formStatus, setFormStatus] = useState("idle"); // idle, submitting, success, error
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [touched, setTouched] = useState({ name: false, email: false, message: false });
    const [isValid, setIsValid] = useState({ name: false, email: false, message: false });

    // NEW: Validation Logic
    const validate = (name, value) => {
        if (name === "name") return value.length >= 2;
        if (name === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        if (name === "message") return value.length >= 10;
        return false;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setIsValid(prev => ({ ...prev, [name]: validate(name, value) }));
    };

    const handleBlur = (name) => {
        setTouched(prev => ({ ...prev, [name]: true }));
    };

    async function handleSubmit(e) {
        e.preventDefault();

        // Final validation check
        if (!isValid.name || !isValid.email || !isValid.message) {
            setTouched({ name: true, email: true, message: true });
            return;
        }

        setFormStatus("submitting");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setFormStatus("success");
                setFormData({ name: "", email: "", message: "" });
                setTouched({ name: false, email: false, message: false });
                // Reset after 5 seconds
                setTimeout(() => setFormStatus("idle"), 5000);
            } else {
                setFormStatus("error");
            }
        } catch (err) {
            setFormStatus("error");
        }
    }

    return (
        <section id="contact" className="py-24 px-6 md:px-12 max-w-7xl mx-auto mb-20 relative">
            {/* NEW: Grid Background Pattern */}
            <div className="absolute inset-x-0 top-0 h-[500px] pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: 'radial-gradient(circle, var(--foreground) 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                }}
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="glass-heavy p-8 md:p-12 rounded-3xl max-w-3xl mx-auto text-center border-t border-white/10 pointer-events-auto relative overflow-hidden"
            >
                {/* NEW: Availability Status Badge */}
                <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1 rounded-full glass-heavy border border-white/10 text-[10px] font-mono uppercase tracking-wider">
                    <motion.span
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"
                    />
                    Available for Projects
                </div>

                <h2 className="text-[var(--color-glow)] font-mono mb-2 text-sm uppercase tracking-widest">Transmission</h2>
                <h3 className="text-4xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>Initialize Contact</h3>
                <p className="mb-8 max-w-lg mx-auto" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
                    Ready to start your next project? Send a signal across the void.
                </p>

                <AnimatePresence mode="wait">
                    {formStatus === "success" ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-12 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 relative"
                        >
                            <SuccessBurst />
                            <div className="text-5xl mb-4">🚀</div>
                            <h4 className="text-xl font-bold mb-2">Signal Sent!</h4>
                            <p>Message received. I will respond to your transmission shortly.</p>
                        </motion.div>
                    ) : (
                        <motion.form
                            key="form"
                            onSubmit={handleSubmit}
                            className="space-y-6 text-left max-w-md mx-auto relative z-10"
                        >
                            {/* NEW: Input Group with Floating Label and Validation */}
                            {[
                                { id: "name", label: "Name", type: "text", placeholder: "Major Tom" },
                                { id: "email", label: "Email", type: "email", placeholder: "tom@groundcontrol.com" }
                            ].map((field) => (
                                <div key={field.id} className="relative">
                                    <label
                                        htmlFor={field.id}
                                        className={`absolute left-4 transition-all duration-200 pointer-events-none font-mono ${formData[field.id] || touched[field.id]
                                            ? "-top-2.5 text-[10px] px-1 bg-[#121212] py-0 translate-y-0"
                                            : "top-3.5 text-sm opacity-40 translate-y-0"
                                            } ${touched[field.id] && !isValid[field.id] ? "text-red-400" : "text-[var(--color-glow)]"}`}
                                    >
                                        {field.label}
                                    </label>
                                    <input
                                        type={field.type}
                                        id={field.id}
                                        name={field.id}
                                        value={formData[field.id]}
                                        onChange={handleInputChange}
                                        onBlur={() => handleBlur(field.id)}
                                        className={`w-full rounded-xl px-4 py-3.5 focus:outline-none transition-all border ${touched[field.id] && !isValid[field.id]
                                            ? "border-red-500/50 bg-red-500/5"
                                            : "focus:border-[var(--color-glow)] focus:shadow-[0_0_15px_rgba(168,85,247,0.2)] border-white/10"
                                            }`}
                                        style={{ backgroundColor: 'var(--glass-bg)', color: 'var(--foreground)' }}
                                        placeholder={formData[field.id] ? "" : field.placeholder}
                                    />
                                    {touched[field.id] && isValid[field.id] && (
                                        <span className="absolute right-4 top-4 text-green-500">✓</span>
                                    )}
                                </div>
                            ))}

                            {/* Textarea with Character Counter */}
                            <div className="relative">
                                <label
                                    htmlFor="message"
                                    className={`absolute left-4 transition-all duration-200 pointer-events-none font-mono ${formData.message || touched.message
                                        ? "-top-2.5 text-[10px] px-1 bg-[#121212] py-0"
                                        : "top-3.5 text-sm opacity-40"
                                        } ${touched.message && !isValid.message ? "text-red-400" : "text-[var(--color-glow)]"}`}
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    onBlur={() => handleBlur("message")}
                                    maxLength={500}
                                    className={`w-full rounded-xl px-4 py-3.5 focus:outline-none transition-all border ${touched.message && !isValid.message
                                        ? "border-red-500/50 bg-red-500/5"
                                        : "focus:border-[var(--color-glow)] focus:shadow-[0_0_15px_rgba(168,85,247,0.2)] border-white/10"
                                        }`}
                                    style={{ backgroundColor: 'var(--glass-bg)', color: 'var(--foreground)' }}
                                    placeholder={formData.message ? "" : "Send your transmission..."}
                                />
                                {/* NEW: Character Counter */}
                                <div className={`text-[10px] mt-1 text-right font-mono ${formData.message.length >= 500 ? "text-red-500" :
                                    formData.message.length >= 400 ? "text-yellow-500" : "opacity-40"
                                    }`}>
                                    {formData.message.length}/500
                                </div>
                            </div>

                            <motion.button
                                type="submit"
                                disabled={formStatus === "submitting"}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-4 rounded-full border border-white/10 bg-[var(--color-glow)]/10 hover:bg-[var(--color-glow)]/20 font-bold transition-all shadow-lg overflow-hidden group relative"
                                style={{ color: 'var(--foreground)' }}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {formStatus === "submitting" ? (
                                        <>
                                            <motion.span
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                            />
                                            Transmitting...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <motion.span
                                                animate={{ x: [0, 5, 0] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                            >
                                                →
                                            </motion.span>
                                        </>
                                    )}
                                </span>
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                            </motion.button>

                            {formStatus === "error" && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-400 text-sm text-center font-mono"
                                >
                                    Transmission unstable. Re-initiate signal.
                                </motion.p>
                            )}
                        </motion.form>
                    )}
                </AnimatePresence>

                {/* NEW: Social Links Row */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mt-12 pt-8 border-t border-white/5 flex justify-center gap-6"
                >
                    <SocialLink href="https://github.com" platform="GitHub" imgSrc="/github.png" delay={0.1} />
                    <SocialLink href="https://linkedin.com" platform="LinkedIn" imgSrc="/linkedin.png" delay={0.2} />
                    <SocialLink href="https://instagram.com" platform="Instagram" imgSrc="/instagram.png" delay={0.3} />
                    <SocialLink href="mailto:ringtoneboy1530@gmail.com" platform="Email" imgSrc="/email.png" delay={0.4} />
                </motion.div>
            </motion.div>
        </section>
    );
}

