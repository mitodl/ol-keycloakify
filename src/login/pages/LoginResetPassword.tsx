import { useState } from "react"
import type { PageProps } from "keycloakify/login/pages/PageProps"
import type { KcContext } from "../KcContext"
import type { I18n } from "../i18n"
import { Button, Form, Subtitle, StyledTextField } from "../components/Elements"
import { isValidEmail } from "../utils/emailValidation"

export default function LoginResetPassword(props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props

  const { url, realm, messagesPerField } = kcContext

  const { msg, msgStr } = i18n

  const [usernameError, setUsernameError] = useState<string>("")
  const [username, setUsername] = useState("")

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
          if (usernameInput && !isValidEmail(usernameInput.value)) {
            setUsernameError("Invalid email address")
            return false
          }
          return true
        }}
      >
        <StyledTextField
          id="username"
          label={!realm.loginWithEmailAllowed ? msg("username") : !realm.registrationEmailAsUsername ? msg("usernameOrEmail") : msg("email")}
          name="username"
          type="text"
          fullWidth
          value={username}
          InputProps={{
            autoComplete: "on",
            "aria-invalid": messagesPerField.existsError("username") || usernameError !== ""
          }}
          errorText={usernameError || messagesPerField.get("username")}
          error={messagesPerField.existsError("username") || usernameError !== ""}
          onChange={(e) => {
            setUsername(e.target.value)
            setUsernameError("")
          }}
          onBlur={() => {
            if (username && !isValidEmail(username)) {
              setUsernameError("Invalid email address")
            } else {
              setUsernameError("")
            }
          }}
        />
        <div id="kc-form-buttons">
          <Button disabled={!username || !isValidEmail(username)} type="submit" size="large">
            {msgStr("doResetPasswordSubmit")}
          </Button>
        </div>
      </Form>
    </Template>
  )
}
