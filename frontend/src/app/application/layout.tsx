"use client";
import "../globals.css";
import "@trussworks/react-uswds/lib/uswds.css";
import "@trussworks/react-uswds/lib/index.css";

import { Grid, Link, SideNav } from "@trussworks/react-uswds";
import { ApplicationNavLink } from "@/components/Form/ApplicationNav";
import { usePathname } from "next/navigation";

import { useTranslations } from "next-intl";

export default function ApplicationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = useTranslations("ApplicationLayout");
  console.log(usePathname());

  const gettingStartedSubItems = [
    <ApplicationNavLink location="passport-details"/>,
    <ApplicationNavLink location="names"/>,
  ];
  const sideNavItems = [
    // TODO: State management - highlight current and open subnavs
    <ApplicationNavLink
      location="getting-started"
      active={
        usePathname() === "/application/passport-details/" ||
        usePathname() === "/application/names/"
      }
    />,
    <SideNav
      key="getting-started-sub"
      items={gettingStartedSubItems}
      isSubnav={true}
    />,
    <ApplicationNavLink location="travel"/>,
    <ApplicationNavLink location="family"/>,
    <ApplicationNavLink location="work-education"/>,
    <ApplicationNavLink location="us-contacts"/>,
    <ApplicationNavLink location="security"/>,
  ];
  return (
    <Grid row>
      <Grid tablet={{ col: 4 }}>
        <SideNav items={sideNavItems} />
      </Grid>
      <Grid tablet={{ col: 8 }}>{children}</Grid>
    </Grid>
  );
}
