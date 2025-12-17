import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // <-- Use absolute path on Netlifyc
  plugins: [react()],
});
