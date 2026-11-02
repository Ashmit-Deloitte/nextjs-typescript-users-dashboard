import Link from "next/link";
import { notFound } from "next/navigation";
import { getUser } from "@/services/userService";
import styles from "./userDetails.module.css";

interface UserDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function UserDetailsPage({ params }: UserDetailsProps) {
  const { id } = await params;

  // Validate the ID
  if (!/^\d+$/.test(id)) {
    notFound();
  }

  let user;

  try {
    user = await getUser(id);
  } catch (error) {
    if (error instanceof Error && error.message === "USER_NOT_FOUND") {
      notFound();
    }

    throw error;
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
