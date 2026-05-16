import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api/products": {
        target: "http://172.20.10.5:8081",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/products/, "/products"),
      },
      "/api/cart": {
        target: "http://172.20.10.2:8082",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/cart/, "/cart"),
      },
      "/api/checkout": {
        target: "http://172.20.10.6:8083",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/checkout/, "/checkout"),
      },
      "/api/orders": {
        target: "http://localhost:8083",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/orders/, "/orders"),
      },
      "/api/stock": {
        target: "http://localhost:8084",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/stock/, "/stock"),
      },
    },
  },
});
