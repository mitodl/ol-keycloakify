import styled from "@emotion/styled"
import mitLearnLogo from "./mit-learn-logo.svg"
import mitLogo from "./mit-logo.svg"

const Container = styled.div({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "48px",
  img: {
    height: "24px"
  }
})

export default function Logos({ homeUrl }: { homeUrl: string }) {
  return (
    <Container>
      <a href={homeUrl ?? ""} title="MIT Learn Homepage">
        <img src={mitLearnLogo} alt="" height={24} />
      </a>
      <a href="https://mit.edu" title="MIT Homepage">
        <img src={mitLogo} alt="" height={24} />
      </a>
    </Container>
  )
}
