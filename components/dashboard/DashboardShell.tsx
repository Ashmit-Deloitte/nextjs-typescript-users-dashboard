"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Users } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { login, logout } from "@/features/auth/authSlice";
import AuthLoader from "@/components/auth/AuthLoader";
import type { ReactNode } from "react";
import styles from "@/app/(dashboard)/dashboard.module.css";

export default function DashboardShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const identifier = useAppSelector((state) => state.auth.identifier);
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("loggedInIdentifier");

    dispatch(logout());

    router.replace("/login");
  };
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    const storedIdentifier = localStorage.getItem("loggedInIdentifier");

    if (storedAuth === "true" && storedIdentifier) {
      dispatch(login(storedIdentifier));
    } else {
      dispatch(logout());
      router.replace("/login");
    }

    setIsChecking(false);
  }, [dispatch, router]);

  if (isChecking || !isAuthenticated) {
    return (
      <div className={styles.shell}>
        <AuthLoader variant="dashboard" />
      </div>
    );
  }

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <Users size={18} aria-hidden="true" />
          </div>
          <h2>Users Dashboard</h2>
        </div>

        <div className={styles.headerActions}>
          <div className={styles.userChip}>
            <span className={styles.avatar} aria-hidden="true">
              {identifier?.charAt(0).toUpperCase()}
            </span>
            <span className={styles.identifier}>{identifier}</span>
          </div>

          <button
            onClick={handleLogout}
            className={styles.logoutButton}
            aria-label="Logout"
          >
            <LogOut size={16} aria-hidden="true" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {children}
    </div>
  );
}
