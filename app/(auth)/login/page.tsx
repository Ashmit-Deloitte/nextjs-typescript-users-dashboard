"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { login } from "@/features/auth/authSlice";
import { validateLoginForm } from "@/features/auth/authValidation";
import styles from "./login.module.css";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    identifier?: string;
    password?: string;
  }>({});
  const [isChecking, setIsChecking] = useState(true);

  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");

    if (storedAuth === "true") {
      dispatch(login());
      router.replace("/users");
    } else {
      setIsChecking(false);
    }
  }, [dispatch, router]);

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const validationErrors = validateLoginForm(identifier, password);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    localStorage.setItem("isAuthenticated", "true");
    dispatch(login());

    router.push("/users");
  }

  if (isChecking) {
    return <p>Checking authentication...</p>;
  }

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <div className={styles.branding}>
          <h1 className={styles.title}>Users Dashboard</h1>
          <p className={styles.subtitle}>Manage and explore user information</p>
        </div>

        <div className={styles.heading}>
          <h2 className={styles.headingTitle}>Welcome back</h2>
          <p className={styles.headingSubtitle}>
            Please enter your credentials to sign in.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.formGroup}>
            <label htmlFor="identifier" className={styles.label}>
              Email or Username
            </label>

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
              onChange={(e) => {
                setIdentifier(e.target.value);
                setErrors((prev) => ({ ...prev, identifier: undefined }));
              }}
            />

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
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: undefined }));
              }}
            />

            {errors.password && (
              <p id="password-error" className={styles.error}>
                {errors.password}
              </p>
            )}
          </div>

          <button type="submit" className={styles.submitButton}>
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}
