import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const repoName = "Model-Monitoring-System";

export default defineConfig({
  plugins: [react()],
  base: `/${repoName}/`,
});
