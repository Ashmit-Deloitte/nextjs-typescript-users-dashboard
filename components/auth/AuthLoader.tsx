import styles from "./AuthLoader.module.css";

interface AuthLoaderProps {
  variant?: "login" | "dashboard";
}

export default function AuthLoader({ variant = "dashboard" }: AuthLoaderProps) {
  return (
    <div
      className={`${styles.container} ${styles[variant]}`}
      role="status"
      aria-live="polite"
    >
      <span className={styles.spinner} aria-hidden="true" />
      <p>Checking authentication...</p>
    </div>
  );
}
