import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(() => {
  const inputEntries: Record<string, string> = {
    main: path.resolve(__dirname, 'index.html'),
  };

  const optionalPages = [
    { key: 'about', relPath: 'about/index.html' },
    { key: 'privacyPolicy', relPath: 'privacy-policy/index.html' },
    { key: 'termsAndConditions', relPath: 'terms-and-conditions/index.html' },
    { key: 'disclaimer', relPath: 'disclaimer/index.html' },
    { key: 'contact', relPath: 'contact/index.html' },
  ];

  for (const page of optionalPages) {
    const fullPath = path.resolve(__dirname, page.relPath);
    if (fs.existsSync(fullPath)) {
      inputEntries[page.key] = fullPath;
    }
  }

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: inputEntries,
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

