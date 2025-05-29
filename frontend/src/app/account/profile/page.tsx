"use client";

import React from "react";
import "@trussworks/react-uswds/lib/uswds.css";
import "@trussworks/react-uswds/lib/index.css";
import "@/app/globals.css";

import { useUser } from "@/providers/UserContext";

export default function ProfilePage() {
  const { user, isLoading, error } = useUser();

  return (
    <div>
      <h1>Profile</h1>
      <p>Welcome to the profile page!</p>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : user ? (
        <p>Logged in as: {user.email}</p>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};
