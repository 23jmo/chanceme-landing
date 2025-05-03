/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "arts.columbia.edu",
      },
      {
        protocol: "https",
        hostname: "business.columbia.edu",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "as.cornell.edu",
      },
      {
        protocol: "https",
        hostname: "www.seas.columbia.edu",
      },
    ],
  },
};

module.exports = nextConfig;
