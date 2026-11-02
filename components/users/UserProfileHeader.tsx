import type { User } from "@/types/user";
import styles from "./UserProfileHeader.module.css";

interface Props {
  user: User;
}

export default function UserProfileHeader({ user }: Props) {
  return (
    <section className={styles.profileHeader}>
      <div className={styles.avatar}>{user.name.charAt(0).toUpperCase()}</div>

      <div className={styles.profileInfo}>
        <h1>{user.name}</h1>
        <p className={styles.username}>@{user.username}</p>
        <span className={styles.companyBadge}>{user.company.name}</span>
      </div>
    </section>
  );
}
