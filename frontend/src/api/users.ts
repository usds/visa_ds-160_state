// TODO: baseUrl as env variable
import { User } from "@/types";

const baseURL = "http://localhost:8000/api";

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export const getUsers = (): Promise<User[]> =>
  fetchJson(`${baseURL}/users/`, { cache: "no-store" });

export const getUserByEmail = (email: string): Promise<User> =>
  fetchJson(`${baseURL}/users/${email}/`, { cache: "no-store" });

export const createUser = (user: { email: string }): Promise<User> =>
  fetchJson(`${baseURL}/users/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
