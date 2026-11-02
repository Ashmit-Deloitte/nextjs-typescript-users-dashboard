import styles from "./users.module.css";

export default function Loading() {
  return (
    <main className={styles.container}>
      <p className={styles.loading}>Loading users...</p>
    </main>
  );
}
