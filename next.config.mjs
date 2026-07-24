/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.sparklingwhitedental.com.au",
      },
    ],
  },
};

export default nextConfig;
