"use client";

import { useState } from "react";
import type { User } from "@/types/user";
import UserCard from "./UserCard";
import styles from "./UsersList.module.css";

interface UsersListProps {
  users: User[];
}

const PAGE_SIZE = 4;

export default function UsersList({ users }: UsersListProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(users.length / PAGE_SIZE);

  const startIndex = (currentPage - 1) * PAGE_SIZE;

  const visibleUsers = users.slice(startIndex, startIndex + visibleCount);

  function handlePageChange(page: number) {
    setCurrentPage(page);
    setVisibleCount(PAGE_SIZE);
  }

  function handleShowMore() {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  }

  return (
    <>
      <section className={styles.grid}>
        {visibleUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </section>

      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;

          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={
                currentPage === page ? styles.activePage : styles.pageButton
              }
            >
              {page}
            </button>
          );
        })}

        {startIndex + visibleUsers.length < users.length && (
          <div className={styles.showMoreContainer}>
            <button onClick={handleShowMore} className={styles.showMoreButton}>
              Show More
            </button>
          </div>
        )}
      </div>
    </>
  );
}
