import path from "node:path"
import { fileURLToPath } from "node:url"
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin"
import { playwright } from "@vitest/browser-playwright"
import { defineConfig } from "vitest/config"

const dirname = path.dirname(fileURLToPath(import.meta.url))

// A vitest.config.ts takes precedence over vite.config.ts, which keeps the
// keycloakify build plugin out of test runs.
export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: "unit",
          include: ["src/**/*.test.ts"],
          environment: "node"
        }
      },
      {
        plugins: [storybookTest({ configDir: path.join(dirname, ".storybook") })],
        // Browser mode only pre-bundles optimizeDeps.include, so the CJS deps of
        // @testing-library/dom (aria-query, lz-string, pretty-format) are served
        // raw and fail named imports. https://github.com/vitejs/vite/issues/23030
        // @storybook/addon-vitest 10.6.0 pre-bundles storybook/test itself; drop this
        // include after upgrading.
        optimizeDeps: { include: ["@testing-library/dom"] },
        test: {
          name: "storybook",
          setupFiles: ["./.storybook/vitest.setup.ts"],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: "chromium" }]
          }
        }
      }
    ]
  }
})
