"use client";
import { ChevronDown, CircleAlert, RefreshCw } from "lucide-react";
import { useGetUsersQuery } from "@/features/users/usersApi";
import { setCurrentPage, showMore } from "@/features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import UserCard from "./UserCard";
import styles from "./UsersList.module.css";

const PAGE_SIZE = 4;

export default function UsersList() {
  const dispatch = useAppDispatch();

  // Read pagination state from Redux
  const { currentPage, visibleCount } = useAppSelector((state) => state.users);

  const {
    data: users = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetUsersQuery();

  if (isLoading) {
    return (
      <section
        className={styles.grid}
        role="status"
        aria-live="polite"
        aria-label="Loading users"
      >
        {Array.from({ length: PAGE_SIZE }, (_, index) => (
          <div key={index} className={styles.skeleton}>
            <span className={styles.skeletonAvatar} />
            <span className={styles.skeletonLine} />
            <span className={`${styles.skeletonLine} ${styles.short}`} />
          </div>
        ))}
        <span className={styles.srOnly}>Loading users...</span>
      </section>
    );
  }

  if (isError) {
    return (
      <div className={styles.errorBox} role="alert">
        <div className={styles.errorIcon}>
          <CircleAlert size={24} aria-hidden="true" />
        </div>
        <p className={styles.errorText}>Unable to load users.</p>
        <button onClick={() => refetch()} className={styles.retryButton}>
          <RefreshCw size={16} aria-hidden="true" />
          <span>Try Again</span>
        </button>
      </div>
    );
  }

  const totalPages = Math.ceil(users.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;

  const visibleUsers = users.slice(startIndex, startIndex + visibleCount);

  return (
    <>
      <section className={styles.grid}>
        {visibleUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </section>

      <nav className={styles.pagination} aria-label="Pagination">
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;

          return (
            <button
              key={page}
              onClick={() => dispatch(setCurrentPage(page))}
              className={
                currentPage === page ? styles.activePage : styles.pageButton
              }
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          );
        })}
      </nav>

      {startIndex + visibleUsers.length < users.length && (
        <div className={styles.showMoreContainer}>
          <button
            onClick={() => dispatch(showMore())}
            className={styles.showMoreButton}
          >
            <span>Show More</span>
            <ChevronDown
              size={18}
              className={styles.chevron}
              aria-hidden="true"
            />
          </button>
        </div>
      )}
    </>
  );
}
