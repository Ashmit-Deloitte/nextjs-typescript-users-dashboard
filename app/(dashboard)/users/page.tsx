import UsersList from "@/components/users/UsersList";
import styles from "./users.module.css";

export const instant = false;

export default async function UserDashboard() {
  return (
    <main className={styles.container}>
      <UsersList />
    </main>
  );
}
