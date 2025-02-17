import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  api: {
    responseLimit: "2mb",
    bodyParser: { sizeLimit: "2mb" },
    timeout: 60000, // 60 segundos
  },
};

export default nextConfig;
