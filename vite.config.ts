import { defineConfig,loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const env = loadEnv(process.env.NODE_ENV, process.cwd());

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    commonjsOptions: {
      include: ["tailwind.config.js", "node_modules/**"],
    },
  },
  optimizeDeps: {
    include: ["tailwind-config"],
  },
  plugins: [react()],
  resolve: {
    alias: {
      "tailwind-config": path.resolve(__dirname, "./tailwind.config.js"),
    },
  },
  define: {
    'process.env': env
  }
});


