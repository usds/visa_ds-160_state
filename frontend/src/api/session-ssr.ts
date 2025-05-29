import { baseURL } from "./fetchJson";
import { fetchJsonSSR } from "./fetchJsonSSR";
import type { User } from "@/types";

const sessionUrl = `${baseURL}/session`;

export const getUserFromSessionSSR = async (): Promise<User | null> => {
  try {
    return await fetchJsonSSR<User>(`${sessionUrl}/user`, { cache: "no-store" });
  } catch (error) {
    if (error?.status === 401) {
      // Not logged in
      return null;
    }
    throw error;
  }
};
