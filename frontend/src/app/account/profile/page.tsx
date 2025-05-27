import React from "react";
import "@trussworks/react-uswds/lib/uswds.css";
import "@trussworks/react-uswds/lib/index.css";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import "@/app/globals.css";
import { getUserFromSession } from "@/api/session";
import Profile from "./profile";

export default async function ProfilePage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["sessionuser"],
    queryFn: getUserFromSession,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Profile />
    </HydrationBoundary>
  );
}
