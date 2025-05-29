"use client";

import React, { useState } from "react";
import NextLink from "next/link";
import {
  Header,
  Link,
  NavMenuButton,
  PrimaryNav,
  Title,
  NavDropDownButton,
  Menu,
} from "@trussworks/react-uswds";
import { useTranslations } from "next-intl";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { logout } from "@/api/session";
import { useRouter } from "next/navigation";
import { useUser } from "@/providers/UserContext";

function AppHeaderSimple() {
  const t = useTranslations("AppHeader");
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useUser();

  const [mobileNavIsExpanded, setMobileNavIsExpanded] = useState(false);
  const onClick = (): void =>
    setMobileNavIsExpanded((prvMobileNavIsExpanded) => !prvMobileNavIsExpanded);

  const [menuIsOpen, setMenuIsOpen] = useState([false, false]);
  const onToggle = (idx): void => {
    const newMenuIsOpen = [...menuIsOpen];
    newMenuIsOpen[idx] = !menuIsOpen[idx];
    setMenuIsOpen(newMenuIsOpen);
  };
  const handleBlur = (
    idx: number,
    event: React.FocusEvent<HTMLElement>,
  ): void => {
    const parent = event.currentTarget.parentElement;
    if (parent && parent.contains(event.relatedTarget as Node)) {
      // Focus is still within the shared parent (button or menu)
      return;
    }
    // Close the menu
    const newMenuIsOpen = [...menuIsOpen];
    newMenuIsOpen[idx] = false;
    setMenuIsOpen(newMenuIsOpen);
  };

  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(["sessionuser"], null);
      router.push("/account/login");
      queryClient.invalidateQueries({ queryKey: ["sessionuser"] });
    },
  });
  const handleLogout = (): void => {
    mutate();
  };

  const myAccountMenuItems = !user
    ? [
        <Link href="/account/login/" key="login" asCustom={NextLink}>
          {t("login")}
        </Link>,
      ]
    : [
        <Link href="/account/profile" key="profile" asCustom={NextLink}>
          {t("profile")}
        </Link>,
        <Link href="/account/login/" key="logout" onClick={handleLogout}>
          {t("logout")}
        </Link>,
      ];

  const myApplicationMenuItems = [
    <Link href="#linkOne" key="one" asCustom={NextLink}>
      Nav??
    </Link>,
  ];

  const testItemsMenu = [
    <>
      <NavDropDownButton
        onToggle={(): void => {
          onToggle(0);
        }}
        onBlur={(event): void => handleBlur(0, event)}
        menuId="myAccountDropdown"
        isOpen={menuIsOpen[0]}
        label={t("my-account")}
      />
      <Menu
        key="myAccount"
        onBlur={(event): void => handleBlur(0, event)}
        items={myAccountMenuItems}
        isOpen={menuIsOpen[0]}
        id="myAccountDropdown"
      />
    </>,
    <>
      <NavDropDownButton
        onToggle={(): void => {
          onToggle(1);
        }}
        onBlur={(event): void => handleBlur(1, event)}
        menuId="myApplicationMenu"
        isOpen={menuIsOpen[1]}
        label={t("application")}
        // TODO: state management for this
        isCurrent={true}
      />
      <Menu
        key="myApplication"
        onBlur={(event): void => handleBlur(1, event)}
        items={myApplicationMenuItems}
        isOpen={menuIsOpen[1]}
        id="myApplicationMenu"
      />
    </>,
    <Link href="#two" key="two" className="usa-nav__link" asCustom={NextLink}>
      <span>{t("resources")}</span>
    </Link>,
  ];

  return (
    <Header basic={true}>
      <div className="usa-nav-container">
        <div className="usa-navbar">
          <Title>{t("project-name")}</Title>
          <NavMenuButton onClick={onClick} label="Menu" />
        </div>
        <PrimaryNav
          items={testItemsMenu}
          mobileExpanded={mobileNavIsExpanded}
          onToggleMobileNav={onClick}
        ></PrimaryNav>
      </div>
    </Header>
  );
}

export default AppHeaderSimple;
