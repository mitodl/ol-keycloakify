import { ThemeProvider } from "@mitodl/smoot-design"
import type { ClassKey } from "keycloakify/login"
import DefaultPage from "keycloakify/login/DefaultPage"
import { Suspense } from "react"
import { GlobalStyles } from "./components/GlobalStyles"
import { useI18n } from "./i18n"
import type { KcContext } from "./KcContext"
// biome-ignore lint/suspicious/noShadowRestrictedNames: Keycloakify page name convention
import Error from "./pages/Error"
import Login from "./pages/Login"
import LoginPageExpired from "./pages/LoginPageExpired"
import LoginPassword from "./pages/LoginPassword"
import LoginResetPassword from "./pages/LoginResetPassword"
import LoginUpdatePassword from "./pages/LoginUpdatePassword"
import LoginUsername from "./pages/LoginUsername"
import LoginVerifyEmail from "./pages/LoginVerifyEmail"
import Register from "./pages/Register"
import UpdateEmail from "./pages/UpdateEmail"
import Template from "./Template"
import UserProfileFormFields from "./UserProfileFormFields"

const doMakeUserConfirmPassword = true

export default function KcPage(props: { kcContext: KcContext }) {
  const { kcContext } = props

  const { i18n } = useI18n({ kcContext })

  return (
    <Suspense>
      <ThemeProvider>
        <GlobalStyles />
        {(() => {
          switch (kcContext.pageId) {
            case "login.ftl":
              return (
                <Login
                  {...{ kcContext, i18n, classes }}
                  Template={Template}
                  doUseDefaultCss={false}
                />
              )
            case "login-username.ftl":
              return (
                <LoginUsername
                  {...{ kcContext, i18n, classes }}
                  Template={Template}
                  doUseDefaultCss={false}
                />
              )
            case "login-password.ftl":
              return (
                <LoginPassword
                  {...{ kcContext, i18n, classes }}
                  Template={Template}
                  doUseDefaultCss={false}
                />
              )
            case "register.ftl":
              return (
                <Register
                  {...{ kcContext, i18n, classes }}
                  Template={Template}
                  doUseDefaultCss={false}
                  UserProfileFormFields={UserProfileFormFields}
                  doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                />
              )
            case "login-reset-password.ftl":
              return (
                <LoginResetPassword
                  {...{ kcContext, i18n, classes }}
                  Template={Template}
                  doUseDefaultCss={false}
                />
              )
            case "login-update-password.ftl":
              return (
                <LoginUpdatePassword
                  {...{ kcContext, i18n, classes }}
                  Template={Template}
                  doUseDefaultCss={false}
                />
              )
            case "login-verify-email.ftl":
              return (
                <LoginVerifyEmail
                  {...{ kcContext, i18n, classes }}
                  Template={Template}
                  doUseDefaultCss={false}
                />
              )
            case "login-page-expired.ftl":
              return (
                <LoginPageExpired
                  {...{ kcContext, i18n, classes }}
                  Template={Template}
                  doUseDefaultCss={false}
                />
              )
            case "update-email.ftl":
              return (
                <UpdateEmail
                  {...{ kcContext, i18n, classes }}
                  Template={Template}
                  doUseDefaultCss={false}
                  UserProfileFormFields={UserProfileFormFields}
                  doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                />
              )
            case "error.ftl":
              return (
                <Error
                  {...{ kcContext, i18n, classes }}
                  Template={Template}
                  doUseDefaultCss={false}
                />
              )
            default:
              return (
                <DefaultPage
                  kcContext={kcContext}
                  i18n={i18n}
                  classes={classes}
                  Template={Template}
                  doUseDefaultCss={false}
                  UserProfileFormFields={UserProfileFormFields}
                  doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                />
              )
          }
        })()}
      </ThemeProvider>
    </Suspense>
  )
}

const classes = {} satisfies { [key in ClassKey]?: string }
