import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import Unfonts from "unplugin-fonts/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
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
