/** @type {import('next').NextConfig} */
const nextConfig = {
  // Exportación estática: `npm run build` genera la carpeta /out lista para Netlify
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};
export default nextConfig;
