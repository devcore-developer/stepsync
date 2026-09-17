/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' }, // Prevent clickjacking
  { key: 'X-Content-Type-Options', value: 'nosniff' }, // Prevent MIME sniffing
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }, // Control referrer info
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }, // Disable unwanted browser features
];

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;