import styled from "@emotion/styled"
import { useIsPasswordRevealed } from "keycloakify/tools/useIsPasswordRevealed"
import { RiEyeLine, RiEyeOffLine } from "@remixicon/react"
import { I18n } from "../i18n"

const AdornmentButton = styled.button(({ theme }) => ({
  ...theme.typography.button,
  position: "absolute",
  top: "1px",
  right: "4px",
  width: "16px",
  boxSizing: "content-box",
  border: "none",
  background: "transparent",
  transition: `background ${theme.transitions.duration.short}ms`,
  cursor: "pointer",
  color: theme.custom.colors.silverGray,
  height: "100%",
  svg: {
    fill: theme.custom.colors.silverGrayLight,
    width: "16px",
    height: "16px"
  },
  ":hover": {
    svg: {
      fill: theme.custom.colors.darkGray2
    }
  }
}))

export const PasswordWrapper = ({
  i18n,
  passwordInputId,
  children
}: {
  i18n: I18n
  passwordInputId: string
  children: JSX.Element
}) => {
  const { msgStr } = i18n

  const { isPasswordRevealed, toggleIsPasswordRevealed } = useIsPasswordRevealed({
    passwordInputId
  })

  return (
    <div style={{ position: "relative" }}>
      {children}
      <AdornmentButton
        type="button"
        aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
        aria-controls={passwordInputId}
        onClick={toggleIsPasswordRevealed}
      >
        {isPasswordRevealed ? <RiEyeLine aria-hidden /> : <RiEyeOffLine aria-hidden />}
      </AdornmentButton>
    </div>
  )
}
