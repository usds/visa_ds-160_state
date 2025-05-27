import React from "react";
import "@trussworks/react-uswds/lib/uswds.css";
import "@trussworks/react-uswds/lib/index.css";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import "@/app/globals.css";
import { getUsers } from "@/api/users";
import Login from "@/app/account/login/login";

export default async function LoginPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Login />
    </HydrationBoundary>
  );
}
