// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
// import dtsPlugin from "vite-plugin-dts";
// import { libInjectCss } from "vite-plugin-lib-inject-css";
// import tailwindcss from "tailwindcss";
// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(),dtsPlugin(),libInjectCss()],
//   build: {
//     sourcemap: false,
//     minify: true,
//     lib: {
//       entry: "src/index.tsx", // Entry point for your bundle
//       formats: ["es", "cjs"], // Output formats (ESM and CJS)
//       fileName: (format) => `index.${format === "es" ? "mjs" : "js"}`, // Output file naming
//     },
//     rollupOptions: {
//       external: ["react", "react-dom"], // Exclude React from the bundle
//     },
//   },
//   css: {
//     postcss: {
//       plugins: [tailwindcss],
//     },
//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// import dts from "vite-plugin-dts";
// import path from "path";

export default defineConfig({
  plugins: [react()],
});
