import styles from "../login.module.css";

export default function LoginBranding() {
  return (
    <>
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
    </>
  );
}
