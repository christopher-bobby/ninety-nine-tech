import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Enable global variables like `describe`, `it`, etc.
    environment: "jsdom", // Use JSDOM for DOM testing
    setupFiles: "./setup.ts", // Path to your setup file
  },
});