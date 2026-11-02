"use client";

import { useState } from "react";
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
    return <p>Loading users...</p>;
  }

  if (isError) {
    return (
      <div>
        <p>Unable to load users.</p>
        <button onClick={() => refetch()}>Try Again</button>
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

      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;

          return (
            <button
              key={page}
              onClick={() => dispatch(setCurrentPage(page))}
              className={
                currentPage === page ? styles.activePage : styles.pageButton
              }
            >
              {page}
            </button>
          );
        })}
      </div>

      {startIndex + visibleUsers.length < users.length && (
        <div className={styles.showMoreContainer}>
          <button
            onClick={() => dispatch(showMore())}
            className={styles.showMoreButton}
          >
            Show More
          </button>
        </div>
      )}
    </>
  );
}
