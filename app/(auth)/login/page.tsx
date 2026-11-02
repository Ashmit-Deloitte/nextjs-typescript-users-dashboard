"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAppDispatch } from "@/lib/hooks";
import { login } from "@/features/auth/authSlice";

import LoginBranding from "@/components/login/LoginBranding";
import LoginForm from "@/components/login/LoginForm";

import styles from "./login.module.css";

export default function LoginPage() {
  const [isChecking, setIsChecking] = useState(true);

  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    const storedIdentifier = localStorage.getItem("loggedInIdentifier");

    if (storedAuth === "true" && storedIdentifier) {
      dispatch(login(storedIdentifier));
      router.replace("/users");
    } else {
      setIsChecking(false);
    }
  }, [dispatch, router]);

  function handleLogin(identifier: string) {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("loggedInIdentifier", identifier);

    dispatch(login(identifier));

    router.push("/users");
  }

  if (isChecking) {
    return <p>Checking authentication...</p>;
  }

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <LoginBranding />

        <LoginForm onLogin={handleLogin} />
      </div>
    </main>
  );
}
