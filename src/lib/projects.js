export const projects = [
    {
        id: 1,
        title: "Feedback Widget",
        role: "Full-Stack Developer",
        description: "Real-time SaaS feedback tool that uses Google Gemini AI to automatically analyze and tag user sentiment.",
        longDescription: "A plug-and-play SaaS solution that allows developers to embed a feedback form into any website with a single line of code. The system ingests user comments, runs them through Google Gemini to determine sentiment (Positive/Neutral/Negative), and displays real-time analytics on a secured dashboard.",
        image: "/dashboard-preview.png",
        tags: ["Next.js", "Firebase", "Gemini AI", "Tailwind"],
        features: [
            "🤖 AI Sentiment Analysis with Google Gemini",
            "⚡ Real-time Firestore Database updates",
            "📦 Lightweight embeddable widget script (<20kb)",
            "🛡️ Secure Admin Dashboard with authentication"
        ],
        link: "https://feedback-widget-two.vercel.app"
    },
    {
        id: 2,
        title: "Aiagen (AI Builder)",
        role: "Automation Engineer",
        description: "Intelligent automation agent capable of scaffolding and building websites programmatically.",
        longDescription: "An experimental CLI tool designed to automate the repetitive parts of web development. Aiagen can generate folder structures, write boilerplate code, and scaffold entire full-stack applications based on high-level user prompts.",
        image: "/aiagen.png",
        tags: ["JavaScript", "Node.js", "Automation", "AI"],
        features: [
            "⌨️ Interactive CLI (Command Line Interface)",
            "📂 Recursive file system generation",
            "🚀 Automates React/Next.js boilerplate setup",
            "🧠 Context-aware code generation"
        ],
        link: "https://github.com/x-programer/aiagen.git"
    },
    {
        id: 3,
        title: "Carpentry Services Platform",
        role: "Freelance Web Developer",
        description: "High-performance business portfolio built for a carpentry client. Features optimized SEO and modern UI.",
        longDescription: "A custom-designed business website for a local carpentry service. The main goal was to replace an outdated site with a high-performance Next.js application that ranks high on Google (SEO) and converts visitors into leads via an optimized contact flow.",
        image: "/carpentry.png",
        tags: ["Next.js", "React", "Vercel", "Client Work"],
        features: [
            "📈 100% Google Lighthouse Performance Score",
            "📱 Fully Responsive Mobile-First Design",
            "🔍 SEO-optimized metadata and structure",
            "📧 Integrated Lead Generation Forms"
        ],
        link: "https://carpentery-website-cjlf.vercel.app/"
    },
    {
        id: 4,
        title: "Cosmic Portfolio",
        role: "Creative Developer",
        description: "Immersive 3D portfolio featuring zero-gravity physics, interactive particles, and React Three Fiber.",
        longDescription: "A personal identity website that pushes the boundaries of web performance. It features a persistent 3D world rendered in the browser, using optimized shaders and physics to create a 'weightless' browsing experience without compromising accessibility.",
        image: "/portfolio.png",
        tags: ["Next.js", "Three.js", "R3F", "Framer Motion"],
        features: [
            "🌌 Interactive 3D Particles System",
            "🖱️ Physics-based drag-and-drop interactions",
            "🎨 Glassmorphism UI with Backdrop Blur",
            "⚡ Optimized for mobile GPUs"
        ],
        link: "https://github.com/x-programmer/portfolio-space"
    }
];