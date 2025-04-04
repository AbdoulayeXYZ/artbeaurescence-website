/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Disable image optimization for static export compatibility
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Suppression complète des rewrites en mode production pour éviter les avertissements avec output: export
  // Les rewrites ne sont activés qu'en mode développement
  async rewrites() {
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/api/:path*',
          destination: '/api/:path*',
        },
      ];
    }
    return [];
  },
}

// Ajout de l'analyseur de bundle en mode développement uniquement
const withBundleAnalyzer = process.env.ANALYZE === 'true'
  ? require('@next/bundle-analyzer')({
      enabled: true,
    })
  : (config) => config;

module.exports = withBundleAnalyzer(nextConfig)
