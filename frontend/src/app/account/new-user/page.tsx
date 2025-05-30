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
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createUser } from "@/api/users";

export default function NewUserPage() {
  const queryClient = useQueryClient();
  type UserFormInput = {
    email: string;
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
      queryClient.setQueryData(["sessionuser"], newUser);
      router.push(`/account/profile`);
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      setError("root", { message: error.message });
    },
  });

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
        </Fieldset>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit"}
        </Button>
      </Form>
    </FormProvider>
  );
}
