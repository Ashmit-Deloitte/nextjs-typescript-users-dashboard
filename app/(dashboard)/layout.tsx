"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import styles from "./dashboard.module.css";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  function handleLogout() {
    localStorage.removeItem("isAuthenticated");
    router.replace("/login");
  }

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    setIsChecking(false);
  }, [router]);

  if (isChecking) {
    return <p>Checking authentication...</p>;
  }

  return (
    <>
      <header className={styles.header}>
        <h2>Users Dashboard</h2>

        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </header>

      {children}
    </>
  );
}
