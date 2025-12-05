"use client";

import { Tables } from "@/types/database";
import { createContext, useContext } from "react";

export const ProfileContext = createContext<Tables<"profiles"> | null>(null);

export function ProfileProvider({
  ...props
}: React.ComponentProps<typeof ProfileContext.Provider>) {
  return <ProfileContext.Provider {...props} />;
}

export function useProfile(): Tables<"profiles"> | null {
  const profile = useContext(ProfileContext);
  if (profile === undefined)
    throw new Error("useProfile should be in <ProfileProvider>.");
  return profile;
}
