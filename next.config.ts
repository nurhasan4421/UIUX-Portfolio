import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true" || !!process.env.GITHUB_ACTIONS;
let assetPrefix = "";
let basePath = "";

if (isGithubActions) {
  const repo = process.env.GITHUB_REPOSITORY?.replace(/.*?\//, "") || "UIUX-Portfolio";
  assetPrefix = `/${repo}/`;
  basePath = `/${repo}`;
}

const nextConfig: NextConfig = {
  output: isGithubActions ? "export" : undefined,
  basePath: basePath || undefined,
  assetPrefix: assetPrefix || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  devIndicators: false,
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
