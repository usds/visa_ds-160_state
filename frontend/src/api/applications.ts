import { Application } from "@/types";
import { fetchJson, baseURL } from "./fetchJson";

export const getApplications = (): Promise<Application[]> =>
  fetchJson(`${baseURL}/applications/`, { cache: "no-store" });

export const getApplication = (id: string): Promise<Application> =>
  fetchJson(`${baseURL}/applications/${id}/`, { cache: "no-store" });

export const createApplication = (): Promise<Application> =>
  fetchJson(`${baseURL}/application/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
