"use client";

import { useState } from "react";
import { ArrowRight, Lock, User } from "lucide-react";

import { validateLoginForm } from "@/features/auth/authValidation";
import styles from "./LoginForm.module.css";

interface LoginFormProps {
  onLogin: (identifier: string) => void;
}

interface LoginErrors {
  identifier?: string;
  password?: string;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validationErrors = validateLoginForm(identifier, password);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    onLogin(identifier.trim());
  }

  function handleIdentifierChange(value: string) {
    setIdentifier(value);

    setErrors((prev) => ({
      ...prev,
      identifier: undefined,
    }));
  }

  function handlePasswordChange(value: string) {
    setPassword(value);

    setErrors((prev) => ({
      ...prev,
      password: undefined,
    }));
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.formGroup}>
        <label htmlFor="identifier" className={styles.label}>
          Email or Username
        </label>

        <div className={styles.inputWrapper}>
          <User size={18} className={styles.icon} aria-hidden="true" />

          <input
            id="identifier"
            name="identifier"
            type="text"
            placeholder="Enter your email or username"
            autoComplete="username"
            className={styles.input}
            value={identifier}
            aria-invalid={!!errors.identifier}
            aria-describedby={
              errors.identifier ? "identifier-error" : undefined
            }
            onChange={(e) => handleIdentifierChange(e.target.value)}
          />
        </div>

        {errors.identifier && (
          <p id="identifier-error" className={styles.error}>
            {errors.identifier}
          </p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.label}>
          Password
        </label>

        <div className={styles.inputWrapper}>
          <Lock size={18} className={styles.icon} aria-hidden="true" />

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            className={styles.input}
            value={password}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : undefined}
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
        </div>

        {errors.password && (
          <p id="password-error" className={styles.error}>
            {errors.password}
          </p>
        )}
      </div>

      <button type="submit" className={styles.submitButton}>
        <span>Sign in</span>
        <ArrowRight
          size={18}
          strokeWidth={2.25}
          className={styles.arrow}
          aria-hidden="true"
        />
      </button>
    </form>
  );
}
