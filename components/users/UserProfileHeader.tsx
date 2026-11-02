import { Building2 } from "lucide-react";
import type { User } from "@/types/user";
import styles from "./UserProfileHeader.module.css";

interface Props {
  user: User;
}

// Same order as UserCard so avatar colors match across pages
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

export default function UserProfileHeader({ user }: Props) {
  const avatarClass = AVATAR_VARIANTS[user.id % AVATAR_VARIANTS.length];

  return (
    <section className={styles.profileHeader}>
      <div className={`${styles.avatar} ${avatarClass}`} aria-hidden="true">
        {getInitials(user.name)}
      </div>

      <div className={styles.profileInfo}>
        <h1>{user.name}</h1>
        <p className={styles.username}>@{user.username}</p>
        <span className={styles.companyBadge}>
          <Building2 size={14} aria-hidden="true" />
          <span>{user.company.name}</span>
        </span>
      </div>
    </section>
  );
}
