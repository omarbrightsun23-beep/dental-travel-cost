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
    { key: 'dentalImplantsAbroadCost', relPath: 'dental-implants-abroad-cost/index.html' },
    { key: 'allOn4TurkeyCost', relPath: 'all-on-4-turkey-cost/index.html' },
    { key: 'allOn6TurkeyCost', relPath: 'all-on-6-turkey-cost/index.html' },
    { key: 'porcelainVeneersTurkeyCost', relPath: 'porcelain-veneers-turkey-cost/index.html' },
    { key: 'hotelsIstanbul', relPath: 'hotels/istanbul/index.html' },
    { key: 'hotelsAntalya', relPath: 'hotels/antalya/index.html' },
    { key: 'hotelsMexico', relPath: 'hotels/mexico/index.html' },
    { key: 'hotelsBangkok', relPath: 'hotels/bangkok/index.html' },
    { key: 'guidesTurkey72Hour', relPath: 'guides/turkey-72-hour-dental-trip/index.html' },
    { key: 'guidesMexicoBorderCrossing', relPath: 'guides/mexico-border-crossing-dental-guide/index.html' },
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

