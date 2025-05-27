"use client";
import React from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import "../../globals.css";
import "@trussworks/react-uswds/lib/uswds.css";
import "@trussworks/react-uswds/lib/index.css";
import {
  Button,
  Checkbox,
  DateInput,
  DateInputGroup,
  Fieldset,
  Form,
  FormGroup,
  Label,
  RequiredMarker,
  Select,
  TextInput,
} from "@trussworks/react-uswds";
import { useTranslations } from "next-intl";

export default function PassportDetailsPage() {
  const t = useTranslations("PassportDetails");
  type detailsFormInput = {
    "doc-type-select": string;
    "issuer-select": string;
    "book-number": string;
    "no-book-number-checkbox": boolean;
    issuanceMonthInput: string;
    issuanceDay: string;
    issuanceYear: string;
    expirationMonthInput: string;
    expirationDay: string;
    expirationYear: string;
  };
  const formMethods = useForm<detailsFormInput>();

  const onSubmit: SubmitHandler<detailsFormInput> = async (nameData) => {
    console.log(nameData);
  };

  return (
    <FormProvider {...formMethods}>
      <Form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <Fieldset legend={t("header")} legendStyle="large">
          <Fieldset legend={t("doc-type-header")} legendStyle="large">
            <p>{t("doc-type-hint")}</p>
            <p>
              {t("required-fields")} (<RequiredMarker />
              ).
            </p>
            {/* Passport Type */}
            <Label htmlFor="doc-type-select" requiredMarker>
              {t("doc-type-select-label")}
            </Label>
            <Select id="doc-type-select" name="doc-type-select">
              <option value="tourist">{t("regular-passport")}</option>
            </Select>
            <h3>{t("issuer-header")}</h3>
            <Label htmlFor="issuer-select" requiredMarker>
              {t("issuer-select-label")}
            </Label>
            <Select id="issuer-select" name="issuer-select">
              <option>{t("issuer-select-option")}</option>
            </Select>
          </Fieldset>
          <Fieldset legend={t("book-number-header")}>
            <p>{t("book-number-hint")}</p>
            <Label htmlFor="book-number" requiredMarker>
              {t("book-number-label")}
            </Label>
            <TextInput name="book-number" id="book-number" required />
            <Checkbox
              id="no-book-number-checkbox"
              name="no-book-number-checkbox"
              value="no-book-number"
              label={t("no-book-number-label")}
            />
          </Fieldset>
          <Fieldset legendStyle="large" legend={t("issuance-date")}>
            <DateInputGroup>
              <FormGroup className="usa-form-group--month usa-form-group--select">
                <Label htmlFor="input-select">{t("month")}</Label>
                <Select id="issuanceMonthInput" name="issuanceMonthInput">
                  <option>- Select -</option>
                  <option value="1">{t("january")}</option>
                  <option value="2">{t("february")}</option>
                  <option value="3">{t("march")}</option>
                  <option value="4">{t("april")}</option>
                  <option value="5">{t("may")}</option>
                  <option value="6">{t("june")}</option>
                  <option value="7">{t("july")}</option>
                  <option value="8">{t("august")}</option>
                  <option value="9">{t("september")}</option>
                  <option value="10">{t("october")}</option>
                  <option value="11">{t("november")}</option>
                  <option value="12">{t("december")}</option>
                </Select>
              </FormGroup>
              <DateInput
                id="issuanceDayInput"
                name="issuanceDay"
                label={t("day")}
                unit="day"
                maxLength={2}
                minLength={2}
              />
              <DateInput
                id="issuanceYearInput"
                name="issuanceYear"
                label={t("year")}
                unit="year"
                maxLength={4}
                minLength={4}
              />
            </DateInputGroup>
          </Fieldset>
          <Fieldset legend={t("expiration-date")}>
            <DateInputGroup>
              <FormGroup className="usa-form-group--month usa-form-group--select">
                <Label htmlFor="input-select">{t("month")}</Label>
                <Select id="expirationMonthInput" name="expirationMonthInput">
                  <option>- Select -</option>
                  <option value="1">{t("january")}</option>
                  <option value="2">{t("february")}</option>
                  <option value="3">{t("march")}</option>
                  <option value="4">{t("april")}</option>
                  <option value="5">{t("may")}</option>
                  <option value="6">{t("june")}</option>
                  <option value="7">{t("july")}</option>
                  <option value="8">{t("august")}</option>
                  <option value="9">{t("september")}</option>
                  <option value="10">{t("october")}</option>
                  <option value="11">{t("november")}</option>
                  <option value="12">{t("december")}</option>
                </Select>
              </FormGroup>
              <DateInput
                id="expirationDayInput"
                name="expirationDay"
                label={t("day")}
                unit="day"
                maxLength={2}
                minLength={2}
              />
              <DateInput
                id="expirationYearInput"
                name="expirationYear"
                label={t("year")}
                unit="year"
                maxLength={4}
                minLength={4}
              />
            </DateInputGroup>
          </Fieldset>
        </Fieldset>

        <Button type="submit">{t("submit")}</Button>
      </Form>
    </FormProvider>
  );
}
