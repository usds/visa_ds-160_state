import { User } from "@/types";
import { fetchJson, baseURL } from "./fetchJson";

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
