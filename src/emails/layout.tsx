import { Body, Column, Head, Hr, Html, Img, Preview, Row, Section, Text } from "jsx-email"
import { PropsWithChildren, ReactNode } from "react"

// keycloakify-emails copies assets from assetsDirPath into the theme jar.
// In production Keycloak uses ${url.resourcesUrl} to serve them; the jsx-email
// preview server serves them from /assets. import.meta.isJsxEmailPreview is
// replaced at compile time by jsx-email / keycloakify-emails esbuild step.
const baseUrl = import.meta.isJsxEmailPreview ? "/assets" : "${url.resourcesUrl}"

const main = {
  backgroundColor: "#F3F4F8",
  fontFamily: "neue-haas-grotesk-text, sans-serif"
}

const card = {
  backgroundColor: "#FFFFFF",
  margin: "0px auto",
  borderRadius: "8px",
  maxWidth: "600px"
}

const headerRow = {
  borderBottom: "1px solid #DDE1E6",
  padding: "20px 0"
}

const logoCell = {
  padding: "0 25px"
}

const contentCell = {
  padding: "10px 25px",
  fontFamily: "neue-haas-grotesk-text, sans-serif",
  fontSize: "13px",
  lineHeight: "18px",
  color: "#212326"
}

const footerDivider = {
  borderTop: "1px solid #DDE1E6",
  margin: "0px auto",
  width: "100%"
}

const footerText = {
  fontFamily: "neue-haas-grotesk-text, sans-serif",
  fontSize: "12px",
  lineHeight: "18px",
  textAlign: "center" as const,
  color: "#212326",
  padding: "10px 25px 20px"
}

export const EmailLayout = ({
  locale,
  children,
  preview,
  realmName
}: PropsWithChildren<{ preview: ReactNode; locale: string; realmName?: string }>) => {
  return (
    <Html lang={locale}>
      <Head>
        {/* Adobe Neue Haas Grotesk — loads in non-Outlook clients */}
        <link
          href="https://use.typekit.net/lbk1xay.css"
          rel="stylesheet"
          type="text/css"
        />
      </Head>
      <Preview>{preview}</Preview>
      <Body style={main}>
        <Section style={card}>
          {/* Header: MIT Learn logo (left) + MIT logo (right) */}
          <Row style={headerRow}>
            <Column style={logoCell}>
              <a href="https://learn.mit.edu">
                <Img
                  src={`${baseUrl}/mit-learn-logo.png`}
                  height={24}
                  width={132}
                  alt="MIT Learn"
                />
              </a>
            </Column>
            <Column style={{ ...logoCell, textAlign: "right" as const }}>
              <a href="https://mit.edu">
                <Img
                  src={`${baseUrl}/mit-logo-black.png`}
                  height={24}
                  width={45}
                  alt="MIT"
                />
              </a>
            </Column>
          </Row>

          {/* Content */}
          <Row>
            <Column style={contentCell}>{children}</Column>
          </Row>

          {/* Footer */}
          <Row>
            <Column style={{ padding: "20px 25px 0" }}>
              <Hr style={footerDivider} />
            </Column>
          </Row>
          <Row>
            <Column>
              <Text style={footerText}>
                <strong>{realmName ?? "MIT Learn"}</strong> &bull; 77 Massachusetts Ave
                &bull; Cambridge, MA 02139 &bull; USA
              </Text>
            </Column>
          </Row>
        </Section>
      </Body>
    </Html>
  )
}

export default EmailLayout
export const Template = EmailLayout
