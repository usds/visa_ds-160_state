import React from "react";
import { FormProvider, useForm } from "react-hook-form";

export const useReactHookForm = (Story, { args }) => {
  const formMethods = useForm();

  // add errors from story args to formState
  const formErrors = formMethods.formState.errors;
  if (args.errors) {
    formErrors["root"] = formErrors.root || {};
    args.errors.forEach((errMessage, idx) => {
      formErrors.root[idx] = { type: "unknown", message: errMessage };
    });
  }

  const formMethodsWithCustomErrors = {
    ...formMethods,
    formState: {
      ...formMethods.formState,
      errors: formErrors,
    },
  };

  return (
    <FormProvider {...formMethodsWithCustomErrors}>
      <Story />
    </FormProvider>
  );
};
