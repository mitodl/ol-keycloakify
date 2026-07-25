import { PostHogProvider } from "@posthog/react"
import posthog from "posthog-js"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { KcPage } from "./kc.gen"

if (window.kcContext?.properties?.POSTHOG_API_KEY) {
  posthog.init(window.kcContext.properties.POSTHOG_API_KEY, {
    // Scope the posthog cookie to this site's exact domain. Posthog defaults
    // this to true, which sets the cookie on the root domain (e.g. mit.edu),
    // sharing it with every other site there.
    cross_subdomain_cookie: false,
    api_host: window.kcContext.properties.POSTHOG_API_HOST || "https://us.i.posthog.com",
    defaults: "2025-11-30",
    autocapture: true,
    capture_pageview: true,
    capture_pageleave: true
  })

  posthog.startSessionRecording()
}

// The following block can be uncommented to test a specific page with `yarn dev`
// Don't forget to comment back or your bundle size will increase
/*
import { getKcContextMock } from "./login/KcPageStory";

if (import.meta.env.DEV) {
    window.kcContext = getKcContextMock({
        pageId: "register.ftl",
        overrides: {}
    });
}
*/

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {!window.kcContext ? (
      <h1>No Keycloak Context</h1>
    ) : (
      <PostHogProvider client={posthog}>
        <KcPage kcContext={window.kcContext} />
      </PostHogProvider>
    )}
  </StrictMode>
)
