"use client";

import React, { createContext, ReactNode, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserFromSession } from "@/api/session";
import type { User } from "@/types";

type UserContextType = {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
};

const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: false,
  error: null,
});

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery<User>({
    queryKey: ["sessionuser"],
    queryFn: getUserFromSession,
    retry: false, // Non-logged in users should not retry
  });

  return (
    <UserContext.Provider value={{ user, isLoading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
