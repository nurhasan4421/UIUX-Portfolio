import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true" || !!process.env.GITHUB_ACTIONS;

const nextConfig: NextConfig = {
  output: isGithubActions ? "export" : undefined,
  basePath: undefined,
  assetPrefix: undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: "",
  },
  devIndicators: false,
  experimental: {
    agentUpgrade: "security" as any,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dribbble.com",
      },
    ],
  },
};

export default nextConfig;
