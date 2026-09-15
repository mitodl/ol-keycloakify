// keycloakify's Template reloads the page when it mounts a second time in the same
// document (keycloakify/src/tools/useInsertScriptTags.ts). Vitest browser mode renders
// every story in a file into one page, so each story after the first would reload the
// iframe. keycloakify skips that reload when viewMode=docs is in the URL.
const url = new URL(window.location.href)
url.searchParams.set("viewMode", "docs")
window.history.replaceState(window.history.state, "", url)
