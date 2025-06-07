"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Link } from "@trussworks/react-uswds";

import { useTranslations } from "next-intl";

type ApplicationNavLinkProps = {
  location: string;
  active?: boolean;
};

export const ApplicationNavLink = (props: ApplicationNavLinkProps) => {
  const t = useTranslations("ApplicationLayout");
  const { location, active } = props;

  let pathname = `/application/${location}/`;
  if (!pathname.endsWith("/")) return pathname + "/";
  const isActive = active ? active : usePathname() === pathname;

  return (
    <Link
      href={pathname}
      className={isActive ? "usa-current" : ""}
      key={location}
    >
      {t(location)}
    </Link>
  )
}