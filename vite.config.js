import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
  },
  test: {
    globals: true,    // Allows you to use 'describe', 'it', 'expect' without importing them in every file
    environment: 'jsdom',    // The environment where tests run (e.g., 'node' or 'jsdom' for browser-like tests)
    setupFiles: './src/tests/setupTests.js',    // Path to the setup file that runs before each test
    css: true,
  },
});
