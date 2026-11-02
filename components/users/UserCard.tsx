import Link from "next/link";
import { ArrowUpRight, Building2, Mail, Phone } from "lucide-react";
import { User } from "@/types/user";
import styles from "./UserCard.module.css";

interface UserCardProps {
  user: User;
}

// Gradient variants so avatars aren't all identical
const AVATAR_VARIANTS = [
  styles.avatarIndigo,
  styles.avatarViolet,
  styles.avatarPink,
  styles.avatarSky,
  styles.avatarEmerald,
];

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export default function UserCard({ user }: UserCardProps) {
  const avatarClass = AVATAR_VARIANTS[user.id % AVATAR_VARIANTS.length];

  return (
    <Link href={`/users/${user.id}`} className={styles.card}>
      <div className={styles.top}>
        <div className={`${styles.avatar} ${avatarClass}`} aria-hidden="true">
          {getInitials(user.name)}
        </div>

        <ArrowUpRight size={18} className={styles.arrow} aria-hidden="true" />
      </div>

      <h2 className={styles.name}>{user.name}</h2>

      <p className={styles.username}>@{user.username}</p>

      <div className={styles.detail}>
        <p className={styles.detailRow}>
          <Mail size={15} className={styles.detailIcon} aria-hidden="true" />
          <span>{user.email}</span>
        </p>
        <p className={styles.detailRow}>
          <Phone size={15} className={styles.detailIcon} aria-hidden="true" />
          <span>{user.phone}</span>
        </p>
      </div>

      <p className={styles.company}>
        <Building2
          size={15}
          className={styles.companyIcon}
          aria-hidden="true"
        />
        <span>{user.company.name}</span>
      </p>
    </Link>
  );
}
