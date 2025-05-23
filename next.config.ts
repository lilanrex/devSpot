import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors. It's strongly recommended to fix
    // ESLint issues to maintain code quality.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
