"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useGetUserByIdQuery } from "@/features/users/usersApi";
import styles from "./userDetails.module.css";

import UserProfileHeader from "@/components/users/UserProfileHeader";
import DetailSection from "@/components/users/DetailsSection";

export default function UserDetailsPage() {
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
    return <p>Invalid user ID.</p>;
  }

  if (isLoading) {
    return <p>Loading user details...</p>;
  }

  if (isError || !user) {
    return (
      <div>
        <p>Unable to load user details. The user may not exist.</p>
        <button onClick={() => refetch()}>Try Again</button>
        <a href="/users">Back to Users</a>
      </div>
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
        <span aria-hidden="true">←</span> Back to Users
      </Link>

      <UserProfileHeader user={user} />

      <div className={styles.detailsGrid}>
        <DetailSection title="Contact Information" items={contactItems} />

        <DetailSection title="Address" items={addressItems} />

        <DetailSection title="Company Details" items={companyItems} />
      </div>
    </main>
  );
}
