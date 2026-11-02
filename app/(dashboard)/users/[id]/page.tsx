"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useGetUserByIdQuery } from "@/features/users/usersApi";
import styles from "./userDetails.module.css";

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

  return (
    <main className={styles.container}>
      <Link href="/users" className={styles.backButton}>
        <span aria-hidden="true">←</span> Back to Users
      </Link>

      {/* Profile Header */}
      <section className={styles.profileHeader}>
        <div className={styles.avatar}>{user.name.charAt(0).toUpperCase()}</div>

        <div className={styles.profileInfo}>
          <h1>{user.name}</h1>
          <p className={styles.username}>@{user.username}</p>
          <span className={styles.companyBadge}>{user.company.name}</span>
        </div>
      </section>

      {/* Information Sections */}
      <div className={styles.detailsGrid}>
        {/* Contact Information */}
        <section className={styles.detailCard}>
          <h2>Contact Information</h2>

          <div className={styles.detailItem}>
            <span>Email</span>
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </div>

          <div className={styles.detailItem}>
            <span>Phone</span>
            <a href={`tel:${user.phone}`}>{user.phone}</a>
          </div>

          <div className={styles.detailItem}>
            <span>Website</span>
            <a
              href={`https://${user.website}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {user.website}
            </a>
          </div>
        </section>

        {/* Address */}
        <section className={styles.detailCard}>
          <h2>Address</h2>

          <div className={styles.detailItem}>
            <span>Street</span>
            <p>{user.address.street}</p>
          </div>

          <div className={styles.detailItem}>
            <span>Suite</span>
            <p>{user.address.suite}</p>
          </div>

          <div className={styles.detailItem}>
            <span>City</span>
            <p>{user.address.city}</p>
          </div>

          <div className={styles.detailItem}>
            <span>Zipcode</span>
            <p>{user.address.zipcode}</p>
          </div>

          <div className={styles.detailItem}>
            <span>Coordinates</span>
            <p>
              {user.address.geo.lat}, {user.address.geo.lng}
            </p>
          </div>
        </section>

        {/* Company */}
        <section className={styles.detailCard}>
          <h2>Company Details</h2>

          <div className={styles.detailItem}>
            <span>Company Name</span>
            <p>{user.company.name}</p>
          </div>

          <div className={styles.detailItem}>
            <span>Catch Phrase</span>
            <p>{user.company.catchPhrase}</p>
          </div>

          <div className={styles.detailItem}>
            <span>Business</span>
            <p>{user.company.bs}</p>
          </div>
        </section>
      </div>
    </main>
  );
}
