/**
 * Email validation utility
 * Uses HTML5 email validation standard
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Validates if a string is a valid email address
 * @param email - The email string to validate
 * @returns true if the email is valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== "string") {
    return false
  }

  return EMAIL_REGEX.test(email.trim())
}

/**
 * Validates if a field should be treated as an email field based on its name
 * @param fieldName - The name of the field
 * @returns true if the field should be validated as email, false otherwise
 */
export function isEmailField(fieldName: string): boolean {
  const emailFieldNames = ["email", "username"]
  return emailFieldNames.includes(fieldName.toLowerCase())
}
