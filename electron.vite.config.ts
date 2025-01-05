import { resolve } from 'path';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.d.ts'],
    },
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.d.ts'],
    },
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
      },
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.d.ts'],
    },
    plugins: [react()],
  },
});
