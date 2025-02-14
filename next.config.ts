/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {},
  },
  images: {
    domains: ["pesquisadesatisfacao.martminas.com.br"],
  },
};

module.exports = nextConfig;
