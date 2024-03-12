/* eslint-env node */

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": `http://${env.VITE_PROXY_HOST || "localhost"}:${
          env.VITE_PROXY_PORT || 3000
        }`,
      },
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "setupTests.js",
      coverage: {
        reporter: ["cobertura", "html", "text"],
        exclude: ["**/util/**", "**/hooks/**", "**/dummyData/**"],
      },
    },
  };
});
