/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  basePath: isProd ? "/E-learning" : "",
  assetPrefix: isProd ? "/E-learning/" : "",
  // output: "export",  <-- remove or comment out this line
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
