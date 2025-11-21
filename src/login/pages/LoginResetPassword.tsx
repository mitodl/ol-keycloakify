import { useState } from "react"
import type { PageProps } from "keycloakify/login/pages/PageProps"
import type { KcContext } from "../KcContext"
import type { I18n } from "../i18n"
import { Form, Subtitle, StyledTextField } from "../components/Elements"
import { isValidEmail } from "../utils/emailValidation"

export default function LoginResetPassword(props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props

  const { url, realm, messagesPerField } = kcContext

  const { msg, msgStr } = i18n

  const [usernameError, setUsernameError] = useState<string>("")
  const [username, setUsername] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const shouldValidateEmail = realm.loginWithEmailAllowed

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      displayInfo
      displayMessage={!messagesPerField.existsError("username")}
      headerNode={msg("emailForgotTitle")}
    >
      <Subtitle>{realm.duplicateEmailsAllowed ? msg("emailInstructionUsername") : msg("emailInstruction")}</Subtitle>
      <Form
        id="kc-reset-password-form"
        action={url.loginAction}
        method="post"
        onSubmit={() => {
           const usernameInput = document.getElementById("username") as HTMLInputElement
           if (usernameInput && shouldValidateEmail && !isValidEmail(usernameInput.value)) {
             setUsernameError(msgStr("invalidEmailMessage"))
             return false
           }
           setIsSubmitting(true)
           return true
         }}
      >
        <StyledTextField
          id="username"
          label={!realm.loginWithEmailAllowed ? msg("username") : !realm.registrationEmailAsUsername ? msg("usernameOrEmail") : msg("email")}
          name="username"
          type="text"
          fullWidth
          InputProps={{
            value: username,
            autoComplete: "on",
            "aria-invalid": messagesPerField.existsError("username") || usernameError !== ""
          }}
          errorText={usernameError || messagesPerField.get("username")}
          error={messagesPerField.existsError("username") || usernameError !== ""}
          onChange={(e) => {
            const value = e.target.value
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
        <div id="kc-form-buttons">
          <button 
            type="submit" 
            disabled={isSubmitting || !username.trim() || (shouldValidateEmail && !isValidEmail(username))}
            className="css-1qfsvrq"
          >
            {msgStr("doResetPasswordSubmit")}
          </button>
        </div>
      </Form>
    </Template>
  )
}
