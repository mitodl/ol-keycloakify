import { useEffect } from "react"
import { kcSanitize } from "keycloakify/lib/kcSanitize"
import type { TemplateProps } from "keycloakify/login/TemplateProps"
import { useInitialize } from "keycloakify/login/Template.useInitialize"
import type { I18n } from "./i18n"
import type { KcContext } from "./KcContext"
import Logos from "./components/Logos"
import styled from "@emotion/styled"
import Typography from "@mui/material/Typography"
import { Info, Link, Alert, FooterLink } from "./components/Elements"

const Container = styled.div({
  width: "600px",
  maxWidth: "600px",
  minHeight: "1152px",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  margin: "0 auto"
})

const Header = styled.header({
  paddingBlockStart: "80px",
  paddingInlineEnd: "32px",
  paddingInlineStart: "32px"
})

const Title = styled(Typography)({
  fontWeight: "normal"
})

const Content = styled.div({
  paddingInlineStart: "32px",
  paddingInlineEnd: "32px"
})

const Card = styled.div({
  display: "flex",
  flexDirection: "column",
  margin: "auto",
  padding: "0 16px 16px",
  gap: "24px",
  width: "100%"
})

const Footer = styled.footer(({ theme }) => ({
  ...theme.typography.body3,
  textAlign: "center",
  color: theme.custom.colors.silverGrayDark,
  display: "flex",
  flexDirection: "column",
  gap: "10px"
}))

export default function Template(props: TemplateProps<KcContext, I18n>) {
  const {
    displayInfo = false,
    displayMessage = true,
    displayRequiredFields = false,
    headerNode,
    socialProvidersNode = null,
    infoNode = null,
    documentTitle,
    kcContext,
    i18n,
    doUseDefaultCss,
    children
  } = props

  const { msg, msgStr } = i18n

  const { realm, auth, url, message, isAppInitiatedAction, olSettings } = kcContext

  useEffect(() => {
    document.title = documentTitle ?? msgStr("loginTitle", realm.displayName)
  }, [])

  const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss })

  if (!isReadyToRender) {
    return null
  }

  return (
    <Container>
      <Card>
        <Header>
          <Logos homeUrl={olSettings?.homeUrl} />
          {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
          {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
            <div className={`alert-${message.type} pf-m-${message?.type === "error" ? "danger" : message.type}`}>
              <Alert severity={message.type}>{kcSanitize(message.summary)}</Alert>
            </div>
          )}
          {(() => {
            const node = (
              <Title id="kc-page-title" variant="h4">
                {headerNode}
              </Title>
            )

            if (displayRequiredFields) {
              return (
                <div>
                  <div className="subtitle">
                    <span className="subtitle">
                      <span className="required">*</span>
                      {msg("requiredFields")}
                    </span>
                  </div>
                  <div className="col-md-10">{node}</div>
                </div>
              )
            }

            return node
          })()}
        </Header>
        <Content id="kc-content">
          <div id="kc-content-wrapper">
            {children}
            {auth !== undefined && auth.showTryAnotherWayLink && (
              <form id="kc-select-try-another-way-form" action={url.loginAction} method="post">
                <Info>
                  <input type="hidden" name="tryAnotherWay" value="on" />
                  <Link
                    href="#"
                    id="try-another-way"
                    onClick={() => {
                      document.forms["kc-select-try-another-way-form" as never].submit()
                      return false
                    }}
                  >
                    {msg("doTryAnotherWay")}
                  </Link>
                </Info>
              </form>
            )}
            {displayInfo && (
              <div id="kc-info">
                <div id="kc-info-wrapper">{infoNode}</div>
              </div>
            )}
            {socialProvidersNode}
          </div>
        </Content>
        <Footer>
          <div>
            <strong>MIT Learn</strong> • 77 Massachusetts Avenue • Cambridge, MA 02139 • USA
          </div>
          <div>{olSettings?.termsOfServiceUrl ? <FooterLink href={olSettings?.termsOfServiceUrl}>{msg("termsOfService")}</FooterLink> : null}</div>
        </Footer>
      </Card>
    </Container>
  )
}
