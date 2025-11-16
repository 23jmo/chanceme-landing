import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.drafted.college",
          },
        ],
        destination: "https://drafted.college/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
