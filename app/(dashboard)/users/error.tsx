"use client";

import styles from "./error.module.css";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ reset }: ErrorProps) {
  return (
    <main className={styles.container}>
      <h2>Unable to load users</h2>

      <p>
        Something went wrong while fetching the user data. Please try again.
      </p>

      <button onClick={() => reset()}>Try Again</button>
    </main>
  );
}
