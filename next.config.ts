import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Ignore ESLint errors during production builds
    ignoreDuringBuilds: true,
  },
  images:{
    remotePatterns:[{protocol:'https',hostname:'img.clerk.com'}]
  }
};

export default nextConfig;
