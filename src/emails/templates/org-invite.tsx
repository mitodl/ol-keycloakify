import { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails"
import { createVariablesHelper } from "keycloakify-emails/variables"
import { render, Text } from "jsx-email"
import { EmailLayout } from "../layout"
import { paragraph, ctaButton, fallbackUrl } from "../styles"

export const previewProps: Omit<GetTemplateProps, "plainText"> = {
  locale: "en",
  themeName: "ol-learn"
}

export const templateName = "Org Invite"

const { exp } = createVariablesHelper("org-invite.ftl")

export const Template = ({ locale, themeName }: Omit<GetTemplateProps, "plainText">) => {
  const isDataPlatform = themeName === "ol-data-platform"

  return (
    <EmailLayout
      preview={`Invitation to join ${exp("realmName")}`}
      locale={locale}
      realmName={exp("realmName")}
    >
      <h1 style={{ color: "#212326", margin: "13px 0" }}>
        You&apos;re Invited to Join {exp("realmName")}
      </h1>
      <Text style={paragraph}>Hi,</Text>
      {isDataPlatform ? (
        <>
          <Text style={paragraph}>
            You have been invited to join <strong>{exp("realmName")}</strong>, MIT Open
            Learning&apos;s platform for data analysis and insights into learning patterns
            across MIT&apos;s courses.
          </Text>
          <Text style={paragraph}>
            As a member, you&apos;ll have access to analytics dashboards, research
            datasets, and collaboration tools designed for educational data science.
          </Text>
        </>
      ) : (
        <Text style={paragraph}>
          You have been invited to join <strong>{exp("realmName")}</strong>. To accept
          this invitation and set up your account, please click the button below:
        </Text>
      )}
      <Text style={{ margin: "20px 0" }}>
        <a href={exp("link")} style={ctaButton}>
          {isDataPlatform ? "Access Data Platform" : "Accept Invitation"}
        </a>
      </Text>
      <Text style={paragraph}>
        <strong>Important:</strong> This invitation link will expire in{" "}
        {exp("linkExpirationFormatter(linkExpiration)")}.
      </Text>
      <Text style={paragraph}>
        {isDataPlatform
          ? "If you have questions about data usage policies or technical requirements, please contact odl-data@mit.edu."
          : `If you did not expect this invitation or have any questions, please contact the ${exp("realmName")} support team.`}
      </Text>
    </EmailLayout>
  )
}

export const getTemplate: GetTemplate = async props => {
  return await render(<Template {...props} />, { plainText: props.plainText })
}

export const getSubject: GetSubject = async () => {
  return "Invitation to join {0} - Action Required"
}
