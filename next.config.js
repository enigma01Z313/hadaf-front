/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  experimental: {
    urlImports: [
      "https://67.43.234.92",
      "https://hadafsanjapi.farzinahmadi.com",
      "https://hadafsanj.farzinahmadi.com",
    ],
  },
};

module.exports = nextConfig;
