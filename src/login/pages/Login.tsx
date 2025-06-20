import { useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Link, Label, Input, Button, Form, ValidationMessage, Info, ButtonLink, SocialProviderButtonLink, OrBar } from "../components/Elements";
import { PasswordWrapper } from "../components/PasswordWrapper";
import mitLogo from "../components/mit-logo.svg";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    console.info("kcContext", kcContext);

    const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField, loginAttempt } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username", "password")}
            headerNode={loginAttempt?.userFullname ? msg("loginGreeting", loginAttempt.userFullname) : msg("loginAccountTitle")}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <div id="kc-registration-container">
                    <div id="kc-registration">
                        <Info>
                            {msg("noAccount")}
                            <Link tabIndex={8} href={url.registrationUrl}>
                                {msg("doRegister")}
                            </Link>
                        </Info>
                    </div>
                </div>
            }
            socialProvidersNode={
                <>
                    {realm.password && social?.providers !== undefined && social.providers.length !== 0 && (
                        <div id="kc-social-providers" className={kcClsx("kcFormSocialAccountSectionClass")}>
                            <OrBar />
                            {social.providers.map(p => (
                                <SocialProviderButtonLink
                                    key={p.alias}
                                    id={`social-${p.alias}`}
                                    type="button"
                                    href={p.loginUrl}
                                    variant="bordered"
                                    size="large"
                                >
                                    {p.iconClasses && <i className={clsx(kcClsx("kcCommonLogoIdP"), p.iconClasses)} aria-hidden="true"></i>}
                                    {p.alias === "touchstone-idp" ? <img src={mitLogo} alt="MIT Logo" width={29} /> : null}
                                    <span className={clsx(kcClsx("kcFormSocialAccountNameClass"), p.iconClasses && "kc-social-icon-text")}>
                                        {p.displayName}
                                    </span>
                                </SocialProviderButtonLink>
                            ))}
                        </div>
                    )}
                </>
            }
        >
            <div id="kc-form">
                <div id="kc-form-wrapper">
                    {realm.password &&
                        !loginAttempt?.hasSocialProviderAuth &&
                        (!loginAttempt?.needsPassword ? (
                            <Form
                                id="kc-form-login"
                                onSubmit={() => {
                                    setIsLoginButtonDisabled(true);
                                    return true;
                                }}
                                action={url.loginAction}
                                method="post"
                            >
                                {!usernameHidden && (
                                    <div className={kcClsx("kcFormGroupClass")}>
                                        <Label htmlFor="username" className={kcClsx("kcLabelClass")}>
                                            {!realm.loginWithEmailAllowed
                                                ? msg("username")
                                                : !realm.registrationEmailAsUsername
                                                  ? msg("usernameOrEmail")
                                                  : msg("email")}
                                        </Label>
                                        <Input
                                            tabIndex={2}
                                            id="username"
                                            name="username"
                                            defaultValue={login.username ?? ""}
                                            type="text"
                                            autoFocus
                                            autoComplete="username"
                                            aria-invalid={messagesPerField.existsError("username", "password")}
                                        />

                                        {messagesPerField.existsError("username", "password") && (
                                            <ValidationMessage
                                                id="input-error"
                                                className={kcClsx("kcInputErrorMessageClass")}
                                                aria-live="polite"
                                                dangerouslySetInnerHTML={{
                                                    __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                                }}
                                            />
                                        )}
                                    </div>
                                )}
                                <div className={kcClsx("kcFormGroupClass")}>
                                    <Label htmlFor="password" className={kcClsx("kcLabelClass")}>
                                        {msg("password")}
                                    </Label>
                                    <PasswordWrapper kcClsx={kcClsx} i18n={i18n} passwordInputId="password">
                                        <Input
                                            tabIndex={3}
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            aria-invalid={messagesPerField.existsError("username", "password")}
                                        />
                                    </PasswordWrapper>
                                    {usernameHidden && messagesPerField.existsError("username", "password") && (
                                        <ValidationMessage
                                            id="input-error"
                                            className={kcClsx("kcInputErrorMessageClass")}
                                            aria-live="polite"
                                            dangerouslySetInnerHTML={{
                                                __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                            }}
                                        />
                                    )}
                                </div>
                                <div className={kcClsx("kcFormGroupClass", "kcFormSettingClass")}>
                                    <div className={kcClsx("kcFormOptionsWrapperClass")}>
                                        {realm.resetPasswordAllowed && (
                                            <span>
                                                <Link tabIndex={6} href={url.loginResetCredentialsUrl}>
                                                    {msg("doForgotPassword")}
                                                </Link>
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div id="kc-form-buttons" className={kcClsx("kcFormGroupClass")}>
                                    <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />
                                    <Button
                                        tabIndex={7}
                                        disabled={isLoginButtonDisabled}
                                        className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                                        name="login"
                                        id="kc-login"
                                        type="submit"
                                        variant="primary"
                                        size="large"
                                    >
                                        {msgStr("doLogIn")}
                                    </Button>
                                </div>
                            </Form>
                        ) : realm.resetPasswordAllowed ? (
                            <div id="kc-form-login" className={kcClsx("kcFormClass")}>
                                <div className={kcClsx("kcFormGroupClass")}>
                                    <p>
                                        <strong>Password required.</strong>
                                        <br />
                                        For security reasons you will need to create a new password for your account.
                                    </p>
                                </div>
                                <div id="kc-form-buttons" className={kcClsx("kcFormGroupClass")}>
                                    <ButtonLink
                                        href={url.loginResetCredentialsUrl}
                                        className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                                        id="kc-create-password"
                                        type="submit"
                                    >
                                        {msgStr("createPassword")}
                                    </ButtonLink>
                                </div>
                            </div>
                        ) : (
                            <div className={kcClsx("kcFormGroupClass")}>
                                <p>Unable to log you in - no password and password reset is disabled by the administrator.</p>
                            </div>
                        ))}
                </div>
            </div>
        </Template>
    );
}
