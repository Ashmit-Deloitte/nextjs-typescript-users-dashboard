interface LoginErrors {
  identifier?: string;
  password?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const USERNAME_REGEX =
  /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/;

const PASSWORD_REGEX = /^.{8,}$/;

export function validateLoginForm(
  identifier: string,
  password: string
): LoginErrors {
  const errors: LoginErrors = {};

  const trimmedIdentifier = identifier.trim();

  if (!trimmedIdentifier) {
    errors.identifier = "Email or username is required.";
  } else {
    const isValidEmail = EMAIL_REGEX.test(trimmedIdentifier);
    const isValidUsername = USERNAME_REGEX.test(trimmedIdentifier);

    if (!isValidEmail && !isValidUsername) {
      errors.identifier = "Enter a valid email address or username.";
    }
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (!PASSWORD_REGEX.test(password)) {
    errors.password = "Password must contain at least 8 characters.";
  }

  return errors;
}