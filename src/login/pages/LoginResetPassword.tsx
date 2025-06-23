import { kcSanitize } from "keycloakify/lib/kcSanitize"
import type { PageProps } from "keycloakify/login/pages/PageProps"
import type { KcContext } from "../KcContext"
import type { I18n } from "../i18n"
import { Button, Input, Label, Form, ValidationMessage, Subtitle } from "../components/Elements"

export default function LoginResetPassword(props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props

  const { url, realm, auth, messagesPerField } = kcContext

  const { msg, msgStr } = i18n

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
      <Form id="kc-reset-password-form" action={url.loginAction} method="post">
        <div>
          <div>
            <Label htmlFor="username">
              {!realm.loginWithEmailAllowed ? msg("username") : !realm.registrationEmailAsUsername ? msg("usernameOrEmail") : msg("email")}
            </Label>
          </div>
          <div>
            <Input
              type="text"
              id="username"
              name="username"
              autoFocus
              defaultValue={auth.attemptedUsername ?? ""}
              aria-invalid={messagesPerField.existsError("username")}
            />
            {messagesPerField.existsError("username") && (
              <ValidationMessage
                id="input-error-username"
                aria-live="polite"
                dangerouslySetInnerHTML={{
                  __html: kcSanitize(messagesPerField.get("username"))
                }}
              />
            )}
          </div>
        </div>
        <div>
          <div id="kc-form-buttons">
            <Button type="submit" size="large">
              {msgStr("doResetPasswordSubmit")}
            </Button>
          </div>
        </div>
      </Form>
    </Template>
  )
}
