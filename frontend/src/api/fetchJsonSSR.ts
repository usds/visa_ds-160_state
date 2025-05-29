import { cookies } from "next/headers";

export async function fetchJsonSSR<T>(url: string, options?: RequestInit): Promise<T> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const response = await fetch(url, {
    ...options,
    headers: {
      ...(options?.headers || {}),
      Cookie: cookieHeader,
    },
  });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
}
