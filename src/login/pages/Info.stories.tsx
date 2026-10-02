import type { Meta, StoryObj } from "@storybook/react-vite"
import { createKcPageStory } from "../KcPageStory"

const { KcPageStory } = createKcPageStory({ pageId: "info.ftl" })

const meta = {
  title: "login/info.ftl",
  component: KcPageStory
} satisfies Meta<typeof KcPageStory>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <KcPageStory />
}

/**
 * What confirming an email change actually looks like: the message and header
 * come from Keycloak's own `emailUpdated` / `emailUpdatedTitle`, and there is
 * no client session to go back to -- so this is the case the Back to MIT Learn
 * link exists for.
 */
export const EmailUpdated: Story = {
  render: () => (
    <KcPageStory
      kcContext={{
        messageHeader: "Email updated",
        message: {
          type: "success",
          summary: "The account email has been successfully updated to someone@example.com."
        }
      }}
    />
  )
}

/** Keycloak knows where the reader came from, so its own link wins. */
export const WithAPageRedirect: Story = {
  render: () => (
    <KcPageStory
      kcContext={{
        message: { type: "success", summary: "Your account has been updated." },
        pageRedirectUri: "https://learn.mit.edu/dashboard"
      }}
    />
  )
}

/**
 * The realm has no `olCanonicalHomeUrl` set, so the provider hands over the
 * literal `"#"`. No link at all is better than one that goes nowhere.
 */
export const WithNoHomeUrlConfigured: Story = {
  render: () => (
    <KcPageStory
      kcContext={{
        messageHeader: "Email updated",
        message: {
          type: "success",
          summary: "The account email has been successfully updated to someone@example.com."
        },
        olSettings: { homeUrl: "#", termsOfServiceUrl: "https://learn.mit.edu/terms" }
      }}
    />
  )
}

/** Mid-sequence: the flow asks for no exit, so neither link is offered. */
export const WithSkipLink: Story = {
  render: () => (
    <KcPageStory
      kcContext={{
        message: { type: "info", summary: "Continue in the other window." },
        skipLink: true
      }}
    />
  )
}
