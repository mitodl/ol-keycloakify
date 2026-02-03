import type { KcContext } from "../KcContext"
import { isOrgEmail } from "./isOrgEmail"

/**
 * Identifies if a user is an org user from the kcContext
 *
 * Note: Identification is page-dependent. Various values are only known to exist on specific pages
 * due to KcContext being a union type of different page contexts.
 */
export function isOrgUser(kcContext: KcContext): boolean {
  if (kcContext.pageId === "login-update-password.ftl") {
    if (kcContext.org) {
      return true
    }
    if (isOrgEmail(kcContext.username)) {
      return true
    }
  }

  if (kcContext.pageId === "login.ftl" && kcContext.login?.username) {
    return isOrgEmail(kcContext.login.username)
  }

  return false
}
