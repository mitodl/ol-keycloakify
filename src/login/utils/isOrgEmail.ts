import { ORG_EMAIL_DOMAINS } from "../constants"

export function isOrgEmail(email?: string): boolean {
  if (!email || !email.trim()) return false
  const emailParts = email.trim().split("@")
  if (emailParts.length !== 2) return false
  const domain = emailParts[1].toLowerCase()
  console.log(domain)
  console.log(ORG_EMAIL_DOMAINS)
  return ORG_EMAIL_DOMAINS.some(
    (orgEmailDomain: string) =>
      domain === orgEmailDomain.toLowerCase() ||
      domain.endsWith(`.${orgEmailDomain.toLowerCase()}`)
  )
}
