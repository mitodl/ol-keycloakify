import { useState, useRef, useEffect, useCallback } from "react"
import { clsx } from "keycloakify/tools/clsx"
import type { PageProps } from "keycloakify/login/pages/PageProps"
import type { KcContext } from "../KcContext"
import type { I18n } from "../i18n"
import { Button, Form, SocialProviderButtonLink, OrBar, StyledTextField, ValidationMessage } from "../components/Elements"
import mitLogo from "../components/mit-logo.svg"

const isValidEmail = (email: string): boolean => {
  if (!email || !email.trim()) return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim())
}

export default function LoginUsername(props: PageProps<Extract<KcContext, { pageId: "login-username.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props

  const { social, realm, url, usernameHidden, login, registrationDisabled, messagesPerField, loginAttempt } = kcContext

  const [username, setUsername] = useState(login.username ?? "")

  const { msg, msgStr } = i18n

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emailInvalid, setEmailInvalid] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(true)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const shouldValidateEmail = realm.loginWithEmailAllowed

  const checkValidity = useCallback(() => {
    if (inputRef.current && shouldValidateEmail && username.trim()) {
      const valid = isValidEmail(username.trim())
      setIsEmailValid(isValidEmail(username.trim()))
      return valid
    }
    if (!username.trim()) {
      setIsEmailValid(true)
      return true
    }
    setIsEmailValid(true)
    return true
  }, [shouldValidateEmail, username])

  const isSubmitDisabled = isSubmitting || !username.trim() || (shouldValidateEmail && !isEmailValid)

  useEffect(() => {
    if (shouldValidateEmail) {
      checkValidity()
    }
  }, [username, shouldValidateEmail, checkValidity])

  useEffect(() => {
    const input = inputRef.current
    if (!input || !shouldValidateEmail) return

    const handleInvalid = (e: Event) => {
      e.preventDefault() // Prevent browser's default validation message
      if (!isFocused && username.trim()) {
        setEmailInvalid(true)
      }
    }

    input.addEventListener("invalid", handleInvalid)

    return () => {
      input.removeEventListener("invalid", handleInvalid)
    }
  }, [shouldValidateEmail, isFocused, username])

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
                <div>
                  <StyledTextField
                    id="username"
                    label={
                      !realm.loginWithEmailAllowed ? msg("username") : !realm.registrationEmailAsUsername ? msg("usernameOrEmail") : msg("email")
                    }
                    name="username"
                    type="email"
                    fullWidth
                    InputProps={{
                      autoFocus: true,
                      autoComplete: "username",
                      "aria-invalid": messagesPerField.existsError("username") || emailInvalid
                    }}
                    inputProps={{
                      ref: inputRef,
                      onFocus: () => {
                        setIsFocused(true)
                        setEmailInvalid(false)
                      },
                      onBlur: () => {
                        setIsFocused(false)
                        const isValid = checkValidity()
                        if (!isValid && username.trim()) {
                          setEmailInvalid(true)
                        }
                      }
                    }}
                    errorText={messagesPerField.getFirstError("username")}
                    error={messagesPerField.existsError("username") || emailInvalid}
                    onChange={e => {
                      setUsername(e.target.value.trim())
                      const isValid = checkValidity()
                      if (isValid) {
                        setEmailInvalid(false)
                      }
                    }}
                    value={username}
                  />
                  {emailInvalid && !isFocused && (
                    <ValidationMessage id="form-help-text-after-username" aria-live="polite">
                      {msgStr("invalidEmailMessage")}
                    </ValidationMessage>
                  )}
                </div>
              )}
              <div id="kc-form-buttons">
                <Button disabled={isSubmitDisabled} name="login" id="kc-login" type="submit" size="large">
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
