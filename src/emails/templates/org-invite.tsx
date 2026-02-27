import { render, Text } from "jsx-email"
import { EmailLayout } from "../layout"
import { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails"
import { createVariablesHelper } from "keycloakify-emails/variables"

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

export const previewProps: Omit<GetTemplateProps, "plainText"> = {
  locale: "en",
  themeName: "ol-learn"
}

export const templateName = "Org Invite"

const { exp } = createVariablesHelper("org-invite.ftl")

export const Template = ({ locale }: Omit<GetTemplateProps, "plainText">) => (
  <EmailLayout preview={`Invitation to join ${exp("realmName")}`} locale={locale}>
    <h1 style={{ color: "#212326", margin: "13px 0" }}>
      You&apos;re Invited to Join {exp("realmName")}
    </h1>
    <Text style={paragraph}>Hi,</Text>
    <Text style={paragraph}>
      You have been invited to join <strong>{exp("realmName")}</strong>. To accept this
      invitation and set up your account, please click the button below:
    </Text>
    <Text style={{ margin: "20px 0" }}>
      <a href={exp("link")} style={ctaButton}>
        Accept Invitation
      </a>
    </Text>
    <Text style={paragraph}>
      <strong>Important:</strong> This invitation link will expire in{" "}
      {exp("linkExpirationFormatter(linkExpiration)")}.
    </Text>
    <Text style={paragraph}>
      If you did not expect this invitation or have any questions, please contact the{" "}
      {exp("realmName")} support team.
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
  return "Invitation to join {0} - Action Required"
}
