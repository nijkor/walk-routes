"use client";

import { createContext, useContext } from "react";

import type { RouteInfo } from "@/types/route-info";

export const RouteContext = createContext<RouteInfo | null>(null);

export function RouteProvider({
  ...props
}: React.ComponentProps<typeof RouteContext.Provider>) {
  return <RouteContext.Provider {...props} />;
}

export function useRoute(): RouteInfo {
  const result = useContext(RouteContext);
  if (!result) throw new Error("Unable to get RouteContext");
  return result;
}
