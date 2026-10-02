import { styled } from "@mui/material/styles"
import { kcSanitize } from "keycloakify/lib/kcSanitize"
import type { PageProps } from "keycloakify/login/pages/PageProps"
import { Link, Paragraph } from "../components/Elements"
import type { I18n } from "../i18n"
import type { KcContext } from "../KcContext"

const BackLink = styled(Paragraph)(({ theme }) => ({
  marginTop: theme.spacing(4)
}))

/**
 * Keycloak's generic success/info page, reached at the end of several flows --
 * confirming an email change, verifying an address, an admin-triggered action.
 *
 * Overridden only to add a way out. Keycloak's own page offers a link back when
 * it knows where "back" is (`pageRedirectUri`, `actionUri`, or the client's
 * base URL), but an action token opened from an email arrives with no client
 * session, so none of those is set and the page is a dead end: the reader is
 * told their email changed and left with nowhere to go. The realm's home URL
 * is the fallback for exactly that case.
 *
 * The order below is Keycloak's, with ours appended rather than preferred:
 * where Keycloak does know which application the reader came from, that is a
 * better destination than the front door.
 */
export default function Info(props: PageProps<Extract<KcContext, { pageId: "info.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props

  const { messageHeader, message, requiredActions, skipLink, pageRedirectUri, actionUri, client, olSettings } = kcContext

  const { msg, advancedMsgStr } = i18n

  /**
   * `olSettings.homeUrl` is the realm's `olCanonicalHomeUrl` attribute, and the
   * provider substitutes the literal `"#"` when that attribute is not set --
   * see `OLSettingsBean` in mitodl/ol-keycloak. Linking to `"#"` would put a
   * "Back to MIT Learn" link on the page that goes nowhere, which is worse
   * than offering none, so an unconfigured realm counts as having no home URL.
   */
  const homeUrl = olSettings?.homeUrl && olSettings.homeUrl !== "#" ? olSettings.homeUrl : undefined

  /**
   * `skipLink` is how a flow says it is mid-sequence and must not offer an exit
   * -- so it suppresses ours too, not only Keycloak's.
   */
  const backLink = (() => {
    if (skipLink) {
      return null
    }
    if (pageRedirectUri) {
      return { href: pageRedirectUri, label: msg("backToApplication") }
    }
    if (actionUri) {
      return { href: actionUri, label: msg("proceedWithAction") }
    }
    if (client?.baseUrl) {
      return { href: client.baseUrl, label: msg("backToApplication") }
    }
    if (homeUrl) {
      return { href: homeUrl, label: msg("backToLearn") }
    }
    return null
  })()

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      displayMessage={false}
      headerNode={kcSanitize(messageHeader ? advancedMsgStr(messageHeader) : message.summary)}
    >
      <div id="kc-info-message">
        {/*
          Sanitised and rendered as text, as `Error.tsx` does with the same
          field: a message carrying markup shows it literally rather than
          formatted, which is the trade for not handing Keycloak's strings to
          `dangerouslySetInnerHTML`. The ones this page shows in practice --
          `emailUpdated` and its siblings -- are plain sentences.
        */}
        <Paragraph className="instruction">
          {kcSanitize(message.summary?.trim() ?? "")}
          {requiredActions ? (
            <>
              {" "}
              <strong>{requiredActions.map(action => advancedMsgStr(`requiredAction.${action}`)).join(", ")}</strong>
            </>
          ) : null}
        </Paragraph>
        {backLink ? (
          <BackLink>
            <Link id="backToApplication" href={backLink.href}>
              {backLink.label}
            </Link>
          </BackLink>
        ) : null}
      </div>
    </Template>
  )
}
