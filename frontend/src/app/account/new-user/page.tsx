"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  Alert,
  Button,
  Fieldset,
  Form,
  Label,
  TextInput,
} from "@trussworks/react-uswds";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "@/api/users";

export default function NewUserPage() {
  type UserFormInput = {
    email: string;
    password: string;
  };

  const router = useRouter();
  const formMethods = useForm<UserFormInput>();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = formMethods;

  const { mutate, isPending } = useMutation({
    mutationFn: createUser,
    onSuccess: (newUser) => {
      router.push(`/account/${newUser.email}/applications`);
    },
    onError: (error) => {
      setError("root", { message: error.message });
    },
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit: SubmitHandler<UserFormInput> = (userData) => {
    mutate(userData);
  };

  return (
    <FormProvider {...formMethods}>
      {errors.root && (
        <Alert headingLevel="h3" type="error">
          {errors.root.message}
        </Alert>
      )}
      <h2>Create a new account</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset legend={"You'll be asked to verify your email address."}>
          <Label htmlFor="email" requiredMarker>
            {"Email"}
          </Label>
          <TextInput id="email" required={true} {...register("email")} />
          <Label htmlFor="password" requiredMarker>
            {"Password"}
          </Label>
          <TextInput id="password-create-account" name="password" type={showPassword ? 'text' : 'password'} autoCapitalize="none" autoCorrect="off" required={true} {...register("password")} />
          <button title="Show password" type="button" className="usa-show-password" aria-controls="password-create-account password-create-account-confirm" onClick={(): void => setShowPassword(showPassword => !showPassword)}>
            {showPassword ? 'Hide password' : 'Show password'}
          </button>
        </Fieldset>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit"}
        </Button>
      </Form>
    </FormProvider>
  );
}
