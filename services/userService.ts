import { User } from "@/types/user";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export async function getUsers(): Promise<User[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const users: User[] = await response.json();

  return users;
}

export async function getUser(id: string): Promise<User> {
  const response = await fetch(`${API_URL}/${id}`);

  if (response.status === 404) {
    throw new Error("USER_NOT_FOUND");
  }

  if (!response.ok) {
    throw new Error("Failed to fetch user details");
  }

  return response.json();
}