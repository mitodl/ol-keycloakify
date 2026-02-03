import type { ExtendKcContext } from "keycloakify/login"
import type { KcEnvName, ThemeName } from "../kc.gen"

export type KcContextExtension = {
  themeName: ThemeName
  properties: Record<KcEnvName, string> & {}
  // NOTE: Here you can declare more properties to extend the KcContext
  // See: https://docs.keycloakify.dev/faq-and-help/some-values-you-need-are-missing-from-in-kccontext

  loginAttempt: {
    userFullname?: string
    needsPassword: boolean
    hasSocialProviderAuth: boolean
  }

  olSettings: {
    homeUrl: string
    termsOfServiceUrl: string
  }
}

type OrganizationContext = {
  alias: string
  attributes: Record<string, unknown>
  domains: string[]
  member: boolean
  name: string
}

export type KcContextExtensionPerPage = {
  "login-update-password.ftl"?: {
    username?: string
    org?: OrganizationContext
  }
}

export type KcContext = ExtendKcContext<KcContextExtension, KcContextExtensionPerPage>
