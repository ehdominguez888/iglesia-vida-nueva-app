import { defineConfig } from "vite";
import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(() => ({
  root: __dirname,
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    dyadComponentTagger(),
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: false,
      },
      includeAssets: ["icon.svg", "favicon.ico"],
      manifest: {
        name: "Iglesia Nueva Vida",
        short_name: "NuevaVida",
        description:
          "La app de la Iglesia Nueva Vida: notas del sermón, la Biblia, información de la iglesia y mucho más.",
        lang: "es",
        display: "standalone",
        start_url: "/",
        scope: "/",
        orientation: "portrait",
        theme_color: "#17815c",
        background_color: "#faf9f5",
        categories: ["lifestyle", "education"],
        icons: [
          {
            src: "/icon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any",
          },
          {
            src: "/icon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico,woff2}"],
        navigateFallback: "/index.html",
        cleanupOutdatedCaches: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));