// TODO: baseUrl as env variable
// https://github.com/usds/visa_ds-160_state/issues/18
export const baseURL = "http://localhost:8000/api";
export async function fetchJson<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  options = { ...options, credentials: "include" };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw {
      status: response.status,
      statusText: response.statusText,
      url,
      message: `HTTP error! status: ${response.status}`,
    };
  }
  return response.json();
}