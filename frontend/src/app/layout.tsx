import type { Metadata } from "next";

import "./globals.css";
import "@trussworks/react-uswds/lib/uswds.css";
import "@trussworks/react-uswds/lib/index.css";

import { Grid, GridContainer } from "@trussworks/react-uswds";

import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { dehydrate, QueryClient } from "@tanstack/react-query";

import AppHeaderSimple from "@/components/UI/AppHeaderSimple";
import AppBanner from "@/components/UI/AppBanner";
import QueryProvider from "@/providers/QueryContext";
import { UserProvider } from "@/providers/UserContext";
import { getUserFromSession } from "@/api/session";

export const metadata: Metadata = {
  title: "U.S. Department of State - Consular Electronic Application Center",
  description: "DS-160 Nonimmigrant Visa Application",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  // Prefetch user query on the server
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["sessionuser"],
    queryFn: getUserFromSession,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <AppBanner aria-label="Official government website" />
          <QueryProvider dehydratedState={dehydratedState}>
            <UserProvider>
              <AppHeaderSimple />
              <GridContainer className="usa-section">
                <Grid>
                  <main>{children}</main>
                </Grid>
              </GridContainer>
            </UserProvider>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
