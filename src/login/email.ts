import { ORG_EMAIL_DOMAINS } from "./constants"

export const isOrgEmail = (email: string): boolean => {
  const trimmed = email?.trim()
  if (!trimmed) return false
  const lastAtIndex = trimmed.lastIndexOf("@")
  if (lastAtIndex <= 0 || lastAtIndex === trimmed.length - 1) return false
  const domain = trimmed.slice(lastAtIndex + 1).toLowerCase()
  return ORG_EMAIL_DOMAINS.some(
    (orgEmailDomain: string) => domain === orgEmailDomain.toLowerCase()
  )
}
