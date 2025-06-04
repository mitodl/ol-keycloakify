import styled from "@emotion/styled";
import mitLearnLogo from "./mit-learn-logo.svg";
import mitLogo from "./mit-logo.svg";

const Container = styled.div({
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "48px"
});

export default function Logos() {
    return (
        <Container>
            <img src={mitLearnLogo} alt="MIT Learn Logo" height={24} />
            <img src={mitLogo} alt="MIT Logo" height={24} />
        </Container>
    );
}
