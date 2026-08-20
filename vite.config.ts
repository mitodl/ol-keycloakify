import { fileURLToPath } from "node:url"
import react from "@vitejs/plugin-react"
import type { BuildContext } from "keycloakify/bin/shared/buildContext"
import { keycloakify } from "keycloakify/vite-plugin"
import { buildEmailTheme } from "keycloakify-emails"
import { defineConfig } from "vite"

const __dirname = fileURLToPath(new URL(".", import.meta.url))

export default defineConfig({
  plugins: [
    react(),
    keycloakify({
      themeName: ["ol-learn", "ol-data-platform"],
      accountThemeImplementation: "Single-Page",
      keycloakVersionTargets: {
        // We run Keycloak 26 exclusively. The 22-to-25 target only differs by
        // bundling a LoginFormsProviderFactory shim that 26 does not need, and
        // building it produces a second jar declaring the same theme names.
        "22-to-25": false,
        "all-other-versions": `keycloakify-theme_v11-21_and_v26plus.jar`
      },
      environmentVariables: [
        { name: "POSTHOG_API_HOST", default: "https://us.i.posthog.com" },
        { name: "POSTHOG_API_KEY", default: "" }
      ],
      postBuild: async (buildContext: BuildContext) => {
        await buildEmailTheme({
          templatesSrcDirPath: __dirname + "/src/emails/templates",
          themeNames: buildContext.themeNames,
          assetsDirPath: __dirname + "/src/emails/templates/assets",
          keycloakifyBuildDirPath: buildContext.keycloakifyBuildDirPath,
          locales: ["en"],
          cwd: __dirname,
          esbuild: {}
        })
      },
      startKeycloakOptions: {
        keycloakExtraArgs: ["--spi-login-provider=ol-freemarker"],
        extensionJars: ["./keycloak-resources/ol-spi-1.1-SNAPSHOT.jar"]
      }
    })
  ]
})
