/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://suitmedia-backend.suitdev.com/api/:path*',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'suitmedia-backend.suitdev.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.suitdev.com',
      },

    ],
  },
};

export default nextConfig;