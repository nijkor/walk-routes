import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://iamoapcakfegpwqrucwc.supabase.co/**")],
  },
  experimental: {
    authInterrupts: true,
  },
};

export default nextConfig;
