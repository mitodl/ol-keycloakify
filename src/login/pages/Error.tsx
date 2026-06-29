import { styled } from "@mui/material/styles"
import { kcSanitize } from "keycloakify/lib/kcSanitize"
import type { PageProps } from "keycloakify/login/pages/PageProps"
import { Alert, Link, Paragraph } from "../components/Elements"
import type { I18n } from "../i18n"
import type { KcContext } from "../KcContext"

const StyledAlert = styled(Alert)({
  marginBottom: "60px"
})

// biome-ignore lint/suspicious/noShadowRestrictedNames: Keycloakify page name convention
export default function Error(props: PageProps<Extract<KcContext, { pageId: "error.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props

  const { message, url } = kcContext

  const { msg } = i18n

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      displayMessage={false}
      headerNode={msg("errorTitle")}
    >
      <StyledAlert severity={message.type}>{kcSanitize(message.summary)}</StyledAlert>
      <Paragraph>
        {msg("pageExpiredMsg1")}{" "}
        <Link id="loginRestartLink" href={url.loginRestartFlowUrl}>
          {msg("doClickHere")}
        </Link>
      </Paragraph>
    </Template>
  )
}
