import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname:'image.xhy-bright.top',
      }
    ]
  }
};

export default nextConfig;
