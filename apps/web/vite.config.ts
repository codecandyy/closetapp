import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "::",
    port: 8080,
    fs: {
      // 레포 최상위/상위/패키지 폴더 접근 허용 (모노레포/심링크 이슈 방지)
      allow: [
        __dirname,
        path.resolve(__dirname, '..'),
        path.resolve(__dirname, '../../packages'),
      ],
    },
  },
  preview: { port: 8080 },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@shared-logic": path.resolve(__dirname, "../../packages/shared-logic/src"),
      "@shared-api": path.resolve(__dirname, "../../packages/shared-api/src"),
    },
    // pnpm/yarn workspace 심볼릭 링크 이슈 방지
    preserveSymlinks: true,
  },
  optimizeDeps: {
    include: [
      path.resolve(__dirname, "../../packages/shared-logic/src/rules.ts"),
      path.resolve(__dirname, "../../packages/shared-logic/src/validators.ts"),
      path.resolve(__dirname, "../../packages/shared-logic/src/types/index.ts")
    ],
    exclude: [],
  },
});
