import styled from "@emotion/styled"
import {
  Input as SmootInput,
  Button as SmootButton,
  ButtonLink as SmootButtonLink,
  Alert as SmootAlert,
  AdornmentButton as SmootAdornmentButton
} from "@mitodl/smoot-design"
import { useIsPasswordRevealed } from "keycloakify/tools/useIsPasswordRevealed"
import { RiEyeLine, RiEyeOffLine } from "@remixicon/react"
import type { I18n } from "../i18n"

export const Link = styled.a(({ theme }) => ({
  ...theme.typography.body1,
  color: theme.custom.colors.red,
  ":hover": {
    color: theme.custom.colors.lightRed,
    textDecoration: "underline"
  }
}))

export const Label = styled.label(({ theme }) => ({
  ...theme.typography.body1,
  display: "block",
  marginBottom: theme.typography.pxToRem(12)
}))

export const Input = styled(SmootInput)({
  width: "100%"
})

export const Button = styled(SmootButton)({
  width: "100%"
})

export const ButtonLink = styled(SmootButtonLink)({
  width: "100%"
})

export const SocialProviderButtonLink = styled(SmootButtonLink)(({ theme }) => ({
  width: "100%",
  color: theme.custom.colors.black,
  ...theme.typography.subtitle1,
  fontWeight: theme.typography.fontWeightBold,
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
  "&:hover, &:hover:not(:disabled)": {
    backgroundColor: "inherit",
    borderColor: theme.custom.colors.black,
    borderWidth: "2px",
    padding: "11px 23px"
  }
}))

export const Form = styled.form({
  display: "flex",
  flexDirection: "column",
  gap: "24px"
})

export const Message = styled.div(({ theme }) => ({
  ...theme.typography.body1,
  color: theme.custom.colors.red,
  marginTop: "8px",
  marginBottom: "16px"
}))

export const ValidationMessage = styled.span(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.custom.colors.red,
  marginTop: "4px",
  display: "block"
}))

export const Info = styled.div(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.custom.colors.darkGray1,
  marginTop: "8px",
  a: {
    ...theme.typography.body2
  }
}))

export const Subtitle = styled.div(({ theme }) => ({
  ...theme.typography.body1,
  color: theme.custom.colors.darkGray1,
  marginTop: "-16px",
  marginBottom: "24px"
}))

export const Paragraph = styled.p(({ theme }) => ({
  ...theme.typography.body1,
  color: theme.custom.colors.darkGray1
}))

const Separator = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  padding: "16px 0",
  "&::before, &::after": {
    content: '""',
    flex: 1,
    borderBottom: `1px solid ${theme.custom.colors.silverGrayLight}`,
    position: "relative",
    top: "1px"
  },
  span: {
    textAlign: "center",
    margin: "0 20px",
    fontSize: "16px",
    color: theme.custom.colors.darkGray2
  }
}))

export const OrBar = () => {
  return (
    <Separator>
      <span>or</span>
    </Separator>
  )
}

export const FooterLink = styled.a(({ theme }) => ({
  ...theme.typography.body3,
  color: theme.custom.colors.red,
  ":hover": {
    color: theme.custom.colors.lightRed,
    textDecoration: "underline"
  }
}))

export const Alert = styled(SmootAlert)({
  marginBottom: "20px"
})

const AdornmentButton = styled(SmootAdornmentButton)(({ theme }) => ({
  ...theme.typography.button,
  boxSizing: "content-box",
  border: "none",
  background: "transparent",
  transition: `background ${theme.transitions.duration.short}ms`,
  cursor: "pointer",
  color: theme.custom.colors.silverGray,
  "&&& svg": {
    fill: theme.custom.colors.silverGrayLight,
    width: "16px",
    height: "16px"
  },
  "&&": {
    width: "28px"
  },
  "&&:hover": {
    background: "transparent",
    svg: {
      fill: theme.custom.colors.darkGray2
    }
  }
}))

export const RevealPasswordButton = ({
  i18n,
  passwordInputId
}: {
  i18n: I18n
  passwordInputId: string
}) => {
  const { msgStr } = i18n

  const { isPasswordRevealed, toggleIsPasswordRevealed } = useIsPasswordRevealed({
    passwordInputId
  })

  return (
    <AdornmentButton
      type="button"
      aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
      aria-controls={passwordInputId}
      onClick={toggleIsPasswordRevealed}
    >
      {isPasswordRevealed ? <RiEyeLine aria-hidden /> : <RiEyeOffLine aria-hidden />}
    </AdornmentButton>
  )
}

export const HelperText = styled.p(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.custom.colors.darkGray1,
  marginTop: "8px"
}))
