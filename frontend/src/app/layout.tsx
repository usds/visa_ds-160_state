import type { Metadata } from "next";

import "./globals.css";
import "@trussworks/react-uswds/lib/uswds.css";
import "@trussworks/react-uswds/lib/index.css";

import { GovBanner, Grid, GridContainer } from "@trussworks/react-uswds";

import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";

import AppHeaderSimple from "@/components/UI/AppHeaderSimple";

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
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <GovBanner />
          <AppHeaderSimple />
          <GridContainer className="usa-section">
            <Grid row className="margin-x-neg-205 flex-justify-center">
              <Grid
                col={12}
                mobileLg={{ col: 10 }}
                tablet={{ col: 8 }}
                desktop={{ col: 6 }}
                className="padding-x-205 margin-bottom-4"
              >
                <main>{children}</main>
              </Grid>
            </Grid>
          </GridContainer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
