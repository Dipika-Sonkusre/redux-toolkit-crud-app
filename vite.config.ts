import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    server: {
      port: parseInt(env.VITE_PORT ?? "4000", 10),
    },
    plugins: [react()],
  };
});
