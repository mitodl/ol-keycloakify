import { useState } from "react"
import { clsx } from "keycloakify/tools/clsx"
import type { PageProps } from "keycloakify/login/pages/PageProps"
import type { KcContext } from "../KcContext"
import type { I18n } from "../i18n"
import { Link, Label, Input, Button, Form, ValidationMessage, Info, SocialProviderButtonLink, OrBar } from "../components/Elements"
import mitLogo from "../components/mit-logo.svg"

export default function LoginUsername(props: PageProps<Extract<KcContext, { pageId: "login-username.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props

  const { social, realm, url, usernameHidden, login, registrationDisabled, messagesPerField, loginAttempt } = kcContext

  const { msg } = i18n

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false)

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      displayMessage={!messagesPerField.existsError("username")}
      displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
      headerNode={loginAttempt?.userFullname ? msg("loginGreeting", loginAttempt.userFullname) : msg("loginAccountTitle")}
      infoNode={
        <div id="kc-registration">
          <Info>
            {msg("noAccount")}
            <Link tabIndex={6} href={url.registrationUrl}>
              {msg("doRegister")}
            </Link>
          </Info>
        </div>
      }
      socialProvidersNode={
        <>
          {realm.password && social?.providers !== undefined && social.providers.length !== 0 && (
            <div id="kc-social-providers">
              <OrBar />
              {social.providers.map(p => (
                <SocialProviderButtonLink key={p.alias} id={`social-${p.alias}`} type="button" href={p.loginUrl} variant="bordered" size="large">
                  {p.iconClasses && <i className={clsx(p.iconClasses)} aria-hidden="true"></i>}
                  {p.alias === "touchstone-idp" ? <img src={mitLogo} alt="MIT Logo" width={29} /> : null}
                  <span className={clsx(p.iconClasses && "kc-social-icon-text")}>{p.displayName}</span>
                </SocialProviderButtonLink>
              ))}
            </div>
          )}
        </>
      }
    >
      <div id="kc-form">
        <div id="kc-form-wrapper">
          {realm.password && (
            <Form
              id="kc-form-login"
              onSubmit={() => {
                setIsLoginButtonDisabled(true)
                return true
              }}
              action={url.loginAction}
              method="post"
            >
              {!usernameHidden && (
                <div>
                  <Label htmlFor="username">
                    {!realm.loginWithEmailAllowed ? msg("username") : !realm.registrationEmailAsUsername ? msg("usernameOrEmail") : msg("email")}
                  </Label>
                  <Input
                    tabIndex={2}
                    id="username"
                    name="username"
                    defaultValue={login.username ?? ""}
                    type="text"
                    autoFocus
                    autoComplete="username"
                    aria-invalid={messagesPerField.existsError("username")}
                  />
                  {messagesPerField.existsError("username") && (
                    <ValidationMessage id="input-error" aria-live="polite">
                      {messagesPerField.getFirstError("username")}
                    </ValidationMessage>
                  )}
                </div>
              )}
              <div id="kc-form-buttons">
                <Button tabIndex={4} disabled={isLoginButtonDisabled} name="login" id="kc-login" type="submit" size="large">
                  Next
                </Button>
              </div>
            </Form>
          )}
        </div>
      </div>
    </Template>
  )
}
