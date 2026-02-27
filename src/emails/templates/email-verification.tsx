import { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails"
import { createVariablesHelper } from "keycloakify-emails/variables"
import { render, Text } from "jsx-email"
import { EmailLayout } from "../layout"
import { paragraph, ctaButton, fallbackUrl } from "../styles"

// used by Preview App of jsx-email
export const previewProps: Omit<GetTemplateProps, "plainText"> = {
  locale: "en",
  themeName: "ol-learn"
}

export const templateName = "Email Verification"

const { exp } = createVariablesHelper("email-verification.ftl")

export const Template = ({ locale }: Omit<GetTemplateProps, "plainText">) => (
  <EmailLayout
    preview={`Verify your email for ${exp("realmName")}`}
    locale={locale}
    realmName={exp("realmName")}
  >
    <h1 style={{ color: "#212326", margin: "13px 0" }}>Verify Your Email</h1>
    <Text style={paragraph}>
      Thank you for creating an account with {exp("realmName")}. Please complete the
      account verification process by clicking this link:
    </Text>
    <Text style={{ margin: "20px 0" }}>
      <a href={exp("link")} style={ctaButton}>
        Verify Your Email
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
  return "Verify Your Email"
}
