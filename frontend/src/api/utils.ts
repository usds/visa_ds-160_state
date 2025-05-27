// TODO: baseUrl as env variable
export const baseURL = "http://localhost:8000/api";
export async function fetchJson<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  options["credentials"] = "include"; // Include cookies in the request
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}
