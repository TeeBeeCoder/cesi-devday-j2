import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom', include: ['test/**/*.test.{js,jsx}'], setupFiles: ['./test/setup.js'],
    coverage: {
      provider: 'v8', include: ['src/workshops.js', 'src/App.jsx'],
      reporter: ['text', 'lcov', 'json-summary', 'html'],
      thresholds: { lines: 80, statements: 80, functions: 80, branches: 70 },
    },
  },
});
