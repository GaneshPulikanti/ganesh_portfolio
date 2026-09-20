export interface Capability {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  skills: string[];
  features: string[];
  accentColor: string;
}

export const CAPABILITIES: Capability[] = [
  {
    id: "ai-agents",
    code: "01 / AI ENGINE",
    title: "AI & MULTIMODAL AGENTS",
    subtitle: "Conversational Engines & Vector Memory",
    description:
      "Architecting sub-100ms streaming voice AI assistants, fine-tuned LLM orchestration pipelines, RAG vector memory search, and real-time interactive web canvas execution.",
    skills: ["PyTorch", "FastAPI", "OpenAI API", "Pinecone", "LangChain", "WebSockets", "Transformers", "Whisper AI"],
    features: [
      "Sub-90ms Voice Synthesis",
      "RAG Vector Search Pipelines",
      "Multimodal Vision & NLP Engines",
      "Real-time Canvas Code Execution",
    ],
    accentColor: "#C43859",
  },
  {
    id: "creative-tools",
    code: "02 / CREATIVE TOOLS",
    title: "CREATIVE TOOLS & WEBGL",
    subtitle: "Awwwards-Grade Interactive Canvases",
    description:
      "Crafting immersive 60 FPS WebGL playgrounds, real-time GPU raymarching GLSL shaders, audio-reactive visualizers, and kinetic GSAP editorial typography.",
    skills: ["Three.js", "React Three Fiber", "GLSL Shaders", "GSAP & ScrollTrigger", "WebAudio API", "TypeScript", "Tailwind CSS"],
    features: [
      "60 FPS GPU Shaders",
      "Audio-Reactive Raymarching",
      "Kinetic Motion Choreography",
      "Exportable 4K Canvas Renderers",
    ],
    accentColor: "#8B1E3F",
  },
  {
    id: "native-mobile",
    code: "03 / NATIVE SYSTEMS",
    title: "NATIVE MOBILE & SYSTEMS",
    subtitle: "Flutter, Native C++ & Android Security",
    description:
      "Engineering cross-platform Flutter audio applications with custom C++ native bindings, native Android background MediaSession engines, and low-level system lock managers.",
    skills: ["Flutter", "Dart", "C++ Native Wrappers", "Capacitor 6", "Android Java / Swift", "SQLite", "Dexie.js"],
    features: [
      "Custom C++ Audio Bindings",
      "Android MediaSession Background Audio",
      "Dexie.js Offline IndexedDB",
      "System Security & Lock Managers",
    ],
    accentColor: "#6B1930",
  },
  {
    id: "web-apps",
    code: "04 / WEB APPS",
    title: "HIGH-SCALE WEB APPS",
    subtitle: "Distributed Microservices & Cloud APIs",
    description:
      "Building resilient Next.js and React web applications, high-concurrency WebSocket state pipelines, containerized Docker backends, and Vercel cloud deployments.",
    skills: ["Next.js 14", "React 18", "Tailwind CSS", "Node.js", "PostgreSQL", "Docker", "Vercel Cloud"],
    features: [
      "Sub-50ms API Response Rates",
      "Real-Time WebSocket State Sync",
      "Containerized Microservices",
      "Automated CI/CD Infrastructure",
    ],
    accentColor: "#E8D5C8",
  },
];
