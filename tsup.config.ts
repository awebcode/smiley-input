import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.tsx"],
  sourcemap: false,
  minify: true,
  dts: true,
  clean: true,
  external: ["react"],
  format: ["esm", "cjs"],
  splitting: false,
  bundle: true,
  outExtension({ format }) {
    return {
      // Force `.mjs` for ESM output
      js: format === "esm" ? ".mjs" : ".js",
    };
  },
});
