import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans, Space_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ganesh Pulikanti — Software Engineer & AI Developer",
  description:
    "Original Awwwards-level interactive portfolio of Ganesh Pulikanti. Software Engineer & AI Developer crafting digital experiences that think, move and interact.",
  keywords: [
    "Ganesh Pulikanti",
    "Software Engineer",
    "AI Developer",
    "Machine Learning",
    "WebGL",
    "Three.js",
    "Next.js",
    "Full-Stack Developer",
    "Creative Coding",
  ],
  authors: [{ name: "Ganesh Pulikanti" }],
  openGraph: {
    title: "Ganesh Pulikanti — Software Engineer & AI Developer",
    description:
      "Editorial technology portfolio blending immersive WebGL 3D graphics, kinetic typography, and advanced AI engineering.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} ${spaceMono.variable} h-full antialiased bg-[#0A0406] text-[#F5EBE6]`}
    >
      <body className="min-h-full flex flex-col bg-[#0A0406] text-[#F5EBE6] selection:bg-[#8B1E3F]/40 selection:text-[#F5EBE6]">
        {children}
      </body>
    </html>
  );
}
