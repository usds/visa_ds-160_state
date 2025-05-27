"use client";

import React, { useState, type JSX } from "react";
import {
  Banner,
  BannerHeader,
  BannerFlag,
  BannerButton,
  BannerContent,
  BannerGuidance,
  BannerIcon,
  MediaBlockBody,
  Icon,
  Grid,
} from "@trussworks/react-uswds";

// assets
import flagImg from "@uswds/uswds/img/us_flag_small.png";
import dotGovIcon from "@uswds/uswds/img/icon-dot-gov.svg";
import httpsIcon from "@uswds/uswds/img/icon-https.svg";
import LocaleSwitcher from "./LocaleSwitcher";

interface GovBannerCopy {
  header: string;
  ariaLabel: string;
  headerAction: string;
  tldSectionHeader: string;
  tldSectionContent: JSX.Element;
  httpsSectionHeader: string;
  httpsSectionContent: JSX.Element;
}

const GovBannerCopy = {
  header: "An official website of the United States government",
  ariaLabel: "Official website of the United States government",
  headerAction: "Here’s how you know",
  tldSectionHeader: `Official websites use .gov`,
  tldSectionContent: (
    <>
      A <strong>.gov</strong> website belongs to an official government
      organization in the United States.
    </>
  ),
  httpsSectionHeader: `Secure .gov websites use HTTPS`,
  httpsSectionContent: (
    <>
      A{" "}
      <strong>
        lock (<Icon.Lock aria-label="Locked padlock icon" />)
      </strong>{" "}
      or <strong>https://</strong> means you’ve safely connected to the .gov
      website. Share sensitive information only on official, secure websites.
    </>
  ),
};

export type GovBannerProps = JSX.IntrinsicElements["section"];

export const AppBanner = ({
  className,
  ...sectionProps
}: GovBannerProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    header,
    ariaLabel,
    headerAction,
    httpsSectionHeader,
    httpsSectionContent,
    tldSectionHeader,
    tldSectionContent,
  } = GovBannerCopy;

  return (
    <Banner
      className={className}
      data-testid="govBanner"
      aria-label={ariaLabel}
      {...sectionProps}
    >
      <Grid row>
        <Grid tablet={{ col: true }}>
          <BannerHeader
            isOpen={isOpen}
            flagImg={<BannerFlag src={flagImg} aria-hidden alt="" />}
            headerText={header}
            headerActionText={headerAction}
          >
            <BannerButton
              isOpen={isOpen}
              aria-controls="gov-banner"
              onClick={(): void => {
                setIsOpen((previousIsOpen) => !previousIsOpen);
              }}
            >
              {headerAction}
            </BannerButton>
          </BannerHeader>
          <BannerContent id="gov-banner" isOpen={isOpen}>
            <div className="grid-row grid-gap-lg">
              <BannerGuidance className="tablet:grid-col-6">
                <BannerIcon src={dotGovIcon} alt="" />
                <MediaBlockBody>
                  <p>
                    <strong>{tldSectionHeader}</strong>
                    <br />
                    {tldSectionContent}
                  </p>
                </MediaBlockBody>
              </BannerGuidance>
              <BannerGuidance className="tablet:grid-col-6">
                <BannerIcon src={httpsIcon} alt="" />
                <MediaBlockBody>
                  <p>
                    <strong>{httpsSectionHeader}</strong>
                    <br />
                    {httpsSectionContent}
                  </p>
                </MediaBlockBody>
              </BannerGuidance>
            </div>
          </BannerContent>
        </Grid>
        <Grid tablet={{ col: true }}>
          <LocaleSwitcher key="locale"></LocaleSwitcher>
        </Grid>
      </Grid>
    </Banner>
  );
};

export default AppBanner;
