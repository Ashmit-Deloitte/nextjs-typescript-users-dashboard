"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { login } from "@/features/auth/authSlice";
import styles from "./login.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    // Simulate successful authentication
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
        {/* Branding */}
        <div className={styles.branding}>
          <h1 className={styles.title}>Users Dashboard</h1>

          <p className={styles.subtitle}>Manage and explore user information</p>
        </div>

        {/* Heading */}
        <div className={styles.heading}>
          <h2 className={styles.headingTitle}>Welcome back</h2>

          <p className={styles.headingSubtitle}>
            Please enter your credentials to sign in.
          </p>
        </div>

        {/* Login Form */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.submitButton}>
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}
