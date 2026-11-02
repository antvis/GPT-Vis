import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default createMDX({ options: { remarkPlugins: ['remark-gfm'] } })(nextConfig);
