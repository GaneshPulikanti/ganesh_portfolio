export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  role: string;
  description: string;
  longDescription: string;
  techStack: string[];
  metrics: string[];
  links: {
    github?: string;
    live?: string;
    demo?: string;
    apkUrl?: string;
  };
  accentColor: string;
}

export const PROJECTS: Project[] = [
  {
    id: "maya",
    number: "01",
    title: "MAYA",
    subtitle: "AI Conversational Assistant & Real-time Web Canvas",
    category: "ARTIFICIAL INTELLIGENCE / NLP & VOICE",
    year: "2024",
    role: "Lead AI Engineer & System Architect",
    description:
      "A multimodal conversational intelligence platform featuring sub-100ms streaming voice synthesis, dynamic web canvas rendering, and zero-latency vector context memory.",
    longDescription:
      "MAYA was engineered to blur the line between human dialogue and computer execution. Powered by a custom LLM orchestration pipeline with RAG vector search, MAYA renders dynamic UI widgets, executes code live on canvas, and delivers ultra-natural voice interactions. Production release APK Android package included.",
    techStack: ["PyTorch", "FastAPI", "Next.js", "WebSockets", "Pinecone", "Capacitor 6", "GSAP"],
    metrics: ["< 90ms Voice Latency", "10K+ Active Sessions", "4.9/5 User Rating"],
    links: {
      github: "https://github.com/GaneshPulikanti/Maya-",
      live: "https://maya-companian.vercel.app",
      apkUrl: "/apks/maya-ai-release.apk",
    },
    accentColor: "#C43859",
  },
  {
    id: "dolce",
    number: "02",
    title: "DOLCE",
    subtitle: "High-Performance Music Streaming & Native Android Application",
    category: "MOBILE & WEB / AUDIO ENGINEERING",
    year: "2024",
    role: "Mobile Architect & UI/UX Specialist",
    description:
      "A modern music streaming application built with React 18, Vite, Tailwind CSS, Zustand, Dexie IndexedDB, and Capacitor 6 Native Android background audio playback.",
    longDescription:
      "DOLCE (Italian for 'Sweet') brings a sweet, hyper-responsive listening experience across Web and Mobile. Features real-time LRCLIB synchronized lyrics, Dexie IndexedDB offline track downloads, adaptive ambient glow color extraction from cover art, and Android MediaSession background playback. Native release APK v1.0.5 available for immediate Android download.",
    techStack: ["React 18", "Vite", "Tailwind CSS", "Zustand", "Dexie.js", "Capacitor 6", "MediaSession"],
    metrics: ["60+ FPS Fluid GPU UI", "Native Android Lock-screen Controls", "Dexie IndexedDB Offline Engine"],
    links: {
      github: "https://github.com/GaneshPulikanti/DOLCE",
      live: "https://dolce-musicplayer.vercel.app",
      apkUrl: "/apks/dolce-v1.0.5-release.apk",
    },
    accentColor: "#6B1930",
  },
  {
    id: "smart-kisan-mitra",
    number: "03",
    title: "SMART KISAN MITRA",
    subtitle: "AI Agricultural Assistant & Crop Disease Support",
    category: "COMPUTER VISION / AGRI-TECH",
    year: "2024",
    role: "Full-Stack AI Developer",
    description:
      "An AI-powered agricultural decision-support platform for crop guidance, weather micro-climate telemetry, MobileNet leaf-scan disease diagnosis, and farmer voice support.",
    longDescription:
      "Built for low-bandwidth rural conditions, Smart Kisan Mitra combines lightweight MobileNet models for offline leaf-scan disease identification with live satellite micro-climate telemetry. It translates complex agronomical insights into 8 local languages using voice synthesis.",
    techStack: ["TensorFlow Lite", "Python", "FastAPI", "OpenCV", "React", "PostgreSQL"],
    metrics: ["15,000+ Farmers Onboarded", "94.8% Disease Detection Accuracy", "National Hackathon Winner"],
    links: {
      github: "https://github.com/GaneshPulikanti/Smart-Kisan-Mitra",
      live: "https://smart-kisan-mitra.vercel.app",
    },
    accentColor: "#8B1E3F",
  },
  {
    id: "recipe-gpt",
    number: "04",
    title: "RECIPE GPT",
    subtitle: "Generative AI Culinary & Nutrition Intelligence",
    category: "GENERATIVE AI / FULL-STACK",
    year: "2024",
    role: "Lead AI Developer & Backend Architect",
    description:
      "An intelligent culinary platform that transforms available kitchen ingredients into personalized gourmet recipes with real-time macro-nutrition analysis and step-by-step voice guidance.",
    longDescription:
      "RECIPE GPT uses fine-tuned LLM prompts and computer vision ingredient scanning to eliminate food waste. Features automated meal planning, caloric macro-breakdowns, dietary constraint filtering, and interactive voice cooking assistance.",
    techStack: ["OpenAI GPT-4", "FastAPI", "React", "Python", "Tailwind CSS", "PostgreSQL"],
    metrics: ["500+ Daily Custom Recipes", "Zero Food Waste Focus", "Sub-1s Recipe Generation"],
    links: {
      github: "https://github.com/GaneshPulikanti/Recipe-GPT",
      live: "https://recipe-gpt-frontend.vercel.app",
    },
    accentColor: "#C43859",
  },
];
