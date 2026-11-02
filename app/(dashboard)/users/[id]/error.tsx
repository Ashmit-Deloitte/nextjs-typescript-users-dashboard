"use client";

import styles from "./error.module.css";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className={styles.container}>
      <h2>Something went wrong!</h2>
      <p>We couldn't load this user's details.</p>

      <button onClick={() => reset()}>Try Again</button>
    </main>
  );
}
