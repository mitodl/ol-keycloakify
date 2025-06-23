import { useState } from "react"
import { kcSanitize } from "keycloakify/lib/kcSanitize"
import type { PageProps } from "keycloakify/login/pages/PageProps"
import type { KcContext } from "../KcContext"
import type { I18n } from "../i18n"
import { Link, ValidationMessage, Form, Button, Input, Label } from "../components/Elements"
import { PasswordWrapper } from "../components/PasswordWrapper"

export default function LoginPassword(props: PageProps<Extract<KcContext, { pageId: "login-password.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props

  const { realm, url, messagesPerField, loginAttempt } = kcContext

  const { msg } = i18n

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false)

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      headerNode={loginAttempt?.userFullname ? msg("loginGreeting", loginAttempt.userFullname) : msg("loginAccountTitle")}
      displayMessage={!messagesPerField.existsError("password")}
    >
      <div id="kc-form">
        <div id="kc-form-wrapper">
          <Form
            id="kc-form-login"
            onSubmit={() => {
              setIsLoginButtonDisabled(true)
              return true
            }}
            action={url.loginAction}
            method="post"
          >
            <div>
              <Label htmlFor="password">{msg("password")}</Label>

              <PasswordWrapper i18n={i18n} passwordInputId="password">
                <Input
                  tabIndex={2}
                  id="password"
                  name="password"
                  type="password"
                  autoFocus
                  autoComplete="on"
                  aria-invalid={messagesPerField.existsError("username", "password")}
                />
              </PasswordWrapper>

              {messagesPerField.existsError("password") && (
                <ValidationMessage
                  id="input-error-password"
                  aria-live="polite"
                  dangerouslySetInnerHTML={{
                    __html: kcSanitize(messagesPerField.get("password"))
                  }}
                />
              )}
            </div>
            <div>
              <div id="kc-form-options" />
              <div>
                {realm.resetPasswordAllowed && (
                  <span>
                    <Link tabIndex={5} href={url.loginResetCredentialsUrl}>
                      {msg("doForgotPassword")}
                    </Link>
                  </span>
                )}
              </div>
            </div>
            <div id="kc-form-buttons">
              <Button tabIndex={4} name="login" id="kc-login" type="submit" disabled={isLoginButtonDisabled} size="large">
                Next
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Template>
  )
}
