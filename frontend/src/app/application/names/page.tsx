"use client";
import React from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import "../../globals.css";
import "@trussworks/react-uswds/lib/uswds.css";
import "@trussworks/react-uswds/lib/index.css";
import {
  Alert,
  Button,
  Checkbox,
  Fieldset,
  Form,
  Label,
  Radio,
  TextInput,
} from "@trussworks/react-uswds";
import { useTranslations } from "next-intl";

export default function NamePage() {
  const t = useTranslations("Names");
  type nameFormInput = {
    surname: string;
    givenName: string;
    nativeAlphabetName: string;
    nativeAlphabetDoesNotApply: boolean;
  };
  const formMethods = useForm<nameFormInput>();

  const onSubmit: SubmitHandler<nameFormInput> = async (nameData) => {
    console.log(nameData);
  };

  return (
    <FormProvider {...formMethods}>
      <Alert type="info" heading={t("alert-header")} headingLevel="h4"></Alert>
      <h2>Names</h2>
      <Form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <Fieldset legend={t("current-name-header")}>
          {/* Surnames */}
          <Label htmlFor="surnames" requiredMarker>
            {t("surnames-label")}
          </Label>
          <span className="usa-hint">{t("surnames-hint")}</span>
          <TextInput
            id="surnames"
            required={true}
            name="surnames"
            type="text"
          />

          {/* Given names */}
          <Label htmlFor="givenNames" requiredMarker>
            {t("given-names-label")}
          </Label>
          <span className="usa-hint">{t("given-names-hint")}</span>
          <TextInput
            id="givenNames"
            required={true}
            type="text"
            name="givenNames"
          />

          {/* Native Alphabet */}
          <Label htmlFor="nativeAlphabetName" requiredMarker>
            {t("native-alphabet-label")}
          </Label>
          <TextInput
            id="nativeAlphabetName"
            required={true}
            type="text"
            name="nativeAlphabetName"
          />
          <Checkbox
            id="nativeAlphabetDoesNotApply"
            name="nativeAlphabetDoesNotApply"
            label={t("does-not-apply")}
          />
        </Fieldset>
        <Fieldset legend={t("previous-names-header")}>
          {/* Previous names yes/no */}
          <Fieldset legend={t("previous-names-subheader")} requiredMarker>
            <span className="usa-hint">{t("previous-names-hint")}</span>
            <Radio
              id="previousNames-yes"
              name="previousNames"
              label={t("yes")}
            />
            <Radio id="previousNames-no" name="previousNames" label={t("no")} />
          </Fieldset>

          {/* Previous names textboxes*/}
          <Label htmlFor="previous-name-1" requiredMarker>
            {t("name1")}
          </Label>
          <TextInput
            id="previous-name-1"
            required={true}
            type="text"
            name="previousName1"
          />
          <Button type="button" outline>
            {t("add-another-name")}
          </Button>

          {/* Telecode yes/no */}
          <Fieldset legend={t("telecode-header")} requiredMarker>
            <span className="usa-hint">{t("telecode-hint")}</span>
            <Radio id="telecode-yes" name="telecode" label={t("yes")} />
            <Radio id="telecode-no" name="telecode" label={t("no")} />
          </Fieldset>
        </Fieldset>
        <Button type="submit">{t("submit")}</Button>
      </Form>
    </FormProvider>
  );
}
