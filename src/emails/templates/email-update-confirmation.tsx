import { render, Text } from "jsx-email"
import type { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails"
import { createVariablesHelper } from "keycloakify-emails/variables"
import { EmailLayout } from "../layout"
import { ctaButton, paragraph } from "../styles"

// used by Preview App of jsx-email
export const previewProps: Omit<GetTemplateProps, "plainText"> = {
  locale: "en",
  themeName: "ol-learn"
}

export const templateName = "Email Update Confirmation"

const { exp } = createVariablesHelper("email-update-confirmation.ftl")

export const Template = ({ locale }: Omit<GetTemplateProps, "plainText">) => (
  <EmailLayout
    preview={`Confirm your email change for ${exp("realmName")}`}
    locale={locale}
    realmName={exp("realmName")}
  >
    <h1 style={{ color: "#212326", margin: "13px 0" }}>Confirm your email change</h1>
    <Text style={paragraph}>
      Please confirm your email update to <strong>{exp("newEmail")}</strong>. Click the
      button below.
    </Text>
    <Text style={{ margin: "20px 0" }}>
      <a href={exp("link")} style={ctaButton}>
        Confirm Email Change
      </a>
    </Text>
    <Text style={paragraph}>
      This link will expire within {exp("linkExpirationFormatter(linkExpiration)")}.
    </Text>
    <Text style={paragraph}>
      Welcome and thanks!
      <br />
      <strong>{exp("realmName")} Team</strong>
    </Text>
  </EmailLayout>
)

export const getTemplate: GetTemplate = async props => {
  return await render(<Template {...props} />, { plainText: props.plainText })
}

// Keycloak resolves this subject key with no message parameters —
// FreeMarkerEmailTemplateProvider#sendEmailUpdateConfirmation passes
// Collections.emptyList() — so a `{0}` realm placeholder cannot be used here the
// way org-invite does. Branch on the theme instead, so the data platform realm
// does not send MIT Learn branding.
export const getSubject: GetSubject = async ({ themeName }) =>
  themeName === "ol-data-platform"
    ? "Confirm your email change"
    : "MIT Learn - Confirm your email change"
