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
        reporter: ["text", "cobertura"],
        exclude: ["**/util/**", "**/hooks/**", "**/dummyData/**"],
      },
      reporters: [
        [
          "junit",
          { suiteName: "custom suite name", classname: "custom-classname" },
        ],
      ],
      outputFile: "coverage/test-output.json",
    },
  };
});
