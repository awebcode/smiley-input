import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
});
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
// import dts from "vite-plugin-dts";
// import path from "path";

// export default defineConfig({
//   build: {
//     lib: {
//       entry: path.resolve(__dirname, "index.ts"),
//       name: "ViteButton",
//       fileName: (format) => `index.${format}.js`,
//     },
//     rollupOptions: {
//       external: ["react", "react-dom", "emoji-picker-react"],
//       output: {
//         globals: {
//           react: "React",
//           "react-dom": "ReactDOM",
//         },
//       },
//     },
//     sourcemap: true,
//     emptyOutDir: true,
//   },
//   plugins: [react(), dts()],
// });
