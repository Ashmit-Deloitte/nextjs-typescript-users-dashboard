import UsersList from "@/components/users/UsersList";
import styles from "./users.module.css";

export const instant = false;

export default async function UserDashboard() {
  return (
    <main className={styles.container}>
      <div className={styles.heading}>
        <h1 className={styles.title}>Users</h1>
        <p className={styles.subtitle}>
          Browse and explore everyone in your directory.
        </p>
      </div>

      <UsersList />
    </main>
  );
}
