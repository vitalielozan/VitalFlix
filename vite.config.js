import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("@clerk")) return "clerk";
            if (id.includes("framer-motion")) return "framer";
            if (id.includes("react") || id.includes("react-dom"))
              return "vendor";
            if (id.includes("@supabase")) return "supabase";
          }
        },
      },
    },
  },
});
