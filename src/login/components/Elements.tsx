import styled from "@emotion/styled";
import { Input as SmootInput, Button as SmootButton } from "@mitodl/smoot-design";
import { pxToRem } from "./typography";

export const Link = styled.a(({ theme }) => ({
    ...theme.typography.body1,
    color: theme.custom.colors.red,
    ":hover": {
        color: theme.custom.colors.lightRed,
        textDecoration: "underline"
    }
}));

export const Label = styled.label(({ theme }) => ({
    ...theme.typography.body1,
    display: "block",
    marginBottom: pxToRem(12)
}));

export const Input = styled(SmootInput)({
    width: "100%"
});

export const Button = styled(SmootButton)({
    width: "100%"
});

export const Form = styled.form({
    display: "flex",
    flexDirection: "column",
    gap: "24px"
});

export const Message = styled.div(({ theme }) => ({
    ...theme.typography.body1,
    color: theme.custom.colors.red,
    marginTop: "8px",
    marginBottom: "16px"
}));

export const ValidationMessage = styled.span(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.custom.colors.red,
    marginTop: "8px"
}));

export const Info = styled.div(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.custom.colors.darkGray1,
    marginTop: "8px",
    a: {
        ...theme.typography.body2
    }
}));

export const Subtitle = styled.div(({ theme }) => ({
    ...theme.typography.body1,
    color: theme.custom.colors.darkGray1,
    marginTop: "-16px",
    marginBottom: "24px"
}));

export const Paragraph = styled.p(({ theme }) => ({
    ...theme.typography.body1,
    color: theme.custom.colors.darkGray1
}));
