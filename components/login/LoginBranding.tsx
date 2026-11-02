import { Users } from "lucide-react";

import styles from "./LoginBranding.module.css";

export default function LoginBranding() {
  return (
    <>
      <div className={styles.branding}>
        <div className={styles.logo}>
          <Users size={26} aria-hidden="true" />
        </div>
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
