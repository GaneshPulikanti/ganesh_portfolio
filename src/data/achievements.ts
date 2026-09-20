export interface Achievement {
  id: string;
  metric: number;
  prefix?: string;
  suffix?: string;
  label: string;
  description: string;
  category: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "hackathons",
    metric: 12,
    suffix: "+",
    label: "Hackathon Victories",
    description: "National & State level coding competitions won across AI, Agri-Tech, and Web innovation.",
    category: "RECOGNITION",
  },
  {
    id: "projects",
    metric: 25,
    suffix: "+",
    label: "Production Deployments",
    description: "Full-stack AI models, mobile apps, and enterprise web solutions deployed to live users.",
    category: "ENGINEERING",
  },
  {
    id: "accuracy",
    metric: 99,
    suffix: "%",
    label: "System Reliability",
    description: "Optimized model inferences and fault-tolerant architecture achieving high uptime.",
    category: "PERFORMANCE",
  },
  {
    id: "contributions",
    metric: 100,
    prefix: ">",
    suffix: "K",
    label: "Lines of Clean Code",
    description: "Written in TypeScript, Python, Dart, C++, and Rust for open-source and proprietary software.",
    category: "OPEN SOURCE",
  },
];
