"use server";

import { cookies } from "next/headers";
import { Locale, defaultLocale } from "@/i18n/config";

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = "NEXT_LOCALE";

export async function getUserLocale() {
  const cookieJar = await cookies();
  console.log("cookies", cookieJar);
  const locale = cookieJar.get(COOKIE_NAME)?.value || defaultLocale;
  return locale;
}

export async function setUserLocale(locale: Locale) {
  (await cookies()).set(COOKIE_NAME, locale);
}
