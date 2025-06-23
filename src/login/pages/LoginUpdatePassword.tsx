import { kcSanitize } from "keycloakify/lib/kcSanitize"
import type { PageProps } from "keycloakify/login/pages/PageProps"
import type { KcContext } from "../KcContext"
import type { I18n } from "../i18n"
import { Input, Label, ValidationMessage, Button, Form } from "../components/Elements"
import { PasswordWrapper } from "../components/PasswordWrapper"

export default function LoginUpdatePassword(props: PageProps<Extract<KcContext, { pageId: "login-update-password.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props

  const { msg } = i18n

  const { url, messagesPerField, isAppInitiatedAction } = kcContext

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      displayMessage={!messagesPerField.existsError("password", "password-confirm")}
      headerNode={msg("updatePasswordTitle")}
    >
      <Form id="kc-passwd-update-form" action={url.loginAction} method="post">
        <div>
          <div>
            <Label htmlFor="password-new">{msg("passwordNew")}</Label>
          </div>
          <div>
            <PasswordWrapper i18n={i18n} passwordInputId="password-new">
              <Input
                type="password"
                id="password-new"
                name="password-new"
                autoFocus
                autoComplete="new-password"
                aria-invalid={messagesPerField.existsError("password", "password-confirm")}
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
        </div>

        <div>
          <div>
            <Label htmlFor="password-confirm">{msg("passwordConfirm")}</Label>
          </div>
          <div>
            <PasswordWrapper i18n={i18n} passwordInputId="password-confirm">
              <Input
                type="password"
                id="password-confirm"
                name="password-confirm"
                autoFocus
                autoComplete="new-password"
                aria-invalid={messagesPerField.existsError("password", "password-confirm")}
              />
            </PasswordWrapper>

            {messagesPerField.existsError("password-confirm") && (
              <ValidationMessage
                id="input-error-password-confirm"
                aria-live="polite"
                dangerouslySetInnerHTML={{
                  __html: kcSanitize(messagesPerField.get("password-confirm"))
                }}
              />
            )}
          </div>
        </div>
        <div>
          <div id="kc-form-buttons">
            <Button type="submit">{msg("doSubmit")}</Button>
            {isAppInitiatedAction && (
              <Button type="submit" name="cancel-aia" value="true" style={{ marginTop: "16px" }}>
                {msg("doCancel")}
              </Button>
            )}
          </div>
        </div>
      </Form>
    </Template>
  )
}
