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
      includeAssets: ["logo.png", "favicon.ico"],
      manifest: {
        name: "Iglesia Vida Nueva",
                short_name: "VidaNueva",
                description:
                  "La app de la Iglesia Vida Nueva: notas del sermón, la Biblia, información de la iglesia y mucho más.",
        lang: "es",
        display: "standalone",
        start_url: "/",
        scope: "/",
        orientation: "portrait",
        theme_color: "#04608e",
                background_color: "#ffffff",
        categories: ["lifestyle", "education"],
        icons: [
                  {
                    src: "/logo.png",
                    sizes: "512x512",
                    type: "image/png",
                    purpose: "any",
                  },
                  {
                    src: "/logo.png",
                    sizes: "512x512",
                    type: "image/png",
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