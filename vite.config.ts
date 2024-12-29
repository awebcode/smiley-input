import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import tailwindcss from "tailwindcss";
// import autoprefixer from "autoprefixer";
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "index.ts"),
      name: "smiley-input",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "emoji-picker-react"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },

    // Generates sourcemaps for the built files
    sourcemap: true,

    // Clears the output directory before building
    emptyOutDir: true,
  },
  //react() enables React support.
  //dts() generates TypeScript declaration files (*.d.ts)
  //during the build.
  plugins: [react(), dts(), cssInjectedByJsPlugin()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  }, // Include postcss plugin for proper handling of CSS],
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
