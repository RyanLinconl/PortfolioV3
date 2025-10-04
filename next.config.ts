/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [100],
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  webpack: (config: { watchOptions: { ignored: string[]; }; }, { dev }: any) => {
    if (dev) {
      config.watchOptions = {
        ignored: ['**/node_modules/**', 'R:/**'], // Ignora drive R: para evitar EINVAL
      };
    }
    return config;
  },
};

module.exports = nextConfig;