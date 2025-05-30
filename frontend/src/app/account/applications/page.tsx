import React from "react";
import "@trussworks/react-uswds/lib/uswds.css";
import "@trussworks/react-uswds/lib/index.css";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import "@/app/globals.css";
import { getApplications } from "@/api/applications";
import Applications from "@/app/account/applications/applications";

export default async function ApplicationsPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["applications"],
    queryFn: getApplications,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Applications />
    </HydrationBoundary>
  );
}
