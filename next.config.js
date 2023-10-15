/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: true,
      serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "unsplash.com",
        },
        {
          protocol: "https",
          hostname: "images.unsplash.com",
        },
        {
          protocol: "https",
          hostname: "source.unsplash.com",
        },
        {
          protocol: "https",
          hostname: "dgk2dzwnw5p4q.cloudfront.net",
        },
      ],
      typescript: {
        ignoreBuildErrors: true,
      },
    },
  };
  
  module.exports = nextConfig;