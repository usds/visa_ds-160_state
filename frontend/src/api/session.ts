import { fetchJson, baseURL } from "./utils";
import type { User } from "@/types";

const sessionUrl = `${baseURL}/session`;

export const getUserFromSession = (): Promise<User | null> =>
  fetchJson<User | null>(`${sessionUrl}/user`, { cache: "no-store" });

export const login = (email: string) =>
  fetchJson(`${sessionUrl}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

export const logout = () =>
  fetchJson(`${sessionUrl}/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
