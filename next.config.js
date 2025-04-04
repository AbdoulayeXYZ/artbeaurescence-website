/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Enable image optimization
  images: {
    unoptimized: true,
  },
  // Ensure we can use API routes in development
  // (they won't work in the static export, but will work in development)
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
}

module.exports = nextConfig
