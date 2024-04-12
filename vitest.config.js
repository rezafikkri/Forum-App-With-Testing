import { config } from 'dotenv';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    alias: {
      '@/components/': new URL('./components/', import.meta.url).pathname,
      '@/hooks/': new URL('./hooks/', import.meta.url).pathname,
      '@/lib/': new URL('./lib/', import.meta.url).pathname,
    },
    env: {
      ...config({ path: './.env.local' }).parsed,
    },
  },
});
