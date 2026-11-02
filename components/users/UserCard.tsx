import Link from "next/link";
import { User } from "@/types/user";
import styles from "./UserCard.module.css";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <Link href={`/users/${user.id}`} className={styles.card}>
      <h2 className={styles.name}>{user.name}</h2>

      <p className={styles.username}>@{user.username}</p>

      <div className={styles.detail}>
        <p>{user.email}</p>
        <p>{user.phone}</p>
      </div>

      <p className={styles.company}>{user.company.name}</p>
    </Link>
  );
}
