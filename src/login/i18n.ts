/* eslint-disable @typescript-eslint/no-unused-vars */
import { i18nBuilder } from "keycloakify/login";
import type { ThemeName } from "../kc.gen";

/** @see: https://docs.keycloakify.dev/features/i18n */
const { useI18n, ofTypeI18n } = i18nBuilder
    .withThemeName<ThemeName>()
    .withCustomTranslations({
        en: {
            loginAccountTitle: "Log in",
            noAccount: "Don't have an account? ",
            doRegister: "Sign Up",
            doForgotPassword: "Reset password?",
            registerTitle: "Join MIT Learn for free",
            backToLogin: "Log In",
            alreadyHaveAnAccountRegister: "Already have an account? ",
            emailForgotTitle: "Reset Password",
            emailInstruction: "Enter your email for a password reset link.",
            doResetPasswordSubmit: "Send Reset Email"
        }
    })
    .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
