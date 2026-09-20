import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["localhost:3000", "192.168.1.7", "192.168.1.7:3000", "0.0.0.0"],
};

export default nextConfig;
