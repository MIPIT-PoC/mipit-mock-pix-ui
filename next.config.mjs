/**
 * Next.js config — PIX mock UI.
 *
 * basePath se setea via NEXT_PUBLIC_BASE_PATH (build arg).
 * - Local dev / standalone: basePath vacío → corre en root (http://localhost:3001/).
 * - VM1 detrás de nginx 443: basePath="/mock-pix" → los assets /_next/* se sirven bajo /mock-pix/_next/*.
 *
 * Documentado en deploy split (Audit 4 / VM split).
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
};

export default nextConfig;
