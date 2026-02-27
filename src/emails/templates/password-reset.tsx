import { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails"
import { createVariablesHelper } from "keycloakify-emails/variables"
import { render, Text } from "jsx-email"
import { EmailLayout } from "../layout"

const paragraph = {
  fontFamily: "neue-haas-grotesk-text, sans-serif",
  fontSize: "13px",
  lineHeight: "18px",
  color: "#000000",
  margin: "13px 0"
}

const ctaButton = {
  display: "inline-block",
  backgroundColor: "#A31F34",
  color: "#FFFFFF",
  fontFamily: "neue-haas-grotesk-text, sans-serif",
  fontSize: "14px",
  fontWeight: "bold",
  lineHeight: "120%",
  textDecoration: "none",
  padding: "10px 25px",
  borderRadius: "4px"
}

const fallbackUrl = {
  ...paragraph,
  fontSize: "12px",
  wordBreak: "break-all" as const
}

// used by Preview App of jsx-email
export const previewProps: Omit<GetTemplateProps, "plainText"> = {
  locale: "en",
  themeName: "ol-learn"
}

export const templateName = "Password Reset"

const { exp } = createVariablesHelper("password-reset.ftl")

export const Template = ({ locale }: Omit<GetTemplateProps, "plainText">) => (
  <EmailLayout
    preview={`Reset your password for ${exp("realmName")}`}
    locale={locale}
    realmName={exp("realmName")}
  >
    <h1 style={{ color: "#212326", margin: "13px 0" }}>Reset Your Password</h1>
    <Text style={paragraph}>
      You&apos;re receiving this because you requested a password reset for your user
      account at {exp("realmName")}.
    </Text>
    <Text style={paragraph}>
      Please go to the following page and choose a new password:
    </Text>
    <Text style={{ margin: "20px 0" }}>
      <a href={exp("link")} style={ctaButton}>
        Reset Password
      </a>
    </Text>
    <Text style={paragraph}>
      This link will expire within {exp("linkExpirationFormatter(linkExpiration)")}.
    </Text>
    <Text style={fallbackUrl}>
      If you&apos;re unable to click the button above, copy and paste the following URL
      into your browser:
      <br />
      {exp("link")}
    </Text>
  </EmailLayout>
)

export const getTemplate: GetTemplate = async props => {
  return await render(<Template {...props} />, { plainText: props.plainText })
}

export const getSubject: GetSubject = async () => {
  return "Reset password"
}
