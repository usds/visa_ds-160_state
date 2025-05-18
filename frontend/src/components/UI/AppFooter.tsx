import { Address, Footer, FooterNav, Logo } from "@trussworks/react-uswds";
import Image from "next/image";

import React from "react";

function AppFooter() {
  const returnToTop = "";
  const logoImg = "/images/dos-logo.png";
  return (
    <Footer
      size="slim"
      returnToTop={returnToTop}
      primary={
        <div className="usa-footer__primary-container grid-row">
          <div className="mobile-lg:grid-col-8">
            <FooterNav
              size="slim"
              links={[
                <a key="link1" className="usa-footer__primary-link" href="#">
                  Link 1
                </a>,
                <a key="link2" className="usa-footer__primary-link" href="#">
                  Link 2
                </a>,
                <a key="link3" className="usa-footer__primary-link" href="#">
                  Link 3
                </a>,
                <a key="link4" className="usa-footer__primary-link" href="#">
                  Link 4
                </a>,
              ]}
            />
          </div>
          <div className="tablet:grid-col-4">
            <Address
              size="slim"
              items={[
                <a key="telephone" href="tel:1-800-555-5555">
                  (800) CALL-GOVT
                </a>,
                <a key="email" href="mailto:info@agency.gov">
                  info@agency.gov
                </a>,
              ]}
            />
          </div>
        </div>
      }
      secondary={
        <Logo
          size="slim"
          image={
            <Image
              className="usa-footer__logo-img"
              alt="img alt text"
              src={logoImg}
            />
          }
          heading={
            <p className="usa-footer__logo-heading">U.S. Department of State</p>
          }
        />
      }
    />
  );
}

export default AppFooter;
