/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    igonoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
