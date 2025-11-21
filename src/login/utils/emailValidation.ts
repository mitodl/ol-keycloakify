/**
 * Email validation utility
 * Uses a practical email validation regex that covers most common cases
 * while rejecting obviously invalid formats
 */

// Email regex pattern:
// - Local part: alphanumeric, dots, hyphens, underscores, plus signs
// - Must not start or end with a dot
// - Must not have consecutive dots
// - Domain: alphanumeric, hyphens, dots
// - Must have at least one dot in domain
// - TLD must be at least 2 characters
const EMAIL_REGEX = /^[a-zA-Z0-9._+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/

/**
 * Validates if a string is a valid email address
 * @param email - The email string to validate
 * @returns true if the email is valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== "string") {
    return false
  }

  const trimmedEmail = email.trim()

  // Check basic regex pattern
  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return false
  }

  // Additional validation: no consecutive dots
  if (trimmedEmail.includes("..")) {
    return false
  }

  // Additional validation: local part shouldn't start or end with dot
  const [localPart] = trimmedEmail.split("@")
  if (localPart.startsWith(".") || localPart.endsWith(".")) {
    return false
  }

  return true
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
