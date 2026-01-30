import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";

export default defineConfig({
  plugins: [react()],

  define: {
    "process.env": {},
    "process.browser": true,
    process: "({ env: {} })",
    global: "globalThis",
  },

  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        NodeGlobalsPolyfillPlugin({ buffer: true }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },

  server: {
    port: 3000,
    open: true,
  },

  build: {
    outDir: "build",
    target: "esnext",
  },
});
