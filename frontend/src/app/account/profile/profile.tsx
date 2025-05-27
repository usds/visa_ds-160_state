"use client";

import React from "react";
import "@trussworks/react-uswds/lib/uswds.css";
import "@trussworks/react-uswds/lib/index.css";
import "@/app/globals.css";

import { getUserFromSession } from "@/api/session";
import { useQuery } from "@tanstack/react-query";
import type { User } from "@/types";

export const Profile = () => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery<User>({
    queryKey: ["sessionuser"],
    queryFn: getUserFromSession,
  });

  return (
    <div>
      <h1>Profile</h1>
      <p>Welcome to the profile page!</p>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <p>Logged in as: {user.email}</p>
      )}
    </div>
  );
};
export default Profile;
