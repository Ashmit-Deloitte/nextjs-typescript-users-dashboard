"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  Building2,
  CircleAlert,
  Mail,
  MapPin,
  RefreshCw,
} from "lucide-react";
import { useGetUserByIdQuery } from "@/features/users/usersApi";
import styles from "@/app/(dashboard)/users/[id]/userDetails.module.css";

import UserProfileHeader from "@/components/users/UserProfileHeader";
import DetailSection from "@/components/users/DetailsSection";

// Shared layout for the invalid / error states
function StatusCard({
  message,
  children,
}: {
  message: string;
  children?: ReactNode;
}) {
  return (
    <main className={styles.container}>
      <div className={styles.statusCard} role="alert">
        <div className={styles.statusIcon}>
          <CircleAlert size={24} aria-hidden="true" />
        </div>
        <p className={styles.statusText}>{message}</p>
        <div className={styles.statusActions}>{children}</div>
      </div>
    </main>
  );
}

export default function UserDetailsClient() {
  const params = useParams<{ id: string }>();

  const id = Number(params.id);
  const isValidId = /^\d+$/.test(params.id) && id > 0;

  const {
    data: user,
    isLoading,
    isError,
    refetch,
  } = useGetUserByIdQuery(id, {
    skip: !isValidId,
  });

  if (!isValidId) {
    return (
      <StatusCard message="Invalid user ID.">
        <a href="/users" className={styles.secondaryLink}>
          <ArrowLeft size={16} aria-hidden="true" />
          <span>Back to Users</span>
        </a>
      </StatusCard>
    );
  }

  if (isLoading) {
    return (
      <main
        className={styles.container}
        role="status"
        aria-live="polite"
        aria-label="Loading user details"
      >
        <span className={styles.skeletonBack} />
        <div className={styles.skeletonHeader} />

        <div className={styles.detailsGrid}>
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className={styles.skeletonCard}>
              <span className={styles.skeletonTitle} />
              <span className={styles.skeletonLine} />
              <span className={styles.skeletonLine} />
              <span className={`${styles.skeletonLine} ${styles.short}`} />
            </div>
          ))}
        </div>

        <span className={styles.srOnly}>Loading user details...</span>
      </main>
    );
  }

  if (isError || !user) {
    return (
      <StatusCard message="Unable to load user details. The user may not exist.">
        <button onClick={() => refetch()} className={styles.primaryButton}>
          <RefreshCw size={16} aria-hidden="true" />
          <span>Try Again</span>
        </button>
        <a href="/users" className={styles.secondaryLink}>
          <ArrowLeft size={16} aria-hidden="true" />
          <span>Back to Users</span>
        </a>
      </StatusCard>
    );
  }

  const contactItems = [
    {
      label: "Email",
      value: user.email,
      href: `mailto:${user.email}`,
    },
    {
      label: "Phone",
      value: user.phone,
      href: `tel:${user.phone}`,
    },
    {
      label: "Website",
      value: user.website,
      href: `https://${user.website}`,
      external: true,
    },
  ];

  const addressItems = [
    { label: "Street", value: user.address.street },
    { label: "Suite", value: user.address.suite },
    { label: "City", value: user.address.city },
    { label: "Zipcode", value: user.address.zipcode },
    {
      label: "Coordinates",
      value: `${user.address.geo.lat}, ${user.address.geo.lng}`,
    },
  ];

  const companyItems = [
    { label: "Company Name", value: user.company.name },
    { label: "Catch Phrase", value: user.company.catchPhrase },
    { label: "Business", value: user.company.bs },
  ];

  return (
    <main className={styles.container}>
      <Link href="/users" className={styles.backButton}>
        <ArrowLeft size={18} className={styles.backIcon} aria-hidden="true" />
        <span>Back to Users</span>
      </Link>

      <UserProfileHeader user={user} />

      <div className={styles.detailsGrid}>
        <DetailSection
          title="Contact Information"
          icon={Mail}
          items={contactItems}
        />

        <DetailSection title="Address" icon={MapPin} items={addressItems} />

        <DetailSection
          title="Company Details"
          icon={Building2}
          items={companyItems}
        />
      </div>
    </main>
  );
}
