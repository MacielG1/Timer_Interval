import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Unfonts from "unplugin-fonts/vite";
const ReactCompilerConfig = {
  /* ... */
};
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-react-compiler", ReactCompilerConfig],
      },
    }),
    Unfonts({
      google: {
        families: [
          {
            name: "Work Sans",
            styles: "wght@100;400;500;600;700",
          },
        ],
      },
    }),
  ],
  base: "./",
});
