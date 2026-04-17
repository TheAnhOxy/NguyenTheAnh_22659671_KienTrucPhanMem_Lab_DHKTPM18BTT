import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { cwd } from "node:process";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, cwd(), "");

  const proxy = {
    "^/food(/|$)": {
      target: env.VITE_FOOD_SERVICE_URL,
      changeOrigin: true,
      secure: false,
      rewrite: (path) => path.replace(/^\/food/, ""),
    },
    "/user": {
      target: env.VITE_USER_SERVICE_URL,
      changeOrigin: true,
      secure: false,
    },
    "/order": {
      target: env.VITE_ORDER_SERVICE_URL,
      changeOrigin: true,
      secure: false,
    },
    "/payment": {
      target: env.VITE_PAYMENT_SERVICE_URL,
      changeOrigin: true,
      secure: false,
    },
    "/notification": {
      target: env.VITE_NOTIFICATION_SERVICE_URL,
      changeOrigin: true,
      secure: false,
    },
  };

  return {
    plugins: [react()],
    server: {
      cors: true,
      proxy,
    },
  };
});
