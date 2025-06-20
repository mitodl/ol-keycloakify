import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Paragraph } from "../components/Elements";

export default function LoginVerifyEmail(props: PageProps<Extract<KcContext, { pageId: "login-verify-email.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { msg } = i18n;

    const { user } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo
            headerNode={msg("emailVerifyTitle")}
            infoNode={
                <>
                    <Paragraph className="instruction">{msg("emailVerifyInstruction2")}</Paragraph>
                    <hr />
                    <Paragraph>{msg("emailVerifyInstruction3")}</Paragraph>
                    <Paragraph>
                        <strong>{msg("emailVerifyInstruction4Bold")}</strong>
                        {msg("emailVerifyInstruction4")}
                    </Paragraph>
                </>
            }
        >
            <Paragraph className="instruction">{msg("emailVerifyInstruction1", user?.email ?? "")}</Paragraph>
        </Template>
    );
}
