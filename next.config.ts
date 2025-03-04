import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
        "bs.plantnet.org",
        "d2seqvvyy3b8p2.cloudfront.net" // Change this to the actual image domain
    ],
  },
};

export default nextConfig;
