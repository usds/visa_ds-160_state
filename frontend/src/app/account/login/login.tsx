"use client";

import React from "react";
import "@trussworks/react-uswds/lib/uswds.css";
import "@trussworks/react-uswds/lib/index.css";
import "@/app/globals.css";

import { getUsers } from "@/api/users";
import { useLogin } from "@/providers/UserContext";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@trussworks/react-uswds";
import Link from "next/link";

export const Login = () => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const { mutate: loginUser, isPending: loginPending } = useLogin();

  return (
    <div>
      <h1>Login</h1>
      <p>Welcome to the login page!</p>
      <p>Click on a user to &quot;log in&quot;.</p>
      <ul>
        {isLoading ? (
          <li>Loading...</li>
        ) : error ? (
          <li>Error: {error.message}</li>
        ) : (
          users.map((user) => (
            <li key={user.email} className="margin-bottom-1">
              <Button
                type="button"
                key={user.email}
                onClick={() => loginUser(user.email)}
                disabled={loginPending}
              >
                Log in as {user.email}
              </Button>
            </li>
          ))
        )}
      </ul>
      <Link href={`/account/new-user`}>
        <Button type="button" accentStyle="warm">
          Add User
        </Button>
      </Link>
    </div>
  );
};
export default Login;
