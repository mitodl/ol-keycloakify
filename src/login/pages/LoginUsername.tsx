import { useState } from "react"
import { clsx } from "keycloakify/tools/clsx"
import type { PageProps } from "keycloakify/login/pages/PageProps"
import type { KcContext } from "../KcContext"
import type { I18n } from "../i18n"
import { Form, SocialProviderButtonLink, OrBar, StyledTextField, Button } from "../components/Elements"
import mitLogo from "../components/mit-logo.svg"
import { isValidEmail } from "../utils/emailValidation"

export default function LoginUsername(props: PageProps<Extract<KcContext, { pageId: "login-username.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props

  const { social, realm, url, usernameHidden, login, registrationDisabled, messagesPerField, loginAttempt } = kcContext

  const [username, setUsername] = useState(login.username ?? "")
  const [usernameError, setUsernameError] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { msg, msgStr } = i18n

  const shouldValidateEmail = realm.loginWithEmailAllowed

  // Compute button disabled state based on username validity and realm config
  // Button is disabled if:
  // 1. Form is being submitted
  // 2. Username field is empty
  // 3. Email validation is required and email is invalid
  const isButtonDisabled = isSubmitting || !username.trim() || (shouldValidateEmail && !isValidEmail(username))

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      displayMessage={!messagesPerField.existsError("username")}
      displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
      headerNode={loginAttempt?.userFullname ? msg("loginGreeting", loginAttempt.userFullname) : msg("loginAccountTitle")}
      socialProvidersNode={
        <>
          {realm.password && social?.providers !== undefined && social.providers.length !== 0 && (
            <div id="kc-social-providers">
              <OrBar />
              {social.providers.map(p => (
                <SocialProviderButtonLink key={p.alias} id={`social-${p.alias}`} type="button" href={p.loginUrl} variant="bordered" size="large">
                  {p.iconClasses && <i className={clsx(p.iconClasses)} aria-hidden="true"></i>}
                  {p.alias === "touchstone-idp" ? <img src={mitLogo} width={40} /> : null}
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
                // Validate email if email-based login is enabled
                if (shouldValidateEmail && !isValidEmail(username)) {
                  setUsernameError(msgStr("invalidEmailMessage"))
                  return false
                }
                if (realm.registrationEmailAsUsername && username) {
                  sessionStorage.setItem("email", username.trim())
                }
                setIsSubmitting(true)
                return true
              }}
              action={url.loginAction}
              method="post"
            >
              {!usernameHidden && (
                <StyledTextField
                  id="username"
                  label={!realm.loginWithEmailAllowed ? msg("username") : !realm.registrationEmailAsUsername ? msg("usernameOrEmail") : msg("email")}
                  name="username"
                  type="text"
                  fullWidth
                  InputProps={{
                    value: username,
                    autoFocus: true,
                    autoComplete: "username",
                    "aria-invalid": messagesPerField.existsError("username") || usernameError !== ""
                  }}
                  errorText={usernameError || messagesPerField.getFirstError("username")}
                  error={messagesPerField.existsError("username") || usernameError !== ""}
                  onChange={e => {
                   const value = e.target.value.trim()
                   setUsername(value)
                   // Clear error when user types a valid email
                   if (shouldValidateEmail && value && isValidEmail(value)) {
                     setUsernameError("")
                   }
                  }}
                  onBlur={() => {
                    // Only validate if email-based login is enabled
                    if (shouldValidateEmail && username && !isValidEmail(username)) {
                      setUsernameError(msgStr("invalidEmailMessage"))
                    } else {
                      setUsernameError("")
                    }
                  }}
                />
              )}
              <div id="kc-form-buttons">
                <Button disabled={isButtonDisabled} name="login" id="kc-login" type="submit" size="large">
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
