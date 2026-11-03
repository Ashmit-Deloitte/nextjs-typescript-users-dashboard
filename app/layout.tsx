import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Users Dashboard",
  description: "View and Manage Users",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<p>Loading application...</p>}>
          <StoreProvider>{children}</StoreProvider>
        </Suspense>
      </body>
    </html>
  );
}
