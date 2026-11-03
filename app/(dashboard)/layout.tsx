import type { ReactNode } from "react";
import DashboardShell from "@/components/dashboard/DashboardShell";

// Auth is checked client-side (localStorage), so the server can't render
// the page content. Skip instant-navigation validation for this segment.
export const unstable_instant = false;

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
