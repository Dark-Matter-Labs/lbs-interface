import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.ico",
        "apple-touch-icon.png"
      ],
      manifest: {
        name: "TreesAI LBS",
        short_name: "LBS",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#0a0a0a",
        description: "Local Benefits Screening interface (offline-capable)",
        icons: [
          {
            src: "/favicon.ico",
            sizes: "48x48 64x64 128x128",
            type: "image/x-icon"
          }
        ]
      },
      workbox: {
        globPatterns: [
          "**/*.{js,css,html,ico,png,svg,woff,woff2}"
        ],
        navigateFallback: "/index.html",
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 }
            }
          },
          {
            urlPattern: ({ url }) => /\/data\/.*\.geojson$/.test(url.pathname),
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "data-cache",
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 }
            }
          },
          {
            urlPattern: ({ url }) => /https:\/\/api\.mapbox\.com\//.test(url.href),
            handler: "CacheFirst",
            options: {
              cacheName: "mapbox-api-cache",
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 7 },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          {
            urlPattern: ({ url }) => /https:\/\/.*\.tiles\.mapbox\.com\//.test(url.href),
            handler: "CacheFirst",
            options: {
              cacheName: "mapbox-tiles-cache",
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 14 },
              cacheableResponse: { statuses: [0, 200] }
            }
          }
        ]
      }
    })
  ],
});
