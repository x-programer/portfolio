"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Facebook, Instagram, Linkedin, } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const linkSections = [
    {
      title: "PRODUCT",
      links: ["Features", "Integration", "Roadmap"],
    },
    {
      title: "COMPANY",
      links: ["About", "Blog", "Contact"],
    },
    {
      title: "RESOURCES",
      links: ["Docs", "Community"],
    },
    {
      title: "LEGAL",
      links: ["Privacy Policy", "Terms of Service"],
    },
  ];

  return (
    <footer className="relative z-50 pointer-events-auto w-full bg-zinc-950 text-white border-t border-zinc-900/80 overflow-hidden">
      {/* Decorative top ambient glow */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 justify-between">

          {/* Left Column (Branding, Socials, Newsletter & Watermark) */}
          <div className="lg:w-[40%] flex flex-col gap-8">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl font-black tracking-widest text-white block"
              >
                CODECRAFT STUDIO
              </motion.span>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-gray-400 text-sm mt-4 max-w-sm leading-relaxed"
              >
                Building innovative solutions for modern businesses. Fast, reliable, and scalable.
              </motion.p>
            </div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex gap-3"
            >
              <a
                href="https://www.facebook.com/my.codecraftstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-zinc-800 p-2.5 rounded-md hover:bg-zinc-800 hover:border-zinc-700 transition text-gray-400 hover:text-white flex items-center justify-center"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/my.codecraft.studio/"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-zinc-800 p-2.5 rounded-md hover:bg-zinc-800 hover:border-zinc-700 transition text-gray-400 hover:text-white flex items-center justify-center"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </motion.div>

            {/* Newsletter Block */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-3 max-w-md"
            >
              <h4 className="text-sm font-medium text-white">Subscribe to our newsletter</h4>
              <form onSubmit={handleSubscribe} className="flex group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border border-zinc-800 rounded-l-md px-4 py-2.5 text-white text-sm focus:outline-none focus:border-zinc-700 w-full placeholder:text-zinc-600 transition-colors"
                />
                <button
                  type="submit"
                  className="bg-white text-black font-semibold px-5 py-2.5 rounded-r-md text-sm hover:bg-zinc-200 transition-colors shrink-0 cursor-pointer"
                >
                  {subscribed ? "Subscribed!" : "Subscribe"}
                </button>
              </form>
              <p className="text-xs text-gray-500 transition-colors">
                {subscribed ? "Thank you for subscribing to our newsletter!" : "Get the latest updates, tutorials, and exclusive offers."}
              </p>
            </motion.div>

            {/* Watermark / Decorative Text */}
            <div className="mt-4 pt-4 overflow-hidden">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 0.5, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-b from-zinc-500 to-black select-none leading-none tracking-tighter"
              >
                Grow with us.
              </motion.div>
            </div>
          </div>

          {/* Right Column (Link Grids) */}
          <div className="lg:w-[60%] grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 lg:gap-x-4">
            {linkSections.map((section, sectionIdx) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * sectionIdx, duration: 0.5 }}
                className="flex flex-col"
              >
                <h3 className="text-white text-sm font-semibold tracking-wider border-l-2 border-white pl-2 h-5 flex items-center uppercase">
                  {section.title}
                </h3>
                <div className="flex flex-col gap-1 mt-2">
                  {section.links.map((link) => (
                    <a
                      key={link}
                      href={`#${link.toLowerCase()}`}
                      className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-2 mt-4 group"
                    >
                      <ArrowUpRight
                        size={16}
                        className="text-gray-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                      />
                      <span>{link}</span>
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="border-t border-zinc-800/50 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-gray-500 text-sm">
            © 2026 CodeCraft Studio | All rights reserved
          </p>
        </motion.div>

      </div>
    </footer>
  );
}
