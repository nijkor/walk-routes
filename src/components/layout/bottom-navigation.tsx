"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { LogInIcon, MapIcon, Settings2Icon, User2Icon } from "lucide-react";
import { Others } from "./others";
import { useProfile } from "@/contexts/profile-context";
import { Activity } from "react";

export function BottomNavigation() {
  const profile = useProfile();
  const pathname = usePathname();

  if (pathname.startsWith("/auth")) return null;

  return (
    <div className="z-20 fixed bottom-0 left-0 right-0">
      <div className="max-w-xl mx-auto bg-background border-t py-4 px-6 flex flex-row justify-between items-center">
        <Link href="/">
          <Button variant="ghost" size="icon-lg">
            <MapIcon />
          </Button>
        </Link>
        <Activity mode={profile ? "visible" : "hidden"}>
          <Link href="/profile">
            <Button variant="ghost" size="icon-lg">
              <User2Icon />
            </Button>
          </Link>
          <Button disabled variant="ghost" size="icon-lg">
            <Settings2Icon />
          </Button>
        </Activity>
        <Activity mode={!profile ? "visible" : "hidden"}>
          <Link href="/auth/login">
            <Button variant="ghost" size="icon-lg">
              <LogInIcon />
            </Button>
          </Link>
        </Activity>
        <Others />
      </div>
    </div>
  );
}
