import type { NextConfig } from "next";

const allowedOrigins =
  process.env.ALLOWED_ORIGINS?.split(",") || [];

const nextConfig: NextConfig = {
  allowedDevOrigins: allowedOrigins,
};

export default nextConfig;