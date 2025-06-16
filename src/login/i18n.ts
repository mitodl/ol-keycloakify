/* eslint-disable @typescript-eslint/no-unused-vars */
import { i18nBuilder } from "keycloakify/login";
import type { ThemeName } from "../kc.gen";

/** @see: https://docs.keycloakify.dev/features/i18n */
const { useI18n, ofTypeI18n } = i18nBuilder
    .withThemeName<ThemeName>()
    .withCustomTranslations({
        en: {
            loginAccountTitle: "Log in",
            loginGreeting: "Hello, {0}",
            noAccount: "Don't have an account? ",
            doRegister: "Sign Up",
            doForgotPassword: "Reset password?",
            registerTitle: "Join MIT Learn for free",
            backToLogin: "Log In",
            alreadyHaveAnAccountRegister: "Already have an account? ",
            emailForgotTitle: "Reset Password",
            emailInstruction: "Enter your email for a password reset link.",
            doResetPasswordSubmit: "Send Reset Email",
            updatePasswordTitle: "Create a new password",
            doSubmit: "Next",
            emailVerifyInstruction1: "A verification email has been sent to: {0}",
            emailVerifyInstruction2: "Please click the link from your email to continue.",
            emailVerifyInstruction3:
                "Check the email inbox you signed up with. You may need to check the Spam folder.",
            emailVerifyInstruction4Bold: "Still no verification email? ",
            emailVerifyInstruction4:
                "Please contact our MIT Learn Customer Support Center", // TODO "Customer Support Center" link (existing not working in Prod)
            createPassword: "Create Password"
        }
    })
    .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
