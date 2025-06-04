import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { keycloakify } from "keycloakify/vite-plugin";
import themes from "./themes";
import { buildEmailTheme } from "keycloakify-emails";

export default defineConfig({
  plugins: [
    react(),
    keycloakify({
      themeName: ["ol-learn", "ol-data-platform"],
      accountThemeImplementation: "Single-Page",
      keycloakVersionTargets: {
        "22-to-25": false,
        "all-other-versions": `keycloakify-theme-${new Date().toLocaleDateString().replace(/\//g, '-')}-${new Date().getHours()}${new Date().getMinutes()}.jar`,
      },
      postBuild: async (buildContext) => {
        await buildEmailTheme({
          templatesSrcDirPath: import.meta.dirname + "/src/emails/templates",
          themeNames: buildContext.themeNames,
          assetsDirPath: import.meta.dirname + "/src/emails/templates/assets",
          keycloakifyBuildDirPath: buildContext.keycloakifyBuildDirPath,
          locales: ["en"],
          cwd: import.meta.dirname,
          esbuild: {}, // optional esbuild options
        });
      },
    }),
  ],
});
