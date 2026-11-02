import { getUsers } from "@/services/userService";
import UsersList from "@/components/users/UsersList";
import styles from "./users.module.css";

export const instant = false;

export default async function UserDashboard() {
  const users = await getUsers();

  return (
    <main className={styles.container}>
      <UsersList users={users} />
    </main>
  );
}
