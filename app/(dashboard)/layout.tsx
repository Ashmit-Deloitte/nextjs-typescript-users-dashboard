"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { login, logout } from "@/features/auth/authSlice";
import type { ReactNode } from "react";
import styles from "./dashboard.module.css";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");

    dispatch(logout());

    router.replace("/login");
  };
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");

    if (storedAuth === "true") {
      dispatch(login());
    } else {
      dispatch(logout());
      router.replace("/login");
    }

    setIsChecking(false);
  }, [dispatch, router]);

  if (isChecking || !isAuthenticated) {
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
