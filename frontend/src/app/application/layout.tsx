import "../globals.css";
import "@trussworks/react-uswds/lib/uswds.css";
import "@trussworks/react-uswds/lib/index.css";

import { Grid, Link, SideNav } from "@trussworks/react-uswds";

import { useTranslations } from "next-intl";

export default function ApplicationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = useTranslations("ApplicationLayout");

  const gettingStartedSubItems = [
    <Link href="#" className="usa-current" key="passport-details">
      {t("passport-details")}
    </Link>,
    <Link href="#" key="name">
      {t("name")}
    </Link>,
  ];
  const sideNavItems = [
    // TODO: State management - highlight current and open subnavs
    <Link href="#" key="getting-started" className="usa-current">
      {t("getting-started")}
    </Link>,
    <SideNav
      key="getting-started-sub"
      items={gettingStartedSubItems}
      isSubnav={true}
    />,
    <Link href="#" key="travel">
      {t("travel")}
    </Link>,
    <Link href="#" key="family">
      {t("family")}
    </Link>,
    <Link href="#" key="work-education">
      {t("work-education")}
    </Link>,
    <Link href="#" key="us-contacts">
      {t("us-contacts")}
    </Link>,
    <Link href="#" key="security">
      {t("security")}
    </Link>,
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
