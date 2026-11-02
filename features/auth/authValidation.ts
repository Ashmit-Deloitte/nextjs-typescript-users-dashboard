
interface LoginErrors {
  identifier?: string;
  password?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/;

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 64;
const MAX_EMAIL_LENGTH = 254;

export function validateLoginForm(
  identifier: string,
  password: string
): LoginErrors {
  const errors: LoginErrors = {};

  const trimmedIdentifier = identifier.trim();

  if (!trimmedIdentifier) {
    errors.identifier = "Email or username is required.";
  } else if (trimmedIdentifier.length > MAX_EMAIL_LENGTH) {
    errors.identifier = "Email or username is too long.";
  } else {
    const isValidEmail = EMAIL_REGEX.test(trimmedIdentifier);
    const isValidUsername = USERNAME_REGEX.test(trimmedIdentifier);

    if (!isValidEmail && !isValidUsername) {
      errors.identifier = "Enter a valid email address or username.";
    }
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < MIN_PASSWORD_LENGTH) {
    errors.password = "Password must contain at least 8 characters.";
  } else if (password.length > MAX_PASSWORD_LENGTH) {
    errors.password = "Password cannot exceed 64 characters.";
  }

  return errors;
}
