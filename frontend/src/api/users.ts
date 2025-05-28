import { fetchJson, baseURL } from "./utils";

export const getUsers = () =>
  fetchJson(`${baseURL}/users/`, { cache: "no-store" });

export const getUserByEmail = (email: string) =>
  fetchJson(`${baseURL}/users/${email}/`, { cache: "no-store" });

export const createUser = (user: { email: string }) =>
  fetchJson(`${baseURL}/users/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
