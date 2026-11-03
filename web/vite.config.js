import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

// Dev: sajikan ../data.json (data lama) di /data.json supaya fetch('../data.json') jalan.
const serveRootData = {
  name: 'serve-root-data',
  configureServer(server) {
    server.middlewares.use('/data.json', (_req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(fs.readFileSync(path.resolve(__dirname, '../data.json')));
    });
  },
};

export default defineConfig({
  base: './', // relatif, jadi jalan di /studio-tayang/app/ (GitHub Pages)
  plugins: [react(), serveRootData],
});
