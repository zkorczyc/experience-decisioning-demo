import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "demo-system-next.s3.eu-north-1.amazonaws.com",
        pathname: "/assets/securfinancial/**",
      },
    ],
  },
};

export default nextConfig;
