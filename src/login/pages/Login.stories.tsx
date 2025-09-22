import type { StoryObj } from "@storybook/react-vite"
import { createKcPageStory } from "../KcPageStory"
import { enTranslations } from "../i18n"

const { KcPageStory } = createKcPageStory({ pageId: "login.ftl" })

const meta = {
  title: "login/login.ftl",
  component: KcPageStory
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <KcPageStory />
}

export const WithGreeting: Story = {
  render: () => (
    <KcPageStory
      kcContext={{
        olSettings: {
          homeUrl: "https://learn.mit.edu/"
        },
        loginAttempt: {
          userFullname: "First Last"
        }
      }}
    />
  )
}

export const WithNeedsPassword: Story = {
  render: () => (
    <KcPageStory
      kcContext={{
        realm: { resetPasswordAllowed: true },
        loginAttempt: {
          userFullname: "First Last",
          hasSocialProviderAuth: false,
          needsPassword: true
        }
      }}
    />
  )
}

export const WithNeedsPasswordNoReset: Story = {
  render: () => (
    <KcPageStory
      kcContext={{
        realm: { resetPasswordAllowed: false },
        loginAttempt: {
          userFullname: "First Last",
          hasSocialProviderAuth: false,
          needsPassword: true
        }
      }}
    />
  )
}

export const WithInvalidCredential: Story = {
  render: () => (
    <KcPageStory
      kcContext={{
        login: {
          username: "johndoe"
        },
        messagesPerField: {
          // NOTE: The other functions of messagesPerField are derived from get() and
          // existsError() so they are the only ones that need to mock.
          existsError: (fieldName: string, ...otherFieldNames: string[]) => {
            const fieldNames = [fieldName, ...otherFieldNames]
            return fieldNames.includes("username") || fieldNames.includes("password")
          },
          get: (fieldName: string) => {
            if (fieldName === "username" || fieldName === "password") {
              return enTranslations.invalidPasswordMessage
            }
            return ""
          }
        }
      }}
    />
  )
}

export const WithoutRegistration: Story = {
  render: () => (
    <KcPageStory
      kcContext={{
        realm: { registrationAllowed: false }
      }}
    />
  )
}

export const WithoutRememberMe: Story = {
  render: () => (
    <KcPageStory
      kcContext={{
        realm: { rememberMe: false }
      }}
    />
  )
}

export const WithoutPasswordReset: Story = {
  render: () => (
    <KcPageStory
      kcContext={{
        realm: { resetPasswordAllowed: false }
      }}
    />
  )
}

export const WithEmailAsUsername: Story = {
  render: () => (
    <KcPageStory
      kcContext={{
        realm: { loginWithEmailAllowed: false }
      }}
    />
  )
}

export const WithPresetUsername: Story = {
  render: () => (
    <KcPageStory
      kcContext={{
        login: { username: "max.mustermann@mail.com" }
      }}
    />
  )
}

export const WithUsernameHidden: Story = {
  render: () => (
    <KcPageStory
      kcContext={{
        usernameHidden: true,
        loginAttempt: {
          userFullname: "First Last"
        }
      }}
    />
  )
}

export const WithUsernameHiddenPasswordError: Story = {
  render: () => (
    <KcPageStory
      kcContext={{
        usernameHidden: true,
        loginAttempt: {
          userFullname: "First Last"
        },
        message: {
          summary: enTranslations.invalidPasswordMessage,
          type: "error"
        },
        messagesPerField: {
          existsError: (field: string) => field === "password",
          get: (field: string) => (field === "password" ? enTranslations.invalidPasswordMessage : "")
        }
      }}
    />
  )
}

export const WithImmutablePresetUsername: Story = {
  render: () => (
    <KcPageStory
      kcContext={{
        auth: {
          attemptedUsername: "max.mustermann@mail.com",
          showUsername: true
        },
        usernameHidden: true,
        message: {
          type: "info",
          summary: "Please re-authenticate to continue"
        }
      }}
    />
  )
}

export const WithoutPasswordField: Story = {
  render: () => (
    <KcPageStory
      kcContext={{
        realm: { password: false }
      }}
    />
  )
}

export const WithErrorMessage: Story = {
  render: () => (
    <KcPageStory
      kcContext={{
        message: {
          summary: "The time allotted for the connection has elapsed.<br/>The login process will restart from the beginning.",
          type: "error"
        }
      }}
    />
  )
}

export const WithSocialProviders: Story = {
  render: () => (
    <KcPageStory
      kcContext={{
        social: {
          displayInfo: true,
          providers: [
            {
              displayName: "Use Touchstone@MIT",
              providerId: "saml",
              loginUrl: "/realms/olapps/broker/touchstone-idp/login?client_id=ol-mitlearn-client&tab_id=-ObQDXtAv0M&client_data=***",
              iconClasses: "",
              alias: "touchstone-idp"
            },
            {
              loginUrl: "google",
              alias: "google",
              providerId: "google",
              displayName: "Google",
              iconClasses: "fa fa-google"
            },
            {
              loginUrl: "microsoft",
              alias: "microsoft",
              providerId: "microsoft",
              displayName: "Microsoft",
              iconClasses: "fa fa-windows"
            },
            {
              loginUrl: "facebook",
              alias: "facebook",
              providerId: "facebook",
              displayName: "Facebook",
              iconClasses: "fa fa-facebook"
            },
            {
              loginUrl: "instagram",
              alias: "instagram",
              providerId: "instagram",
              displayName: "Instagram",
              iconClasses: "fa fa-instagram"
            },
            {
              loginUrl: "twitter",
              alias: "twitter",
              providerId: "twitter",
              displayName: "Twitter",
              iconClasses: "fa fa-twitter"
            },
            {
              loginUrl: "linkedin",
              alias: "linkedin",
              providerId: "linkedin",
              displayName: "LinkedIn",
              iconClasses: "fa fa-linkedin"
            },
            {
              loginUrl: "stackoverflow",
              alias: "stackoverflow",
              providerId: "stackoverflow",
              displayName: "Stackoverflow",
              iconClasses: "fa fa-stack-overflow"
            },
            {
              loginUrl: "github",
              alias: "github",
              providerId: "github",
              displayName: "Github",
              iconClasses: "fa fa-github"
            },
            {
              loginUrl: "gitlab",
              alias: "gitlab",
              providerId: "gitlab",
              displayName: "Gitlab",
              iconClasses: "fa fa-gitlab"
            },
            {
              loginUrl: "bitbucket",
              alias: "bitbucket",
              providerId: "bitbucket",
              displayName: "Bitbucket",
              iconClasses: "fa fa-bitbucket"
            },
            {
              loginUrl: "paypal",
              alias: "paypal",
              providerId: "paypal",
              displayName: "PayPal",
              iconClasses: "fa fa-paypal"
            },
            {
              loginUrl: "openshift",
              alias: "openshift",
              providerId: "openshift",
              displayName: "OpenShift",
              iconClasses: "fa fa-cloud"
            }
          ]
        }
      }}
    />
  )
}

export const WithOneSocialProvider: Story = {
  render: args => (
    <KcPageStory
      {...args}
      kcContext={{
        social: {
          displayInfo: true,
          providers: [
            {
              displayName: "Use Touchstone@MIT",
              providerId: "saml",
              loginUrl: "/realms/olapps/broker/touchstone-idp/login?client_id=ol-mitlearn-client&tab_id=-ObQDXtAv0M&client_data=***",
              iconClasses: "",
              alias: "touchstone-idp"
            }
          ]
        }
      }}
    />
  )
}

export const WithTwoSocialProviders: Story = {
  render: args => (
    <KcPageStory
      {...args}
      kcContext={{
        social: {
          displayInfo: true,
          providers: [
            {
              displayName: "Use Touchstone@MIT",
              providerId: "saml",
              loginUrl: "/realms/olapps/broker/touchstone-idp/login?client_id=ol-mitlearn-client&tab_id=-ObQDXtAv0M&client_data=***",
              iconClasses: "",
              alias: "touchstone-idp"
            },
            {
              loginUrl: "google",
              alias: "google",
              providerId: "google",
              displayName: "Google",
              iconClasses: "fa fa-google"
            }
          ]
        }
      }}
    />
  )
}

export const WithNoSocialProviders: Story = {
  render: args => (
    <KcPageStory
      {...args}
      kcContext={{
        social: {
          displayInfo: true,
          providers: []
        }
      }}
    />
  )
}

export const WithSocialProvidersAndWithoutRememberMe: Story = {
  render: args => (
    <KcPageStory
      {...args}
      kcContext={{
        social: {
          displayInfo: true,
          providers: [
            {
              loginUrl: "google",
              alias: "google",
              providerId: "google",
              displayName: "Google",
              iconClasses: "fa fa-google"
            }
          ]
        },
        realm: { rememberMe: false }
      }}
    />
  )
}
