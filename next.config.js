/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  basePath: isProd ? "/E-learning" : "",
  assetPrefix: isProd ? "/E-learning/" : "",
  output: "export", // Enable static site export for Netlify
  images: {
    unoptimized: true, // Required for static export compatibility
  },
};

module.exports = nextConfig;
