export interface EngineeringPillar {
  id: string;
  code: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
}

export const PHILOSOPHY_PILLARS: EngineeringPillar[] = [
  {
    id: "realtime-ai",
    code: "01",
    title: "Sub-100ms Multimodal AI",
    tagline: "Voice & Real-time Web Canvas",
    description: "Architecting streaming LLM pipelines, low-latency voice synthesis, vector search context, and dynamic UI rendering for instant human-AI dialogue.",
    category: "ARTIFICIAL INTELLIGENCE",
  },
  {
    id: "mobile-systems",
    code: "02",
    title: "Native Android & Offline-First",
    tagline: "High-Performance Mobile Apps",
    description: "Building production release Android APKs with Capacitor 6, background audio MediaSession controls, and Dexie IndexedDB offline caching.",
    category: "MOBILE ENGINEERING",
  },
  {
    id: "agri-vision",
    code: "03",
    title: "Agri-Tech & Edge Computer Vision",
    tagline: "Low-Bandwidth Rural Solutions",
    description: "Deploying lightweight MobileNet and OpenCV vision models tailored for offline leaf disease identification and multi-lingual voice guidance.",
    category: "COMPUTER VISION",
  },
  {
    id: "modern-web",
    code: "04",
    title: "High-Performance Full-Stack",
    tagline: "Interactive 3D & Resilient APIs",
    description: "Crafting immersive 60 FPS user experiences with Next.js, Three.js, GSAP smooth motion, and resilient FastAPI backend microservices.",
    category: "FULL-STACK ARCHITECTURE",
  },
];

