"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Globe, Smartphone, Palette, Rocket } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

// Seamless overlapping wave animation
const WaveAnimation = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
      <div className="w-full h-full relative opacity-20">
        {/* Wave 1 - Purple Glow */}
        <motion.svg
          className="absolute left-0 right-0 bottom-0 w-[200%] h-64 text-purple-500/10"
          viewBox="0 0 2880 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            ease: "linear",
            duration: 20,
            repeat: Infinity,
          }}
        >
          <path
            d="M0,100 C720,180 1440,20 2160,100 C2880,180 3600,20 4320,100 L4320,200 L0,200 Z"
            fill="url(#wave-gradient-purple)"
          />
        </motion.svg>

        {/* Wave 2 - Cyan Glow */}
        <motion.svg
          className="absolute left-0 right-0 bottom-4 w-[200%] h-60 text-cyan-500/10"
          viewBox="0 0 2880 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          animate={{
            x: ["-50%", "0%"],
          }}
          transition={{
            ease: "linear",
            duration: 28,
            repeat: Infinity,
          }}
        >
          <path
            d="M0,80 C720,20 1440,140 2160,80 C2880,20 3600,140 4320,80 L4320,200 L0,200 Z"
            fill="url(#wave-gradient-cyan)"
          />
        </motion.svg>

        {/* Gradients definitions */}
        <svg className="w-0 h-0 absolute">
          <defs>
            <linearGradient id="wave-gradient-purple" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(168, 85, 247, 0.15)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <linearGradient id="wave-gradient-cyan" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(6, 182, 212, 0.12)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

// FAQ Accordion Item Component
const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div 
      className={`border rounded-xl my-3 px-6 py-4 transition-all duration-300 ${
        isOpen 
          ? "border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]" 
          : "border-zinc-200 dark:border-zinc-800/40 bg-transparent"
      }`}
    >
      <div
        onClick={onClick}
        className={`flex justify-between items-center cursor-pointer text-lg transition-colors group select-none py-1 ${
          isOpen 
            ? "text-blue-500" 
            : "text-zinc-800 dark:text-gray-200 hover:text-zinc-900 dark:hover:text-white"
        }`}
      >
        <span className="font-medium text-base md:text-lg pr-4">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className={`shrink-0 transition-colors ${
            isOpen ? "text-blue-500" : "text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-white"
          }`}
        >
          <ChevronDown size={20} />
        </motion.div>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-zinc-600 dark:text-gray-400 mt-3 text-sm md:text-base leading-relaxed pb-2">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function ServicesPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const services = [
    {
      title: "Website Building",
      emoji: "🌐",
      icon: <Globe size={24} className="text-purple-400" />,
      description: "Custom, responsive websites built with modern technologies. From stunning portfolios to complex web applications.",
      tags: ["React & Next.js", "Responsive Design", "SEO Optimized", "Fast Performance"],
    },
    {
      title: "Social Media Handling",
      emoji: "📱",
      icon: <Smartphone size={24} className="text-cyan-400" />,
      description: "Strategic social media management to grow your brand presence and engage with your audience effectively.",
      tags: ["Content Strategy", "Community Management", "Analytics & Insights", "Brand Voice"],
    },
    {
      title: "Graphics Generation",
      emoji: "✍️",
      icon: <Palette size={24} className="text-pink-400" />,
      description: "Creating engaging and informative graphics to help your audience learn and grow.",
      tags: ["Blog Posts", "Social Media Content", "Email Campaigns", "Poster Design"],
    },
    {
      title: "SEO",
      emoji: "🚀",
      icon: <Rocket size={24} className="text-emerald-400" />,
      description: "Boost your online visibility with data-driven SEO strategies that drive organic traffic and rankings.",
      tags: ["Keyword Research", "On-Page SEO", "Technical SEO", "Performance Tracking"],
    },
  ];

  const faqData = [
    {
      key: 1,
      question: "How can CodeCraft Studio help with SEO optimization?",
      answer: "We create structured digital strategies using ads, SEO, content, and automation to build visibility, trust, and consistent lead generation.",
    },
    {
      key: 2,
      question: "How does CodeCraft Studio improve local business visibility?",
      answer: "We optimize your Google Business Profile, manage reviews, and improve local search rankings so nearby customers can easily find your business.",
    },
    {
      key: 3,
      question: "How does CodeCraft Studio ensure better ROAS in ad campaigns?",
      answer: "We focus on data-driven targeting, continuous A/B testing, and conversion rate optimization to maximize your Return on Ad Spend and ensure every dollar counts.",
    },
    {
      key: 4,
      question: "Does CodeCraft Studio offer SaaS automation solutions?",
      answer: "Yes, we implement automation systems for lead management, CRM integration, and workflow optimization to improve efficiency and scalability.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-transparent pointer-events-auto relative z-20 min-h-screen flex flex-col justify-between">
      <Navbar />
      <main className="flex-grow pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
        
        {/* Section 1: Hero & Wavy Animation */}
        <section className="relative min-h-[75vh] flex flex-col justify-center items-center overflow-hidden py-16">
          
          {/* Wave Animation Background */}
          <WaveAnimation />
          
          {/* Hero Content */}
          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-7xl font-bold text-zinc-900 dark:text-white tracking-tight leading-tight"
            >
              Where strategy meets <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400">
                intelligent execution
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-zinc-600 dark:text-gray-400 mt-6 text-base md:text-lg max-w-2xl leading-relaxed"
            >
              We deliver digital solutions that remove friction and unlock measurable performance.
            </motion.p>
          </div>

          {/* Lower Hero Section */}
          <div className="relative z-10 max-w-3xl mx-auto text-center mt-36 md:mt-44">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4"
            >
              Services That Move Your Business Forward
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-zinc-600 dark:text-gray-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed"
            >
              Discover connected services designed to streamline operations and accelerate growth.
            </motion.p>
          </div>
        </section>

        {/* Section 2: Services Grid */}
        <section className="relative z-10 py-16 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                whileHover={{ 
                  y: -6, 
                  borderColor: "rgba(168, 85, 247, 0.4)",
                  boxShadow: "0 20px 40px -20px rgba(168, 85, 247, 0.15)"
                }}
                className="bg-white/60 dark:bg-zinc-900/40 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="bg-zinc-100 dark:bg-zinc-800/50 rounded-xl p-3 w-fit mb-6 flex items-center justify-center border border-zinc-200 dark:border-zinc-700/30">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-gray-400 text-sm md:text-base leading-relaxed">
                    {service.description}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-8">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-zinc-100 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/50 text-zinc-700 dark:text-gray-400 text-xs px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* AI Workflow Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-32 px-6"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight">
            Empower Your Workflow with AI
          </h2>
          <p className="text-zinc-600 dark:text-gray-400 mt-4 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Ask your AI Agent for real-time collaboration, seamless integrations, and actionable insights to streamline your operations.
          </p>
        </motion.div>

        {/* Section 3: Smooth FAQ Accordion */}
        <section className="relative z-10 max-w-3xl mx-auto mt-24 md:mt-32">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-10 text-center">
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-2">
            {faqData.map((item, index) => (
              <FAQItem
                key={item.question}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === index}
                onClick={() => toggleFAQ(index)}
              />
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
