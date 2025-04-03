/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true, // we use biome for linting
  },
  typescript: {
    ignoreBuildErrors: true, // In development we don't type check, other plugins are responsible for this at the IDE level and in CI
  },
};

module.exports = nextConfig;
