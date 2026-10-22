import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    // The site renders Strapi media with plain <img>, never next/image, so the
    // optimizer at /_next/image only ever served as an open image proxy. With
    // the former `**` remotePatterns it fetched and decoded any URL an anonymous
    // visitor named (GHSA-2xp9-vwfh-vxw4: RCE via a crafted AVIF). Keep it off,
    // and allow no remote hosts, so the endpoint can't be turned back on by accident.
    unoptimized: true,
    remotePatterns: [],
  },
};

export default nextConfig;
