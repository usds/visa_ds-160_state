"use client";

import React, { createContext, ReactNode, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getUserFromSession, login, logout } from "@/api/session";
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
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    // Can sometimes cause issues with stale data
    // but some amount of time is needed to hydrate this server-side
    staleTime: 60_000,  // 1 minute
  });

  return (
    <UserContext.Provider value={{ user, isLoading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      queryClient.setQueryData(["sessionuser"], user);
      router.push("/account/profile");
      queryClient.invalidateQueries();
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(["sessionuser"], null);
      router.push("/account/login");
      queryClient.invalidateQueries();
    },
  });
}
