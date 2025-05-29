import { fetchJson, baseURL } from "./fetchJson";
import type { User } from "@/types";

const sessionUrl = `${baseURL}/session`;

export const getUserFromSession = async (): Promise<User | null> => {
  try {
    return await fetchJson<User>(`${sessionUrl}/user`, { cache: "no-store" });
  } catch (error) {
    if (error?.status === 401) {
      // Not logged in
      return null;
    }
    throw error;
  }
};

export const login = (email: string): Promise<User> =>
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
