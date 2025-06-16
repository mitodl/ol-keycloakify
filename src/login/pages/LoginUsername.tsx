import { useState } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Link, Label, Input, Button, Form, ValidationMessage, Info, SocialProviderButtonLink, OrBar } from "../components/Elements";

export default function LoginUsername(props: PageProps<Extract<KcContext, { pageId: "login-username.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { social, realm, url, usernameHidden, login, registrationDisabled, messagesPerField, loginAttempt } = kcContext;

    const { msg } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username")}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            headerNode={loginAttempt?.userFullname ? msg("loginGreeting", loginAttempt.userFullname) : msg("doLogIn")}
            infoNode={
                <div id="kc-registration">
                    <Info>
                        {msg("noAccount")}
                        <Link tabIndex={6} href={url.registrationUrl}>
                            {msg("doRegister")}
                        </Link>
                    </Info>
                </div>
            }
            socialProvidersNode={
                <>
                    {realm.password && social?.providers !== undefined && social.providers.length !== 0 && (
                        <div id="kc-social-providers" className={kcClsx("kcFormSocialAccountSectionClass")}>
                            {/* <h2>{msg("identity-provider-login-label")}</h2> */}
                            <OrBar />
                            {/* <ul className={kcClsx("kcFormSocialAccountListClass", social.providers.length > 3 && "kcFormSocialAccountListGridClass")}> */}
                            {social.providers.map((...[p, , providers]) => (
                                <SocialProviderButtonLink
                                    key={p.alias}
                                    id={`social-${p.alias}`}
                                    className={kcClsx("kcFormSocialAccountListButtonClass", providers.length > 3 && "kcFormSocialAccountGridItem")}
                                    type="button"
                                    href={p.loginUrl}
                                    variant="text"
                                    size="large"
                                >
                                    {p.iconClasses && <i className={clsx(kcClsx("kcCommonLogoIdP"), p.iconClasses)} aria-hidden="true"></i>}
                                    <span className={clsx(kcClsx("kcFormSocialAccountNameClass"), p.iconClasses && "kc-social-icon-text")}>
                                        {p.displayName}
                                    </span>
                                </SocialProviderButtonLink>
                            ))}
                            {/* </ul> */}
                        </div>
                    )}
                </>
            }
        >
            <div id="kc-form">
                <div id="kc-form-wrapper">
                    {realm.password && (
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
                                        className={kcClsx("kcInputClass")}
                                        name="username"
                                        defaultValue={login.username ?? ""}
                                        type="text"
                                        autoFocus
                                        autoComplete="username"
                                        aria-invalid={messagesPerField.existsError("username")}
                                    />
                                    {messagesPerField.existsError("username") && (
                                        <ValidationMessage id="input-error" className={kcClsx("kcInputErrorMessageClass")} aria-live="polite">
                                            {messagesPerField.getFirstError("username")}
                                        </ValidationMessage>
                                    )}
                                </div>
                            )}
                            {/*
                            <div className={kcClsx("kcFormGroupClass", "kcFormSettingClass")}>
                                <div id="kc-form-options">
                                    {realm.rememberMe && !usernameHidden && (
                                        <div className="checkbox">
                                            <label>
                                                <input
                                                    tabIndex={3}
                                                    id="rememberMe"
                                                    name="rememberMe"
                                                    type="checkbox"
                                                    defaultChecked={!!login.rememberMe}
                                                />{" "}
                                                {msg("rememberMe")}
                                            </label>
                                        </div>
                                    )}
                                </div>
                            </div> */}

                            <div id="kc-form-buttons" className={kcClsx("kcFormGroupClass")}>
                                <Button
                                    tabIndex={4}
                                    disabled={isLoginButtonDisabled}
                                    className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                                    name="login"
                                    id="kc-login"
                                    type="submit"
                                    size="large"
                                >
                                    Next
                                </Button>
                            </div>
                        </Form>
                    )}
                </div>
            </div>
        </Template>
    );
}
