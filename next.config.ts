import type { NextConfig } from "next";
import { isProd } from "./utils/utils";

const nextConfig: NextConfig = {
  reactCompiler: true,
  devIndicators: false,
  reactStrictMode: false,
  allowedDevOrigins: ['172.20.10.6'],
  async headers() {
    if (!isProd()) {
      return [
        {
          source: "/:path*",
          headers: [
            {
              key: "X-Robots-Tag",
              value: "noindex, nofollow, noarchive",
            },
          ],
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
